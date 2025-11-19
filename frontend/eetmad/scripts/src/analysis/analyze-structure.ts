#!/usr/bin/env tsx

/**
 * Component and Page Structure Analyzer
 *
 * This script analyzes:
 * - Component usage across pages
 * - Page-to-page linking relationships
 * - Component import patterns
 * - Unused components
 * - Missing component imports
 * - Structure health indicators
 */

import * as fs from 'fs';
import * as path from 'path';

interface ComponentInfo {
  path: string;
  name: string;
  category: 'features' | 'shared' | 'ui';
  subcategory: string;
  exports: string[];
  isIndex: boolean;
}

interface PageInfo {
  path: string;
  route: string;
  routeGroup: string;
  imports: ComponentImport[];
  usedComponents: string[];
  links: PageLink[];
  hasErrors: boolean;
}

interface ComponentImport {
  source: string;
  imports: string[];
  isDefault: boolean;
  isNamespace: boolean;
}

interface PageLink {
  href: string;
  type: 'Link' | 'href' | 'router' | 'redirect';
  line: number;
}

interface AnalysisResult {
  components: Map<string, ComponentInfo>;
  pages: Map<string, PageInfo>;
  componentUsage: Map<string, Set<string>>; // component -> pages using it
  pageLinks: Map<string, Set<string>>; // page -> pages it links to
  unusedComponents: string[];
  missingImports: Array<{ page: string; import: string; line: number }>;
  structureHealth: {
    score: number;
    issues: string[];
    warnings: string[];
  };
}

const SRC_DIR = path.join(process.cwd(), 'src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
const PAGES_DIR = path.join(SRC_DIR, 'app', '[locale]');

// Path aliases from tsconfig
const PATH_ALIASES: Record<string, string> = {
  '@': SRC_DIR,
  '@/components': path.join(SRC_DIR, 'components'),
  '@/lib': path.join(SRC_DIR, 'lib'),
  '@/hooks': path.join(SRC_DIR, 'lib', 'hooks'),
  '@/utils': path.join(SRC_DIR, 'lib', 'utils'),
  '@/types': path.join(SRC_DIR, 'lib', 'types'),
  '@/styles': path.join(SRC_DIR, 'styles'),
  '@/api': path.join(SRC_DIR, 'lib', 'api'),
};

function resolvePath(importPath: string, fromFile?: string): string | null {
  // Handle path aliases
  for (const [alias, resolved] of Object.entries(PATH_ALIASES)) {
    if (importPath.startsWith(alias)) {
      const relative = importPath.replace(alias, '').replace(/^\//, '');
      const resolvedPath = path.join(resolved, relative);

      // Check if file exists (try .tsx, .ts, or directory with index)
      if (fs.existsSync(resolvedPath + '.tsx')) return resolvedPath + '.tsx';
      if (fs.existsSync(resolvedPath + '.ts')) return resolvedPath + '.ts';
      if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
        if (fs.existsSync(path.join(resolvedPath, 'index.tsx')))
          return path.join(resolvedPath, 'index.tsx');
        if (fs.existsSync(path.join(resolvedPath, 'index.ts')))
          return path.join(resolvedPath, 'index.ts');
      }
      return resolvedPath;
    }
  }

  // Handle relative imports
  if (importPath.startsWith('.') && fromFile) {
    const baseDir = path.dirname(fromFile);
    const resolvedPath = path.resolve(baseDir, importPath);

    // Check if file exists
    if (fs.existsSync(resolvedPath + '.tsx')) return resolvedPath + '.tsx';
    if (fs.existsSync(resolvedPath + '.ts')) return resolvedPath + '.ts';
    if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
      if (fs.existsSync(path.join(resolvedPath, 'index.tsx')))
        return path.join(resolvedPath, 'index.tsx');
      if (fs.existsSync(path.join(resolvedPath, 'index.ts')))
        return path.join(resolvedPath, 'index.ts');
    }
    return resolvedPath;
  }

  // Handle node_modules
  if (!importPath.startsWith('@/') && !importPath.startsWith('.')) {
    return null; // External dependency
  }

  return null;
}

