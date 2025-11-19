'use client';

import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface SectionBadgeProps {
  /**
   * النص المعروض في الـ badge
   */
  children: React.ReactNode;
  /**
   * الأيقونة (اختياري)
   */
  icon?: LucideIcon;
  /**
   * نوع الخلفية - فاتح أو داكن
   */
  variant?: 'light' | 'dark';
  /**
   * لون الـ badge
   */
  color?: 'primary' | 'accent' | 'warm' | 'success';
  /**
   * إظهار نقطة متحركة
   */
  animated?: boolean;
  /**
   * CSS classes إضافية
   */
  className?: string;
}

/**
 * مكون Badge للأقسام - يستخدم في headers الأقسام
 *
 * @example
 * // على خلفية فاتحة
 * <SectionBadge icon={Sparkles} variant="light" color="primary">
 *   الميزات
 * </SectionBadge>
 *
 * @example
 * // على خلفية داكنة
 * <SectionBadge icon={Zap} variant="dark" color="accent" animated>
 *   جديد
 * </SectionBadge>
 */
export default function SectionBadge({
  children,
  icon: Icon,
  variant = 'light',
  color = 'primary',
  animated = false,
  className = '',
}: SectionBadgeProps) {
  const getColorStyles = () => {
    if (variant === 'dark') {
      // على خلفية داكنة - استخدم accent colors مع خلفية أكثر كثافة
      const colorMap = {
        primary: cssVars.accent.primary,
        accent: cssVars.accent.primary,
        warm: cssVars.accent.warm,
        success: cssVars.status.success,
      };
      const selectedColor = colorMap[color];

      return {
        backgroundColor: `color-mix(in srgb, ${cssVars.secondary.DEFAULT} 95%, transparent)`,
        borderColor: selectedColor,
        color: selectedColor,
      };
    } else {
      // على خلفية فاتحة - استخدم primary colors مع تباين أفضل
      const colorMap = {
        primary: {
          bg: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
          border: cssVars.primary.DEFAULT,
          text: cssVars.primary.DEFAULT,
        },
        accent: {
          bg: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
          border: cssVars.primary.DEFAULT,
          text: cssVars.primary.DEFAULT,
        },
        warm: {
          bg: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
          border: cssVars.primary.DEFAULT,
          text: cssVars.primary.DEFAULT,
        },
        success: {
          bg: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
          border: cssVars.status.success,
          text: cssVars.status.success,
        },
      };
      const selectedColor = colorMap[color];

      return {
        backgroundColor: selectedColor.bg,
        borderColor: selectedColor.border,
        color: selectedColor.text,
      };
    }
  };

  const getDotColor = () => {
    if (color === 'success') return cssVars.status.success;
    if (variant === 'dark') {
      return color === 'warm' ? cssVars.accent.warm : cssVars.accent.primary;
    }
    return color === 'warm' ? cssVars.primary.DEFAULT : cssVars.primary.DEFAULT;
  };

  const dotColor = getDotColor();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 text-sm font-bold shadow-lg ${
        variant === 'dark' ? 'backdrop-blur-sm' : ''
      } ${className}`}
      style={getColorStyles()}
    >
      {animated && (
        <div className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: dotColor }} />
      )}
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </motion.div>
  );
}
