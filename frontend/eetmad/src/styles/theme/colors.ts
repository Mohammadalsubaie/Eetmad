// frontend/eetmad/src/styles/theme/colors.ts

/**
 * ملف الألوان الرئيسي للمشروع
 * جميع الألوان المستخدمة في المشروع يجب أن تُحدد هنا فقط
 *
 * @module colors
 */

// الثيم الفاتح (الألوان القديمة)
export const lightThemeColors = {
  // الألوان الأساسية
  primary: {
    DEFAULT: '#34656D',
    dark: '#284E54',
    darker: '#284E54',
    light: '#6C8B89',
  },

  // اللون الثانوي
  secondary: {
    DEFAULT: '#334443',
    darker: '#334443',
  },

  // ألوان الإبراز
  accent: {
    primary: '#FAEAB1',
    DEFAULT: '#FAEAB1',
    secondary: '#F7DD7D',
    dark: '#F7DD7D',
    warm: '#F3D049',
    light: '#FCFAE1',
  },

  // الألوان المحايدة
  neutral: {
    bg: '#FAF8F1',
    background: '#FAF8F1',
    surface: '#FFFFFF',
    surfaceAlt: '#F0ECDD',
    border: '#E0DCC8',
    textMuted: '#A4C5CA',
    textSecondary: '#536765',
    light: '#A4C5CA',
    DEFAULT: '#8C9E9D',
    dark: '#536765',
    darker: '#334443',
  },

  // ألوان الحالة
  status: {
    success: '#3D8B64',
    error: '#C95454',
    warning: '#F3D049',
    info: '#34656D',
  },
} as const;

// الثيم الغامق (الألوان الجديدة)
export const darkThemeColors = {
  // الألوان الأساسية
  primary: {
    DEFAULT: '#F7374F',
    dark: '#88304E',
    darker: '#88304E',
    light: '#FF5A6E',
  },

  // اللون الثانوي
  secondary: {
    DEFAULT: '#522546',
    darker: '#522546',
  },

  // ألوان الإبراز
  accent: {
    primary: '#F7374F',
    DEFAULT: '#F7374F',
    secondary: '#88304E',
    dark: '#88304E',
    warm: '#F7374F',
    light: '#FFE5E9',
  },

  // الألوان المحايدة
  neutral: {
    bg: '#1A1A1A',
    background: '#1A1A1A',
    surface: '#2C2C2C',
    surfaceAlt: '#333333',
    border: '#444444',
    textMuted: '#999999',
    textSecondary: '#CCCCCC',
    light: '#999999',
    DEFAULT: '#757575',
    dark: '#E0E0E0',
    darker: '#F5F5F5',
  },

  // ألوان الحالة
  status: {
    success: '#4CAF50',
    error: '#F7374F',
    warning: '#FFA726',
    info: '#88304E',
  },
} as const;

// اللون الافتراضي (الثيم الفاتح)
export const colors = lightThemeColors;

export type ThemeColors = typeof lightThemeColors;