function extractImports(content: string, filePath: string): ComponentImport[] {
  const imports: ComponentImport[] = [];

  // Match import statements - improved regex
  const importRegex =
    /import\s+(?:(?<default>\w+)(?:\s*,\s*)?(?:\{(?<named>[^}]+)\})?|(?:\{(?<namedOnly>[^}]+)\})|(?<namespace>\*\s+as\s+(\w+)))\s+from\s+['"](?<source>[^'"]+)['"]/g;

  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const source = match.groups?.source || '';

    // Only track component imports
    if (
      source.includes('@/components') ||
      source.includes('components/') ||
      source.startsWith('./') ||
      source.startsWith('../')
    ) {
      const resolved = resolvePath(source, filePath);
      if (resolved || source.includes('components')) {
        const namedImports = (match.groups?.named || match.groups?.namedOnly || '')
          .split(',')
          .map(
            (i) =>
              i
                .trim()
                .replace(/\s+as\s+\w+/, '')
                .split(' as ')[0]
          )
          .filter(Boolean);
        const defaultImport = match.groups?.default || null;
        const isNamespace = !!match.groups?.namespace;

        if (defaultImport || namedImports.length > 0 || isNamespace) {
          imports.push({
            source: resolved || source,
            imports: defaultImport ? [defaultImport, ...namedImports] : namedImports,
            isDefault: !!defaultImport,
            isNamespace,
          });
        }
      }
    }
  }

  return imports;
}

function extractUsedComponents(content: string, imports: ComponentImport[]): string[] {
  const used: string[] = [];

  for (const imp of imports) {
    for (const importName of imp.imports) {
      // Check if component is used in JSX
      const jsxRegex = new RegExp(`<${importName}[\\s>]`, 'g');
      if (jsxRegex.test(content)) {
        used.push(importName);
      }

      // Check if component is used as function call
      const funcRegex = new RegExp(`\\b${importName}\\s*\\(`, 'g');
      if (funcRegex.test(content)) {
        used.push(importName);
      }
    }
  }

  return [...new Set(used)];
}

