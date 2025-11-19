#!/usr/bin/env tsx

/**
 * Enhanced Component and Page Structure Analyzer v2
 * 
 * This is a complete rebuild from scratch to fix issues in v1:
 * - Properly tracks hooks exports (useTableColumns, etc.)
 * - Tracks component usage in imported components
 * - Tracks links in nested components
 * - Better understanding of Next.js structure
 * - Improved export pattern detection
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// Types & Interfaces
// ============================================================================

interface ExportInfo {
  name: string;
  type: 'default' | 'named' | 'hook' | 'type' | 'interface';
  isReexport: boolean;
  sourceFile?: string;
}

interface ComponentInfo {
  path: string;
  name: string;
  category: 'features' | 'shared' | 'ui';
  subcategory: string;
  exports: ExportInfo[];
  isIndexFile: boolean;
  content: string;
}

interface ImportInfo {
  source: string;
  resolvedPath: string | null;
  imports: {
    name: string;
    isDefault: boolean;
    isNamespace: boolean;
    alias?: string;
  }[];
  line: number;
}

interface UsageInfo {
  componentName: string;
  exportName: string;
  usageType: 'jsx' | 'hook' | 'function' | 'variable' | 'type';
  line: number;
}

interface LinkInfo {
  href: string;
  type: 'Link' | 'href' | 'router.push' | 'router.replace' | 'redirect';
  line: number;
  isDynamic: boolean;
}

interface PageInfo {
  path: string;
  route: string;
  routeGroup: string;
  imports: ImportInfo[];
  usages: UsageInfo[];
  links: LinkInfo[];
  importedComponents: Set<string>; // resolved component paths
}

interface AnalysisResult {
  components: Map<string, ComponentInfo>;
  pages: Map<string, PageInfo>;
  componentUsage: Map<string, Set<string>>; // exportName -> pages using it
  pageLinks: Map<string, Set<string>>; // page route -> pages it links to
  unusedExports: Map<string, string[]>; // component name -> unused export names
  missingImports: Array<{ page: string; import: string; line: number }>;
  structureHealth: {
    score: number;
    issues: string[];
    warnings: string[];
  };
}

// ============================================================================
// Configuration
// ============================================================================

const SRC_DIR = path.join(process.cwd(), 'src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
const PAGES_DIR = path.join(SRC_DIR, 'app', '[locale]');

const PATH_ALIASES: Record<string, string> = {
  '@': SRC_DIR,
  '@/components': COMPONENTS_DIR,
  '@/lib': path.join(SRC_DIR, 'lib'),
  '@/hooks': path.join(SRC_DIR, 'lib', 'hooks'),
  '@/utils': path.join(SRC_DIR, 'lib', 'utils'),
  '@/types': path.join(SRC_DIR, 'lib', 'types'),
  '@/styles': path.join(SRC_DIR, 'styles'),
  '@/api': path.join(SRC_DIR, 'lib', 'api'),
};

// ============================================================================
// Path Resolution
// ============================================================================

function resolvePath(importPath: string, fromFile?: string): string | null {
  // Handle path aliases
  for (const [alias, resolved] of Object.entries(PATH_ALIASES)) {
    if (importPath.startsWith(alias)) {
      const relative = importPath.replace(alias, '').replace(/^\//, '');
      let resolvedPath = path.join(resolved, relative);

      // Try different extensions
      if (fs.existsSync(resolvedPath + '.tsx')) return resolvedPath + '.tsx';
      if (fs.existsSync(resolvedPath + '.ts')) return resolvedPath + '.ts';
      
      // Try directory with index
      if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
        if (fs.existsSync(path.join(resolvedPath, 'index.tsx')))
          return path.join(resolvedPath, 'index.tsx');
        if (fs.existsSync(path.join(resolvedPath, 'index.ts')))
          return path.join(resolvedPath, 'index.ts');
      }
      
      return null;
    }
  }

  // Handle relative imports
  if (importPath.startsWith('.') && fromFile) {
    const baseDir = path.dirname(fromFile);
    const resolvedPath = path.resolve(baseDir, importPath);

    if (fs.existsSync(resolvedPath + '.tsx')) return resolvedPath + '.tsx';
    if (fs.existsSync(resolvedPath + '.ts')) return resolvedPath + '.ts';
    
    if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
      if (fs.existsSync(path.join(resolvedPath, 'index.tsx')))
        return path.join(resolvedPath, 'index.tsx');
      if (fs.existsSync(path.join(resolvedPath, 'index.ts')))
        return path.join(resolvedPath, 'index.ts');
    }
  }

  // External dependency
  if (!importPath.startsWith('@/') && !importPath.startsWith('.')) {
    return null;
  }

  return null;
}

// ============================================================================
// Export Detection
// ============================================================================

function extractExports(filePath: string, content: string): ExportInfo[] {
  const exports: ExportInfo[] = [];
  const lines = content.split('\n');

  // Default exports
  const defaultExportMatch = content.match(/export\s+default\s+(?:function|const|class)\s+(\w+)/);
  if (defaultExportMatch) {
    exports.push({
      name: defaultExportMatch[1],
      type: 'default',
      isReexport: false,
    });
  }

  // Named function/const exports
  const namedExports = content.matchAll(
    /export\s+(?:const|function|class)\s+(\w+)/g
  );
  for (const match of namedExports) {
    const exportName = match[1];
    const isHook = exportName.startsWith('use') && /^use[A-Z]/.test(exportName);
    
    exports.push({
      name: exportName,
      type: isHook ? 'hook' : 'named',
      isReexport: false,
    });
  }

  // Type/interface exports
  const typeExports = content.matchAll(
    /export\s+(?:type|interface)\s+(\w+)/g
  );
  for (const match of typeExports) {
    exports.push({
      name: match[1],
      type: 'type',
      isReexport: false,
    });
  }

  // Re-exports: export { default as Name } from './file'
  const reexportDefaultMatch = content.matchAll(
    /export\s+{\s*default\s+as\s+(\w+)\s*}\s+from\s+['"]([^'"]+)['"]/g
  );
  for (const match of reexportDefaultMatch) {
    const reexportPath = resolvePath(match[2], filePath);
    exports.push({
      name: match[1],
      type: 'default',
      isReexport: true,
      sourceFile: reexportPath || undefined,
    });
  }

  // Re-exports: export * from './file'
  const reexportAllMatch = content.matchAll(
    /export\s+\*\s+from\s+['"]([^'"]+)['"]/g
  );
  for (const match of reexportAllMatch) {
    const reexportPath = resolvePath(match[1], filePath);
    if (reexportPath && fs.existsSync(reexportPath)) {
      const reexportContent = fs.readFileSync(reexportPath, 'utf-8');
      const reexported = extractExports(reexportPath, reexportContent);
      for (const exp of reexported) {
        exports.push({
          ...exp,
          isReexport: true,
          sourceFile: reexportPath,
        });
      }
    }
  }

  // Re-exports: export { Name1, Name2 } from './file'
  const reexportNamedMatch = content.matchAll(
    /export\s+{\s*([^}]+)\s*}\s+from\s+['"]([^'"]+)['"]/g
  );
  for (const match of reexportNamedMatch) {
    const names = match[1].split(',').map(n => {
      const trimmed = n.trim();
      const aliasMatch = trimmed.match(/(\w+)\s+as\s+(\w+)/);
      return aliasMatch ? { original: aliasMatch[1], alias: aliasMatch[2] } : { original: trimmed, alias: trimmed };
    });
    const reexportPath = resolvePath(match[2], filePath);
    
    for (const { original, alias } of names) {
      if (original !== 'default') {
        exports.push({
          name: alias,
          type: 'named',
          isReexport: true,
          sourceFile: reexportPath || undefined,
        });
      }
    }
  }

  return exports;
}

// ============================================================================
// Import Detection
// ============================================================================

function extractImports(content: string, fromFile: string): ImportInfo[] {
  const imports: ImportInfo[] = [];
  const lines = content.split('\n');

  // Match import statements - improved regex
  const importRegex =
    /import\s+(?:(?<default>\w+)(?:\s*,\s*)?(?:\{(?<named>[^}]+)\})?|(?:\{(?<namedOnly>[^}]+)\})|(?<namespace>\*\s+as\s+(\w+)))\s+from\s+['"](?<source>[^'"]+)['"]/g;

  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const source = match.groups?.source || '';
    const line = content.substring(0, match.index).split('\n').length;

    // Only track component imports (skip node_modules, etc.)
    if (
      source.includes('@/components') ||
      source.includes('components/') ||
      source.startsWith('./') ||
      source.startsWith('../')
    ) {
      const resolved = resolvePath(source, fromFile);
      
      const namedImports = (match.groups?.named || match.groups?.namedOnly || '')
        .split(',')
        .map((i) => {
          const trimmed = i.trim();
          const aliasMatch = trimmed.match(/(\w+)\s+as\s+(\w+)/);
          if (aliasMatch) {
            return {
              name: aliasMatch[1],
              alias: aliasMatch[2],
              isDefault: false,
              isNamespace: false,
            };
          }
          return {
            name: trimmed.replace(/\s+as\s+\w+/, '').trim(),
            isDefault: false,
            isNamespace: false,
          };
        })
        .filter((i) => i.name);

      const defaultImport = match.groups?.default
        ? {
            name: match.groups.default,
            isDefault: true,
            isNamespace: false,
          }
        : null;

      const namespaceImport = match.groups?.namespace
        ? {
            name: match.groups.namespace,
            isDefault: false,
            isNamespace: true,
          }
        : null;

      const allImports = [defaultImport, namespaceImport, ...namedImports].filter(
        Boolean
      ) as ImportInfo['imports'];

      if (allImports.length > 0) {
        imports.push({
          source,
          resolvedPath: resolved,
          imports: allImports,
          line,
        });
      }
    }
  }

  return imports;
}

// ============================================================================
// Usage Detection
// ============================================================================

function extractUsage(content: string, imports: ImportInfo[], filePath: string): UsageInfo[] {
  const usages: UsageInfo[] = [];
  const lines = content.split('\n');

  for (const imp of imports) {
    for (const imported of imp.imports) {
      const name = imported.alias || imported.name;

      // JSX usage: <ComponentName
      const jsxRegex = new RegExp(`<${name}[\\s>]`, 'g');
      let jsxMatch;
      while ((jsxMatch = jsxRegex.exec(content)) !== null) {
        const line = content.substring(0, jsxMatch.index).split('\n').length;
        usages.push({
          componentName: imported.name,
          exportName: name,
          usageType: 'jsx',
          line,
        });
      }

      // Hook usage: useHookName(
      if (imported.name.startsWith('use')) {
        const hookRegex = new RegExp(`\\b${name}\\s*\\(`, 'g');
        let hookMatch;
        while ((hookMatch = hookRegex.exec(content)) !== null) {
          const line = content.substring(0, hookMatch.index).split('\n').length;
          usages.push({
            componentName: imported.name,
            exportName: name,
            usageType: 'hook',
            line,
          });
        }
      }

      // Function call: ComponentName(
      const funcRegex = new RegExp(`\\b${name}\\s*\\(`, 'g');
      let funcMatch;
      while ((funcMatch = funcRegex.exec(content)) !== null) {
        const line = content.substring(0, funcMatch.index).split('\n').length;
        // Skip if already found as hook
        if (!usages.some(u => u.exportName === name && u.line === line && u.usageType === 'hook')) {
          usages.push({
            componentName: imported.name,
            exportName: name,
            usageType: 'function',
            line,
          });
        }
      }

      // Type usage: type MyType = ImportedType
      const typeRegex = new RegExp(`:\\s*${name}\\b|type\\s+\\w+\\s*=\\s*${name}\\b`, 'g');
      let typeMatch;
      while ((typeMatch = typeRegex.exec(content)) !== null) {
        const line = content.substring(0, typeMatch.index).split('\n').length;
        usages.push({
          componentName: imported.name,
          exportName: name,
          usageType: 'type',
          line,
        });
      }
    }
  }

  return usages;
}

// ============================================================================
// Link Detection (including in imported components)
// ============================================================================

function extractLinks(content: string, importedComponents: Map<string, string>): LinkInfo[] {
  const links: LinkInfo[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Next.js Link component
    const linkMatch = line.match(/<Link[^>]*href\s*=\s*{?['"`]([^'"`]+)['"`]}?/);
    if (linkMatch) {
      const href = linkMatch[1];
      links.push({
        href,
        type: 'Link',
        line: index + 1,
        isDynamic: href.includes('${') || href.includes('{'),
      });
    }

    // href in object properties
    const hrefPropMatch = line.match(/href\s*:\s*['"`]([^'"`]+)['"`]/);
    if (hrefPropMatch && !line.includes('<Link')) {
      links.push({
        href: hrefPropMatch[1],
        type: 'href',
        line: index + 1,
        isDynamic: false,
      });
    }

    // router.push/router.replace with string literals
    const routerMatch = line.match(/router\.(push|replace)\(['"]([^'"]+)['"]/);
    if (routerMatch) {
      links.push({
        href: routerMatch[2],
        type: routerMatch[1] === 'push' ? 'router.push' : 'router.replace',
        line: index + 1,
        isDynamic: routerMatch[2].includes('${'),
      });
    }

    // router.push/router.replace with template literals
    const routerTemplateMatch = line.match(/router\.(push|replace)\([`'](\/[^`']+)['`]/);
    if (routerTemplateMatch) {
      const href = routerTemplateMatch[2].split('${')[0]; // Get base path before dynamic part
      if (href) {
        links.push({
          href,
          type: routerTemplateMatch[1] === 'push' ? 'router.push' : 'router.replace',
          line: index + 1,
          isDynamic: true,
        });
      }
    }

    // redirect()
    const redirectMatch = line.match(/redirect\(['"]([^'"]+)['"]/);
    if (redirectMatch) {
      links.push({
        href: redirectMatch[1],
        type: 'redirect',
        line: index + 1,
        isDynamic: false,
      });
    }
  });

  // Also check imported components for links (recursively)
  const processedForLinks = new Set<string>();
  
  function extractLinksRecursive(componentPath: string): LinkInfo[] {
    if (processedForLinks.has(componentPath)) return [];
    if (!fs.existsSync(componentPath)) return [];
    
    processedForLinks.add(componentPath);
    const componentLinks: LinkInfo[] = [];
    
    try {
      const componentContent = fs.readFileSync(componentPath, 'utf-8');
      const componentImports = extractImports(componentContent, componentPath);
      const nestedImports = new Map<string, string>();
      
      for (const imp of componentImports) {
        if (imp.resolvedPath && !processedForLinks.has(imp.resolvedPath)) {
          nestedImports.set(imp.source, imp.resolvedPath);
        }
      }
      
      const directLinks = extractLinks(componentContent, new Map());
      componentLinks.push(...directLinks);
      
      // Recursively check nested imports
      for (const nestedPath of nestedImports.values()) {
        if (nestedPath.includes('/components/')) {
          componentLinks.push(...extractLinksRecursive(nestedPath));
        }
      }
    } catch (e) {
      // Skip if can't read
    }
    
    return componentLinks;
  }

  for (const resolvedPath of importedComponents.values()) {
    if (resolvedPath && resolvedPath.includes('/components/')) {
      links.push(...extractLinksRecursive(resolvedPath));
    }
  }

  return links;
}

// ============================================================================
// Component Discovery
// ============================================================================

function findComponents(dir: string, category: 'features' | 'shared' | 'ui'): ComponentInfo[] {
  const components: ComponentInfo[] = [];

  if (!fs.existsSync(dir)) {
    return components;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      components.push(...findComponents(fullPath, category));
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const relativePath = path.relative(COMPONENTS_DIR, fullPath);
      const pathParts = path.dirname(relativePath).split(path.sep).filter(Boolean);
      const subcategory = pathParts.length > 0 ? pathParts[0] : category;

      const isIndexFile = entry.name === 'index.ts' || entry.name === 'index.tsx';
      const componentName = path.basename(entry.name, path.extname(entry.name));

      const exports = extractExports(fullPath, content);

      // If no exports found, try to infer from default export or filename
      if (exports.length === 0 && !isIndexFile) {
        const defaultExportMatch = content.match(/export\s+default\s+(?:function|const)\s+(\w+)/);
        if (defaultExportMatch) {
          exports.push({
            name: defaultExportMatch[1],
            type: 'default',
            isReexport: false,
          });
        } else {
          // Use filename as component name
          exports.push({
            name: componentName,
            type: 'default',
            isReexport: false,
          });
        }
      }

      components.push({
        path: fullPath,
        name: componentName,
        category,
        subcategory,
        exports,
        isIndexFile,
        content,
      });
    }
  }

  return components;
}

// ============================================================================
// Page Discovery
// ============================================================================

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
      const importedComponents = new Map<string, string>();
      
      for (const imp of imports) {
        if (imp.resolvedPath) {
          importedComponents.set(imp.source, imp.resolvedPath);
        }
      }

      const usages = extractUsage(content, imports, fullPath);
      const links = extractLinks(content, importedComponents);

      pages.push({
        path: fullPath,
        route,
        routeGroup,
        imports,
        usages,
        links,
        importedComponents: new Set(importedComponents.values()),
      });
    }
  }

  return pages;
}

// ============================================================================
// Analysis
// ============================================================================

function analyzeStructure(): AnalysisResult {
  console.log('🔍 Analyzing component and page structure (v2)...\n');

  // Find all components
  console.log('📦 Scanning components...');
  const featuresComponents = findComponents(path.join(COMPONENTS_DIR, 'features'), 'features');
  const sharedComponents = findComponents(path.join(COMPONENTS_DIR, 'shared'), 'shared');
  const uiComponents = findComponents(path.join(COMPONENTS_DIR, 'ui'), 'ui');
  const allComponents = [...featuresComponents, ...sharedComponents, ...uiComponents];

  // Build component map by export name
  const componentsByExport = new Map<string, ComponentInfo>();
  for (const comp of allComponents) {
    for (const exp of comp.exports) {
      const key = exp.name;
      if (!componentsByExport.has(key) || !exp.isReexport) {
        componentsByExport.set(key, comp);
      }
    }
  }

  console.log(`   Found ${allComponents.length} component files`);
  console.log(`   Unique exports: ${componentsByExport.size}\n`);

  // Find all pages
  console.log('📄 Scanning pages...');
  const pages = findPages(PAGES_DIR);
  const pagesMap = new Map<string, PageInfo>();
  for (const page of pages) {
    pagesMap.set(page.route, page);
  }

  console.log(`   Found ${pages.length} pages\n`);

  // Analyze component usage (including in imported components)
  console.log('🔗 Analyzing component usage...');
  const componentUsage = new Map<string, Set<string>>(); // exportName -> page routes
  const processedComponents = new Set<string>();

  function processComponentUsage(componentPath: string, usedInRoutes: Set<string>) {
    if (processedComponents.has(componentPath)) return;
    processedComponents.add(componentPath);

    if (!fs.existsSync(componentPath)) return;

    try {
      const content = fs.readFileSync(componentPath, 'utf-8');
      const imports = extractImports(content, componentPath);
      const usages = extractUsage(content, imports, componentPath);

      // Track usages in this component
      for (const usage of usages) {
        if (!componentUsage.has(usage.exportName)) {
          componentUsage.set(usage.exportName, new Set());
        }
        // Add all routes that use this component
        for (const route of usedInRoutes) {
          componentUsage.get(usage.exportName)!.add(route);
        }
      }

      // Recursively process imported components
      for (const imp of imports) {
        if (imp.resolvedPath && !processedComponents.has(imp.resolvedPath)) {
          // Check if it's a component
          if (imp.resolvedPath.includes('/components/')) {
            processComponentUsage(imp.resolvedPath, usedInRoutes);
          }
        }
      }
    } catch (e) {
      // Skip if can't read
    }
  }

  // Start from pages
  for (const page of pages) {
    for (const usage of page.usages) {
      if (!componentUsage.has(usage.exportName)) {
        componentUsage.set(usage.exportName, new Set());
      }
      componentUsage.get(usage.exportName)!.add(page.route);
    }

    // Process imported components from this page
    for (const componentPath of page.importedComponents) {
      processComponentUsage(componentPath, new Set([page.route]));
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

  // Find unused exports
  const unusedExports = new Map<string, string[]>();
  for (const comp of allComponents) {
    const unused: string[] = [];
    for (const exp of comp.exports) {
      if (!componentUsage.has(exp.name) && !exp.isReexport && exp.type !== 'type' && exp.type !== 'interface') {
        unused.push(exp.name);
      }
    }
    if (unused.length > 0) {
      unusedExports.set(comp.name, unused);
    }
  }

  // Calculate structure health
  const issues: string[] = [];
  const warnings: string[] = [];

  const totalUnused = Array.from(unusedExports.values()).reduce((sum, arr) => sum + arr.length, 0);
  if (totalUnused > 0) {
    warnings.push(`${totalUnused} exports appear to be unused`);
  }

  const isolatedPages = Array.from(pageLinks.entries()).filter(([, links]) => links.size === 0);
  if (isolatedPages.length > 0) {
    warnings.push(`${isolatedPages.length} pages have no outgoing links`);
  }

  // Calculate health score (0-100)
  let score = 100;
  score -= issues.length * 10;
  score -= warnings.length * 5;
  score -= Math.min(totalUnused * 0.5, 30);
  score = Math.max(0, score);

  return {
    components: componentsByExport,
    pages: pagesMap,
    componentUsage,
    pageLinks,
    unusedExports,
    missingImports: [], // TODO: implement missing import detection
    structureHealth: {
      score,
      issues,
      warnings,
    },
  };
}

// ============================================================================
// Report Generation
// ============================================================================

function generateReport(result: AnalysisResult): string {
  const lines: string[] = [];

  lines.push('='.repeat(80));
  lines.push('📊 COMPONENT & PAGE STRUCTURE ANALYSIS REPORT (v2)');
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
  lines.push(`Total Component Exports: ${result.components.size}`);
  lines.push(`Exports in Use: ${result.componentUsage.size}`);
  
  const totalUnused = Array.from(result.unusedExports.values()).reduce((sum, arr) => sum + arr.length, 0);
  lines.push(`Unused Exports: ${totalUnused}`);
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
      `   ${cat.padEnd(40)} ${count.toString().padStart(3)} exports (${used} used, ${usagePercent}%)`
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

  // Unused Exports (top 20)
  if (totalUnused > 0) {
    lines.push('🚫 UNUSED EXPORTS (Top 20)');
    lines.push('-'.repeat(80));
    
    const allUnused: Array<{ component: string; export: string; category: string }> = [];
    for (const [componentName, exports] of result.unusedExports.entries()) {
      const comp = Array.from(result.components.values()).find(c => c.name === componentName);
      if (comp) {
        for (const exp of exports) {
          allUnused.push({
            component: componentName,
            export: exp,
            category: `${comp.category}/${comp.subcategory}`,
          });
        }
      }
    }

    allUnused.slice(0, 20).forEach(({ component, export: exp, category }) => {
      lines.push(`   • ${component}.${exp} (${category})`);
    });
    
    if (allUnused.length > 20) {
      lines.push(`   ... and ${allUnused.length - 20} more`);
    }
    lines.push('');
  }

  // Most Used Components
  lines.push('⭐ MOST USED EXPORTS');
  lines.push('-'.repeat(80));
  const sortedUsage = Array.from(result.componentUsage.entries())
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, 10);

  sortedUsage.forEach(([name, pages]) => {
    const comp = result.components.get(name);
    const category = comp ? `${comp.category}/${comp.subcategory}` : 'unknown';
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
    .filter((p) => p.usages.length > 0)
    .sort((a, b) => b.usages.length - a.usages.length)
    .slice(0, 10);

  pagesWithComponents.forEach((page) => {
    lines.push(`\n${page.route} (${page.routeGroup || 'root'}):`);
    lines.push(`   Exports used: ${page.usages.length}`);
    const uniqueExports = [...new Set(page.usages.map(u => u.exportName))];
    uniqueExports.slice(0, 5).forEach((exp) => {
      lines.push(`   • ${exp}`);
    });
    if (uniqueExports.length > 5) {
      lines.push(`   ... and ${uniqueExports.length - 5} more`);
    }
  });
  lines.push('');

  lines.push('='.repeat(80));
  lines.push('Report generated at: ' + new Date().toLocaleString());
  lines.push('='.repeat(80));

  return lines.join('\n');
}

// ============================================================================
// Main Execution
// ============================================================================

if (require.main === module) {
  try {
    const result = analyzeStructure();
    const report = generateReport(result);
    console.log(report);

    // Save to file
    const reportPath = path.join(process.cwd(), 'scripts', 'structure-analysis-report-v2.txt');
    fs.writeFileSync(reportPath, report, 'utf-8');
    console.log(`\n📝 Report saved to: ${reportPath}`);

    // Exit with appropriate code
    process.exit(result.structureHealth.score >= 60 ? 0 : 1);
  } catch (error) {
    console.error('❌ Error during analysis:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

export { analyzeStructure, generateReport };

