#!/usr/bin/env tsx

/**
 * Route Detection Script
 *
 * This script detects all navigation patterns in the application:
 * - Scans app directory structure for actual routes
 * - Finds Link components with href props
 * - Finds router.push/router.replace calls
 * - Detects external links (http/https)
 * - Extracts route constants usage
 *
 * Output: Generates a comprehensive routing file (JSON and Markdown)
 */

import { readFileSync, readdirSync, statSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, relative, dirname } from 'path';
import { glob } from 'glob';

interface RouteInfo {
  path: string;
  type: 'internal' | 'external' | 'dynamic';
  source: 'filesystem' | 'link' | 'router' | 'constant' | 'external';
  file?: string;
  line?: number;
  isDynamic?: boolean;
  params?: string[];
  group?: string;
  description?: string;
}

interface RouteGroup {
  name: string;
  routes: RouteInfo[];
}

class RouteDetector {
  private routes: Map<string, RouteInfo> = new Map();
  private srcPath: string;
  private appPath: string;
  private projectRoot: string;

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
    this.srcPath = join(projectRoot, 'src');
    this.appPath = join(this.srcPath, 'app', '[locale]');
  }

  /**
   * Scan filesystem for actual routes from app directory
   */
  private scanFilesystemRoutes(): void {
    const scanDirectory = (dir: string, basePath: string = ''): void => {
      if (!existsSync(dir)) return;

      const entries = readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        const relativePath = join(basePath, entry.name);

        // Skip node_modules, .next, etc.
        if (entry.name.startsWith('.') || entry.name === 'node_modules') {
          continue;
        }

        if (entry.isDirectory()) {
          // Check if it's a route group (wrapped in parentheses)
          const isRouteGroup = entry.name.startsWith('(') && entry.name.endsWith(')');
          const routeName = isRouteGroup ? entry.name : entry.name;

          // Handle dynamic routes [param]
          if (entry.name.startsWith('[') && entry.name.endsWith(']')) {
            const paramName = entry.name.slice(1, -1);
            const currentPath = basePath ? `${basePath}/[${paramName}]` : `[${paramName}]`;

            this.addRoute({
              path: currentPath,
              type: 'dynamic',
              source: 'filesystem',
              isDynamic: true,
              params: [paramName],
              group: this.getRouteGroup(basePath),
              file: fullPath,
            });

            scanDirectory(fullPath, currentPath);
          } else {
            const currentPath = isRouteGroup ? basePath : relativePath;
            scanDirectory(fullPath, currentPath);
          }
        } else if (entry.isFile() && entry.name === 'page.tsx') {
          // Found a page route
          const routePath = basePath || '/';
          const isDynamic = routePath.includes('[');
          const params = routePath.match(/\[(\w+)\]/g)?.map((p) => p.slice(1, -1)) || [];

          this.addRoute({
            path: routePath,
            type: isDynamic ? 'dynamic' : 'internal',
            source: 'filesystem',
            isDynamic,
            params,
            group: this.getRouteGroup(basePath),
            file: fullPath,
          });
        }
      }
    };

    scanDirectory(this.appPath);
  }

  /**
   * Get route group from path
   */
  private getRouteGroup(path: string): string {
    if (!path || path.trim() === '') return 'root';

    // Normalize path
    const normalized = path.startsWith('/') ? path.slice(1) : path;

    // Extract route group from path (for filesystem routes)
    const groupMatch = normalized.match(/\((\w+)\)/);
    if (groupMatch) {
      return groupMatch[1];
    }

    // Extract first segment
    const segments = normalized.split('/').filter(Boolean);
    if (segments.length > 0) {
      const firstSegment = segments[0];

      // Map common route prefixes to groups
      if (firstSegment === 'admin') return 'admin';
      if (
        [
          'login',
          'register',
          'forgot-password',
          'reset-password',
          'verify-email',
          'verify-phone',
        ].includes(firstSegment)
      ) {
        return 'auth';
      }
      if (['dashboard', 'profile'].includes(firstSegment)) {
        return 'main';
      }
      if (
        [
          'contracts',
          'requests',
          'projects',
          'payments',
          'messages',
          'notifications',
          'reviews',
          'disputes',
          'milestones',
        ].includes(firstSegment)
      ) {
        return 'client';
      }
      if (
        ['offers', 'portfolio', 'stats', 'supplier-profile', 'supplier-projects'].includes(
          firstSegment
        )
      ) {
        return 'supplier';
      }
      if (
        [
          'about',
          'categories',
          'contact',
          'faq',
          'terms',
          'privacy',
          'how-it-works',
          'browse-suppliers',
        ].includes(firstSegment)
      ) {
        return 'public';
      }

      return firstSegment;
    }

    return 'root';
  }

  /**
   * Scan TypeScript/TSX files for navigation patterns
   */
  private async scanCodeForRoutes(): Promise<void> {
    const files = await glob('**/*.{ts,tsx}', {
      cwd: this.srcPath,
      ignore: ['**/*.test.ts', '**/*.test.tsx', '**/node_modules/**'],
    });

    for (const file of files) {
      const fullPath = join(this.srcPath, file);
      try {
        const content = readFileSync(fullPath, 'utf-8');
        this.extractRoutesFromCode(content, file);
      } catch (error) {
        console.warn(`Error reading file ${file}:`, error);
      }
    }
  }

  /**
   * Extract routes from code content
   */
  private extractRoutesFromCode(content: string, file: string): void {
    const lines = content.split('\n');

    // Pattern 1: Link components with href (single or double quotes, on same line)
    const linkPattern = /<Link[^>]*href\s*=\s*["']([^"'\n]+)["']/g;
    let match;
    while ((match = linkPattern.exec(content)) !== null) {
      const href = match[1];
      const line = content.substring(0, match.index).split('\n').length;
      if (this.isValidRoute(href)) {
        this.processRoute(href, 'link', file, line);
      }
    }

    // Pattern 2: router.push/router.replace (single or double quotes, on same line)
    const routerPattern = /router\.(push|replace)\s*\(\s*["']([^"'\n]+)["']/g;
    while ((match = routerPattern.exec(content)) !== null) {
      const route = match[2];
      const line = content.substring(0, match.index).split('\n').length;
      if (this.isValidRoute(route)) {
        this.processRoute(route, 'router', file, line);
      }
    }

    // Pattern 3: External links (http/https) - more precise
    const externalPattern = /(https?:\/\/[^\s"'<>)\n]+)/g;
    while ((match = externalPattern.exec(content)) !== null) {
      const url = match[1];
      const line = content.substring(0, match.index).split('\n').length;
      if (this.isValidExternalUrl(url)) {
        this.addRoute({
          path: url,
          type: 'external',
          source: 'external',
          file,
          line,
        });
      }
    }

    // Pattern 4: Route constants usage
    const routeConstantPattern = /ROUTES\.(\w+)/g;
    while ((match = routeConstantPattern.exec(content)) !== null) {
      const constantName = match[1];
      const line = content.substring(0, match.index).split('\n').length;
      // We'll resolve the actual route from constants file
      this.processRouteConstant(constantName, file, line);
    }

    // Pattern 5: href in anchor tags (single or double quotes, on same line)
    const anchorPattern = /<a[^>]*href\s*=\s*["']([^"'\n]+)["']/g;
    while ((match = anchorPattern.exec(content)) !== null) {
      const href = match[1];
      const line = content.substring(0, match.index).split('\n').length;
      if (this.isValidRoute(href)) {
        this.processRoute(href, 'link', file, line);
      }
    }
  }

  /**
   * Validate if a route string is valid
   */
  private isValidRoute(route: string): boolean {
    if (!route || route.trim().length === 0) {
      return false;
    }

    // Must be a valid path or URL
    // Reject if contains newlines, excessive whitespace, or code-like patterns
    if (route.includes('\n') || route.includes('\r') || route.length > 200) {
      return false;
    }

    // Reject if it looks like code (contains common code patterns)
    const codePatterns = [
      /catch\s*\{/,
      /\}\s*catch/,
      /className\s*=/,
      /variant\s*=/,
      /onClick\s*=/,
      /function\s*\(/,
      /=>\s*\{/,
      /const\s+\w+\s*=/,
      /let\s+\w+\s*=/,
      /return\s+/,
    ];

    for (const pattern of codePatterns) {
      if (pattern.test(route)) {
        return false;
      }
    }

    // Must start with / or http or be a relative path
    return (
      route.startsWith('/') ||
      route.startsWith('http://') ||
      route.startsWith('https://') ||
      route.match(/^[a-z0-9-]+/i) !== null
    );
  }

  /**
   * Validate external URL
   */
  private isValidExternalUrl(url: string): boolean {
    if (!url || url.length > 500) {
      return false;
    }

    // Must be a valid URL format
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Process a route found in code
   */
  private processRoute(
    route: string,
    source: 'link' | 'router' | 'constant',
    file: string,
    line: number
  ): void {
    // Skip empty routes, fragments, and special cases
    if (
      !route ||
      route.trim() === '' ||
      route === '#' ||
      route.startsWith('javascript:') ||
      route.startsWith('mailto:')
    ) {
      return;
    }

    // Additional validation
    if (!this.isValidRoute(route)) {
      return;
    }

    // Handle template literals and variables (skip for now)
    if (route.includes('${') || route.includes('`')) {
      return;
    }

    // Normalize route
    let normalizedRoute = route;

    // Remove locale prefix if present
    normalizedRoute = normalizedRoute.replace(/^\/[a-z]{2}\//, '/');

    // Handle relative paths
    if (normalizedRoute.startsWith('./') || normalizedRoute.startsWith('../')) {
      return; // Skip relative paths as they're hard to resolve
    }

    // Check if it's external
    if (normalizedRoute.startsWith('http://') || normalizedRoute.startsWith('https://')) {
      this.addRoute({
        path: normalizedRoute,
        type: 'external',
        source: 'external',
        file,
        line,
      });
      return;
    }

    // Check if it's dynamic
    const isDynamic = normalizedRoute.includes('[') || normalizedRoute.includes('${');
    const params = normalizedRoute.match(/\[(\w+)\]/g)?.map((p) => p.slice(1, -1)) || [];

    this.addRoute({
      path: normalizedRoute,
      type: isDynamic ? 'dynamic' : 'internal',
      source,
      isDynamic,
      params,
      group: this.getRouteGroup(normalizedRoute),
      file,
      line,
    });
  }

  /**
   * Process route constant usage
   */
  private processRouteConstant(constantName: string, file: string, line: number): void {
    // Read routes constants file
    const routesFile = join(this.srcPath, 'lib', 'constants', 'routes.ts');
    if (!existsSync(routesFile)) {
      return;
    }

    try {
      const content = readFileSync(routesFile, 'utf-8');
      const constantPattern = new RegExp(`${constantName}:\\s*["']([^"']+)["']`, 'g');
      const match = constantPattern.exec(content);

      if (match) {
        const route = match[1];
        this.processRoute(route, 'constant', file, line);
      }
    } catch (error) {
      console.warn(`Error reading routes constants:`, error);
    }
  }

  /**
   * Add or update route
   */
  private addRoute(route: RouteInfo): void {
    const key = route.path;
    const existing = this.routes.get(key);

    if (existing) {
      // Merge sources if route already exists
      if (!existing.file && route.file) {
        existing.file = route.file;
        existing.line = route.line;
      }
      if (route.source !== existing.source) {
        // Keep track of all sources
        existing.source = `${existing.source},${route.source}` as any;
      }
    } else {
      this.routes.set(key, route);
    }
  }

  /**
   * Group routes by category
   */
  private groupRoutes(): RouteGroup[] {
    const groups = new Map<string, RouteInfo[]>();

    for (const route of this.routes.values()) {
      const groupName = route.group || 'other';
      if (!groups.has(groupName)) {
        groups.set(groupName, []);
      }
      groups.get(groupName)!.push(route);
    }

    return Array.from(groups.entries())
      .map(([name, routes]) => ({
        name,
        routes: routes.sort((a, b) => a.path.localeCompare(b.path)),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Generate JSON output
   */
  private generateJSON(outputPath: string): void {
    const grouped = this.groupRoutes();
    const output = {
      generatedAt: new Date().toISOString(),
      totalRoutes: this.routes.size,
      summary: {
        internal: Array.from(this.routes.values()).filter((r) => r.type === 'internal').length,
        dynamic: Array.from(this.routes.values()).filter((r) => r.type === 'dynamic').length,
        external: Array.from(this.routes.values()).filter((r) => r.type === 'external').length,
      },
      routes: Object.fromEntries(grouped.map((group) => [group.name, group.routes])),
      allRoutes: Array.from(this.routes.values()).sort((a, b) => a.path.localeCompare(b.path)),
    };

    writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
    console.log(`✓ Generated JSON: ${outputPath}`);
  }

  /**
   * Generate Markdown output
   */
  private generateMarkdown(outputPath: string): void {
    const grouped = this.groupRoutes();
    const summary = {
      internal: Array.from(this.routes.values()).filter((r) => r.type === 'internal').length,
      dynamic: Array.from(this.routes.values()).filter((r) => r.type === 'dynamic').length,
      external: Array.from(this.routes.values()).filter((r) => r.type === 'external').length,
    };

    let md = `# Application Routes\n\n`;
    md += `**Generated:** ${new Date().toISOString()}\n\n`;
    md += `## Summary\n\n`;
    md += `- **Total Routes:** ${this.routes.size}\n`;
    md += `- **Internal Routes:** ${summary.internal}\n`;
    md += `- **Dynamic Routes:** ${summary.dynamic}\n`;
    md += `- **External Links:** ${summary.external}\n\n`;
    md += `---\n\n`;

    // Grouped routes
    md += `## Routes by Group\n\n`;
    for (const group of grouped) {
      md += `### ${group.name.charAt(0).toUpperCase() + group.name.slice(1)}\n\n`;
      md += `| Path | Type | Source | File |\n`;
      md += `|------|------|--------|------|\n`;

      for (const route of group.routes) {
        const path = route.path.length > 50 ? route.path.substring(0, 47) + '...' : route.path;
        const type =
          route.type === 'dynamic'
            ? '🔄 Dynamic'
            : route.type === 'external'
              ? '🌐 External'
              : '📄 Internal';
        const source = route.source;
        const file = route.file
          ? relative(this.projectRoot, route.file) + (route.line ? `:${route.line}` : '')
          : '-';
        md += `| \`${path}\` | ${type} | ${source} | ${file} |\n`;
      }
      md += `\n`;
    }

    // External links section
    const externalRoutes = Array.from(this.routes.values()).filter((r) => r.type === 'external');
    if (externalRoutes.length > 0) {
      md += `## External Links\n\n`;
      md += `| URL | Source File |\n`;
      md += `|-----|-------------|\n`;
      for (const route of externalRoutes) {
        const file = route.file
          ? relative(this.projectRoot, route.file) + (route.line ? `:${route.line}` : '')
          : '-';
        md += `| ${route.path} | ${file} |\n`;
      }
      md += `\n`;
    }

    writeFileSync(outputPath, md, 'utf-8');
    console.log(`✓ Generated Markdown: ${outputPath}`);
  }

  /**
   * Main execution
   */
  async detect(): Promise<void> {
    console.log('🔍 Detecting routes...\n');

    // Step 1: Scan filesystem
    console.log('📁 Scanning filesystem for routes...');
    this.scanFilesystemRoutes();
    console.log(`   Found ${this.routes.size} routes from filesystem\n`);

    // Step 2: Scan code for navigation patterns
    console.log('💻 Scanning code for navigation patterns...');
    await this.scanCodeForRoutes();
    console.log(`   Total routes detected: ${this.routes.size}\n`);

    // Step 3: Generate outputs
    const outputDir = join(
      this.projectRoot,
      'scripts',
      'reports',
      new Date().toISOString().split('T')[0]
    );
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    const jsonPath = join(outputDir, 'routes.json');
    const mdPath = join(outputDir, 'routes.md');

    console.log('📝 Generating output files...\n');
    this.generateJSON(jsonPath);
    this.generateMarkdown(mdPath);

    console.log(`\n✅ Route detection complete!`);
    console.log(`   - JSON: ${relative(this.projectRoot, jsonPath)}`);
    console.log(`   - Markdown: ${relative(this.projectRoot, mdPath)}`);
  }
}

// Main execution
const projectRoot = process.cwd();
const detector = new RouteDetector(projectRoot);
detector.detect().catch((error) => {
  console.error('Error detecting routes:', error);
  process.exit(1);
});