function extractPageLinks(content: string): PageLink[] {
  const links: PageLink[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Next.js Link component - improved regex
    const linkMatch = line.match(/<Link[^>]*href\s*=\s*{?['"`]([^'"`]+)['"`]}?/);
    if (linkMatch) {
      links.push({
        href: linkMatch[1],
        type: 'Link',
        line: index + 1,
      });
    }

    // href in object properties (e.g., href: '/path')
    const hrefPropMatch = line.match(/href\s*:\s*['"`]([^'"`]+)['"`]/);
    if (hrefPropMatch && !line.includes('<Link')) {
      links.push({
        href: hrefPropMatch[1],
        type: 'href',
        line: index + 1,
      });
    }

    // router.push, router.replace with template literals
    const routerTemplateMatch = line.match(/router\.(push|replace)\([`'"]\/[^`'"]+[`'"]\)/);
    if (routerTemplateMatch) {
      const hrefMatch = line.match(/[`'"](\/[^`'"]+)[`'"]/);
      if (hrefMatch) {
        links.push({
          href: hrefMatch[1],
          type: 'router',
          line: index + 1,
        });
      }
    }

    // router.push with template literal (e.g., `/path/${id}`)
    const routerTemplateLiteralMatch = line.match(/router\.(push|replace)\([`'](\/[^`']+)[`']/);
    if (routerTemplateLiteralMatch) {
      // Extract the base path (before ${)
      const basePath = routerTemplateLiteralMatch[2].split('${')[0];
      if (basePath) {
        links.push({
          href: basePath,
          type: 'router',
          line: index + 1,
        });
      }
    }

    // router.push, router.replace with string literals
    const routerMatch = line.match(/router\.(push|replace)\(['"]([^'"]+)['"]/);
    if (routerMatch) {
      links.push({
        href: routerMatch[2],
        type: 'router',
        line: index + 1,
      });
    }

    // redirect()
    const redirectMatch = line.match(/redirect\(['"]([^'"]+)['"]/);
    if (redirectMatch) {
      links.push({
        href: redirectMatch[1],
        type: 'redirect',
        line: index + 1,
      });
    }
  });

  return links;
}

function findComponents(dir: string, category: 'features' | 'shared' | 'ui'): ComponentInfo[] {
  const components: ComponentInfo[] = [];

  if (!fs.existsSync(dir)) {
    return components;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively search subdirectories
      components.push(...findComponents(fullPath, category));
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const relativePath = path.relative(COMPONENTS_DIR, fullPath);
      const pathParts = path.dirname(relativePath).split(path.sep);
      const subcategory = pathParts.length > 0 && pathParts[0] !== '.' ? pathParts[0] : category;

      const isIndex = entry.name === 'index.ts' || entry.name === 'index.tsx';

      if (isIndex) {
        // For index files, extract all re-exported components
        // Match: export { default as ComponentName } from './ComponentName'
        const defaultExports = content.matchAll(
          /export\s+{\s*default\s+as\s+(\w+)\s*}\s+from\s+['"]([^'"]+)['"]/g
        );
        for (const match of defaultExports) {
          const exportName = match[1];
          components.push({
            path: fullPath,
            name: exportName,
            category,
            subcategory,
            exports: [exportName],
            isIndex: true,
          });
        }

        // Match: export * from './ComponentName'
        const starExports = content.matchAll(/export\s+\*\s+from\s+['"]([^'"]+)['"]/g);
        for (const match of starExports) {
          const exportPath = match[1];
          // Try to infer component name from path
          const componentName = path.basename(exportPath);
          components.push({
            path: fullPath,
            name: componentName,
            category,
            subcategory,
            exports: [componentName],
            isIndex: true,
          });
        }
      } else {
        // For regular component files
        // Extract component name from default export
        const defaultExportMatch = content.match(/export\s+default\s+(?:function|const)\s+(\w+)/);
        const componentName =
          defaultExportMatch?.[1] || path.basename(entry.name, path.extname(entry.name));

        // Extract all exports
        const exports: string[] = [];
        if (content.includes('export default')) {
          exports.push(componentName);
        }

        // Named exports
        const namedExports = content.matchAll(
          /export\s+(?:const|function|type|interface)\s+(\w+)/g
        );
        for (const match of namedExports) {
          exports.push(match[1]);
        }

        components.push({
          path: fullPath,
          name: componentName,
          category,
          subcategory,
          exports,
          isIndex: false,
        });
      }
    }
  }

  return components;
}

function findPages(dir: string, routeGroup: string = '', baseRoute: string = ''): PageInfo[] {
  const pages: PageInfo[] = [];

  if (!fs.existsSync(dir)) {
    return pages;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip route groups (directories starting with parentheses)
      if (entry.name.startsWith('(') && entry.name.endsWith(')')) {
        const newRouteGroup = entry.name.slice(1, -1);
        pages.push(...findPages(fullPath, newRouteGroup, baseRoute));
      } else {
        // Dynamic route segment
        const segment =
          entry.name.startsWith('[') && entry.name.endsWith(']')
            ? `[${entry.name.slice(1, -1)}]`
            : entry.name;
        const newRoute = baseRoute ? `${baseRoute}/${segment}` : `/${segment}`;
        pages.push(...findPages(fullPath, routeGroup, newRoute));
      }
    } else if (
      entry.name === 'page.tsx' ||
      entry.name === 'page.ts' ||
      entry.name === 'layout.tsx' ||
      entry.name === 'layout.ts'
    ) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const route = baseRoute || '/';

      const imports = extractImports(content, fullPath);
      const usedComponents = extractUsedComponents(content, imports);
      const links = extractPageLinks(content);

      // Check for import errors (basic check)
      const hasErrors = imports.some((imp) => {
        const resolved = resolvePath(imp.source, fullPath);
        if (!resolved) return false;
        // Check if resolved path exists
        return (
          !fs.existsSync(resolved) &&
          !fs.existsSync(resolved + '.tsx') &&
          !fs.existsSync(resolved + '.ts') &&
          !(fs.existsSync(resolved) && fs.statSync(resolved).isDirectory())
        );
      });

      pages.push({
        path: fullPath,
        route,
        routeGroup,
        imports,
        usedComponents,
        links,
        hasErrors,
      });
    }
  }

  return pages;
}

function analyzeStructure(): AnalysisResult {
  console.log('🔍 Analyzing component and page structure...\n');

  // Find all components
  console.log('📦 Scanning components...');
  const featuresComponents = findComponents(path.join(COMPONENTS_DIR, 'features'), 'features');
  const sharedComponents = findComponents(path.join(COMPONENTS_DIR, 'shared'), 'shared');
  const uiComponents = findComponents(path.join(COMPONENTS_DIR, 'ui'), 'ui');
  const allComponents = [...featuresComponents, ...sharedComponents, ...uiComponents];

  const componentsMap = new Map<string, ComponentInfo>();
  for (const comp of allComponents) {
    const key = comp.name;
    if (!componentsMap.has(key)) {
      componentsMap.set(key, comp);
    }
  }

  console.log(`   Found ${allComponents.length} component files`);
  console.log(`   Unique components: ${componentsMap.size}\n`);

  // Find all pages
  console.log('📄 Scanning pages...');
  const pages = findPages(PAGES_DIR);
  const pagesMap = new Map<string, PageInfo>();
  for (const page of pages) {
    pagesMap.set(page.route, page);
  }

  console.log(`   Found ${pages.length} pages\n`);

  // Analyze component usage
  console.log('🔗 Analyzing component usage...');
  const componentUsage = new Map<string, Set<string>>();
  const missingImports: Array<{ page: string; import: string; line: number }> = [];

  for (const page of pages) {
    for (const imp of page.imports) {
      for (const importName of imp.imports) {
        if (!componentUsage.has(importName)) {
          componentUsage.set(importName, new Set());
        }
        componentUsage.get(importName)!.add(page.route);
      }
    }
  }

  // Analyze page links
  console.log('🔗 Analyzing page links...');
  const pageLinks = new Map<string, Set<string>>();

  for (const page of pages) {
    if (!pageLinks.has(page.route)) {
      pageLinks.set(page.route, new Set());
    }

    for (const link of page.links) {
      // Normalize href (remove locale, handle relative paths)
      let targetRoute = link.href;
      if (targetRoute.startsWith('/')) {
        // Remove locale prefix if present
        targetRoute = targetRoute.replace(/^\/[a-z]{2}(\/|$)/, '/');
        if (targetRoute === '') targetRoute = '/';
      } else {
        // Relative path - resolve from current page
        const currentDir = path.dirname(page.route);
        targetRoute = path.join(currentDir, targetRoute).replace(/\\/g, '/');
      }

      pageLinks.get(page.route)!.add(targetRoute);
    }
  }

  // Find unused components
  const unusedComponents: string[] = [];
  for (const [name, comp] of componentsMap.entries()) {
    if (!componentUsage.has(name) && !comp.isIndex) {
      unusedComponents.push(name);
    }
  }

  // Calculate structure health
  const issues: string[] = [];
  const warnings: string[] = [];

  if (unusedComponents.length > 0) {
    warnings.push(`${unusedComponents.length} components appear to be unused`);
  }

  const pagesWithErrors = pages.filter((p) => p.hasErrors);
  if (pagesWithErrors.length > 0) {
    issues.push(`${pagesWithErrors.length} pages have potential import errors`);
  }

  const isolatedPages = Array.from(pageLinks.entries()).filter(([, links]) => links.size === 0);
  if (isolatedPages.length > 0) {
    warnings.push(`${isolatedPages.length} pages have no outgoing links`);
  }

  // Calculate health score (0-100)
  let score = 100;
  score -= issues.length * 10;
  score -= warnings.length * 5;
  score -= Math.min(unusedComponents.length * 2, 20);
  score = Math.max(0, score);

  return {
    components: componentsMap,
    pages: pagesMap,
    componentUsage,
    pageLinks,
    unusedComponents,
    missingImports,
    structureHealth: {
      score,
      issues,
      warnings,
    },
  };
}

function generateReport(result: AnalysisResult): string {
  const lines: string[] = [];

  lines.push('='.repeat(80));
  lines.push('📊 COMPONENT & PAGE STRUCTURE ANALYSIS REPORT');
  lines.push('='.repeat(80));
  lines.push('');

  // Health Score
  lines.push('🏥 STRUCTURE HEALTH');
  lines.push('-'.repeat(80));
  const score = result.structureHealth.score;
  const scoreEmoji = score >= 80 ? '✅' : score >= 60 ? '⚠️' : '❌';
  lines.push(`${scoreEmoji} Health Score: ${score}/100`);
  lines.push('');

  if (result.structureHealth.issues.length > 0) {
    lines.push('❌ Issues:');
    result.structureHealth.issues.forEach((issue) => lines.push(`   • ${issue}`));
    lines.push('');
  }

  if (result.structureHealth.warnings.length > 0) {
    lines.push('⚠️  Warnings:');
    result.structureHealth.warnings.forEach((warning) => lines.push(`   • ${warning}`));
    lines.push('');
  }

  // Component Statistics
  lines.push('📦 COMPONENT STATISTICS');
  lines.push('-'.repeat(80));
  lines.push(`Total Components: ${result.components.size}`);
  lines.push(`Components in Use: ${result.componentUsage.size}`);
  lines.push(`Unused Components: ${result.unusedComponents.length}`);
  lines.push('');

  // Component Usage by Category
  const categoryCounts = new Map<string, number>();
  const categoryUsage = new Map<string, number>();

  for (const comp of result.components.values()) {
    const cat = `${comp.category}/${comp.subcategory}`;
    categoryCounts.set(cat, (categoryCounts.get(cat) || 0) + 1);
    if (result.componentUsage.has(comp.name)) {
      categoryUsage.set(cat, (categoryUsage.get(cat) || 0) + 1);
    }
  }

  lines.push('Component Distribution:');
  for (const [cat, count] of Array.from(categoryCounts.entries()).sort()) {
    const used = categoryUsage.get(cat) || 0;
    const usagePercent = count > 0 ? Math.round((used / count) * 100) : 0;
    lines.push(
      `   ${cat.padEnd(40)} ${count.toString().padStart(3)} components (${used} used, ${usagePercent}%)`
    );
  }
  lines.push('');

  // Page Statistics
  lines.push('📄 PAGE STATISTICS');
  lines.push('-'.repeat(80));
  lines.push(`Total Pages: ${result.pages.size}`);

  const routeGroupCounts = new Map<string, number>();
  for (const page of result.pages.values()) {
    const group = page.routeGroup || 'root';
    routeGroupCounts.set(group, (routeGroupCounts.get(group) || 0) + 1);
  }

  lines.push('Pages by Route Group:');
  for (const [group, count] of Array.from(routeGroupCounts.entries()).sort()) {
    lines.push(`   ${group.padEnd(20)} ${count} pages`);
  }
  lines.push('');

  // Unused Components
  if (result.unusedComponents.length > 0) {
    lines.push('🚫 UNUSED COMPONENTS');
    lines.push('-'.repeat(80));
    result.unusedComponents.slice(0, 20).forEach((comp) => {
      const compInfo = result.components.get(comp);
      if (compInfo) {
        lines.push(`   • ${comp} (${compInfo.category}/${compInfo.subcategory})`);
      }
    });
    if (result.unusedComponents.length > 20) {
      lines.push(`   ... and ${result.unusedComponents.length - 20} more`);
    }
    lines.push('');
  }

  // Most Used Components
  lines.push('⭐ MOST USED COMPONENTS');
  lines.push('-'.repeat(80));
  const sortedUsage = Array.from(result.componentUsage.entries())
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, 10);

  sortedUsage.forEach(([name, pages]) => {
    const compInfo = result.components.get(name);
    const category = compInfo ? `${compInfo.category}/${compInfo.subcategory}` : 'unknown';
    lines.push(
      `   ${name.padEnd(30)} used in ${pages.size.toString().padStart(2)} pages (${category})`
    );
  });
  lines.push('');

  // Page Connectivity
  lines.push('🔗 PAGE CONNECTIVITY');
  lines.push('-'.repeat(80));
  const sortedLinks = Array.from(result.pageLinks.entries())
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, 10);

  lines.push('Pages with Most Outgoing Links:');
  sortedLinks.forEach(([route, links]) => {
    lines.push(`   ${route.padEnd(40)} ${links.size} links`);
  });
  lines.push('');

  // Isolated Pages
  const isolated = Array.from(result.pageLinks.entries())
    .filter(([, links]) => links.size === 0)
    .map(([route]) => route);

  if (isolated.length > 0) {
    lines.push('🔌 ISOLATED PAGES (No Outgoing Links)');
    lines.push('-'.repeat(80));
    isolated.forEach((route) => {
      lines.push(`   • ${route}`);
    });
    lines.push('');
  }

  // Component Usage by Page
  lines.push('📋 COMPONENT USAGE BY PAGE');
  lines.push('-'.repeat(80));
  const pagesWithComponents = Array.from(result.pages.values())
    .filter((p) => p.usedComponents.length > 0)
    .sort((a, b) => b.usedComponents.length - a.usedComponents.length)
    .slice(0, 10);

  pagesWithComponents.forEach((page) => {
    lines.push(`\n${page.route} (${page.routeGroup || 'root'}):`);
    lines.push(`   Components used: ${page.usedComponents.length}`);
    page.usedComponents.slice(0, 5).forEach((comp) => {
      lines.push(`   • ${comp}`);
    });
    if (page.usedComponents.length > 5) {
      lines.push(`   ... and ${page.usedComponents.length - 5} more`);
    }
  });
  lines.push('');

  lines.push('='.repeat(80));
  lines.push('Report generated at: ' + new Date().toLocaleString());
  lines.push('='.repeat(80));

  return lines.join('\n');
}

// Main execution
if (require.main === module) {
  try {
    const result = analyzeStructure();
    const report = generateReport(result);
    console.log(report);

    // Optionally save to file
    const reportPath = path.join(process.cwd(), 'scripts', 'structure-analysis-report.txt');
    fs.writeFileSync(reportPath, report, 'utf-8');
    console.log(`\n📝 Report saved to: ${reportPath}`);

    // Exit with appropriate code
    process.exit(result.structureHealth.score >= 60 ? 0 : 1);
  } catch (error) {
    console.error('❌ Error during analysis:', error);
    process.exit(1);
  }
}

export { analyzeStructure, generateReport };
