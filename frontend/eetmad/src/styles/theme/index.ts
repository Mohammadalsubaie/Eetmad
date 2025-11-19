import { colors } from './colors';
import { cssVars } from './cssVariables';
import { gradients } from './gradients';
import { radius } from './radius';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  cssVars,
  gradients,
  spacing,
  radius,
  shadows,
  typography,
} as const;

export type Theme = typeof theme;

// تصدير كل شيء للاستخدام المباشر
export { colors, cssVars, gradients, radius, shadows, spacing, typography };
