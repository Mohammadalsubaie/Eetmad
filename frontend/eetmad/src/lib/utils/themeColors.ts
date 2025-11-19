/**
 * Theme color palettes for preview
 * Extracted from theme CSS files
 *
 * ⚠️ When adding a new theme:
 * 1. Extract colors from your theme CSS file (see ADDING_NEW_THEME.md)
 * 2. Add the new theme's color palette below
 * 3. Colors are: primary, accent, background, text
 */

export interface ThemeColors {
  primary: string;
  accent: string;
  background: string;
  text: string;
}

export const themeColorPalettes: Record<string, ThemeColors> = {
  option1: {
    primary: '#34656d',
    accent: '#faeab1',
    background: '#faf8f1',
    text: '#ffffff',
  },
  option2: {
    primary: '#00adb5',
    accent: '#00adb5',
    background: '#ffffff',
    text: '#222831',
  },
  option3: {
    primary: '#6b8a7a',
    accent: '#b7b597',
    background: '#dad3be',
    text: '#254336',
  },
  option4: {
    primary: '#3f4e4f',
    accent: '#a27b5c',
    background: '#dcd7c9',
    text: '#2c3639',
  },
  option5: {
    primary: '#393e46',
    accent: '#00adb5',
    background: '#f8f9fa',
    text: '#222831',
  },
  option6: {
    primary: '#4b6587',
    accent: '#f0e5cf',
    background: '#f7f6f2',
    text: '#2e3f52',
  },
  option7: {
    primary: '#447d9b',
    accent: '#fe7743',
    background: '#f8f8f8',
    text: '#1c2e3b',
  },
  option8: {
    primary: '#e43636',
    accent: '#f6efd2',
    background: '#fffbf0',
    text: '#000000',
  },
  option9: {
    primary: '#494949',
    accent: '#faf6e9',
    background: '#fffdf6',
    text: '#212121',
  },
  option10: {
    primary: '#536162',
    accent: '#c06014',
    background: '#f8f9f6',
    text: '#2f3432',
  },
  option11: {
    primary: '#141e61',
    accent: '#787a91',
    background: '#f5f5f7',
    text: '#0f044c',
  },
  option12: {
    primary: '#4a4947',
    accent: '#b17457',
    background: '#faf7f0',
    text: '#2a2624',
  },
  option13: {
    primary: '#889e73',
    accent: '#f4d793',
    background: '#fff6da',
    text: '#3d4a2f',
  },
  option14: {
    primary: '#948979',
    accent: '#dfd0b8',
    background: '#f5eddf',
    text: '#222831',
  },
  option15: {
    primary: '#948979',
    accent: '#dfd0b8',
    background: '#f5eddf',
    text: '#222831',
  },
};

/**
 * Get color palette for a theme
 */
export function getThemeColors(theme: string): ThemeColors {
  return themeColorPalettes[theme] || themeColorPalettes.option1;
}
