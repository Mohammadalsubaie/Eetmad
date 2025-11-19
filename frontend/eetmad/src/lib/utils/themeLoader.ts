/**
 * Utility to dynamically load theme CSS files
 */

const THEME_BASE_PATH = '/themes';
const THEME_ID = 'dynamic-theme';

export type ThemeOption = `option${number}`;

/**
 * Get the CSS file path for a theme option
 */
export function getThemePath(theme: ThemeOption): string {
  return `${THEME_BASE_PATH}/${theme}.css`;
}

/**
 * Load a theme CSS file dynamically
 */
export function loadTheme(theme: ThemeOption): void {
  // Remove existing theme link if any
  const existingLink = document.getElementById(THEME_ID) as HTMLLinkElement | null;
  if (existingLink) {
    existingLink.remove();
  }

  // Create new link element
  const link = document.createElement('link');
  link.id = THEME_ID;
  link.rel = 'stylesheet';
  link.href = getThemePath(theme);
  link.setAttribute('data-theme', theme);

  // Add to head
  document.head.appendChild(link);
}

/**
 * Remove the current theme
 */
export function removeTheme(): void {
  const link = document.getElementById(THEME_ID) as HTMLLinkElement | null;
  if (link) {
    link.remove();
  }
}

/**
 * Get all available theme options
 *
 * ⚠️ When adding a new theme:
 * 1. Update the length number below to match your total theme count
 * 2. See docs/design/ADDING_NEW_THEME.md for full instructions
 */
export function getAvailableThemes(): ThemeOption[] {
  return Array.from({ length: 15 }, (_, i) => `option${i + 1}` as ThemeOption);
  //                                 ^^ Update this number when adding new themes
}

/**
 * Get theme display name
 */
export function getThemeDisplayName(theme: ThemeOption): string {
  return theme.charAt(0).toUpperCase() + theme.slice(1).replace(/([A-Z])/g, ' $1');
}
