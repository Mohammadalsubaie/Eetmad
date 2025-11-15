'use client';

import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface GradientIconProps {
  /**
   * الأيقونة
   */
  icon: LucideIcon;
  /**
   * اللون أو الـ gradient
   */
  background?: string;
  /**
   * حجم الأيقونة
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * لون الأيقونة نفسها
   */
  iconColor?: string;
  /**
   * تفعيل الحركة عند hover
   */
  animated?: boolean;
  /**
   * CSS classes إضافية
   */
  className?: string;
}

/**
 * مكون أيقونة مع خلفية gradient
 * 
 * @example
 * <GradientIcon
 *   icon={Sparkles}
 *   background={cssVars.gradient.primary}
 *   size="lg"
 *   animated
 * />
 * 
 * @example
 * <GradientIcon
 *   icon={Code}
 *   background={cssVars.primary.DEFAULT}
 *   size="md"
 * />
 */
export default function GradientIcon({
  icon: Icon,
  background = cssVars.gradient.primary,
  size = 'md',
  iconColor = cssVars.neutral.bg,
  animated = true,
  className = '',
}: GradientIconProps) {
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20',
    xl: 'h-24 w-24',
  };

  const iconSizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12',
  };

  const motionProps = animated
    ? {
        whileHover: { rotate: [0, -10, 10, -10, 0], scale: 1.1 },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <motion.div
      {...motionProps}
      className={`inline-flex items-center justify-center rounded-2xl shadow-xl ${sizeClasses[size]} ${className}`}
      style={{ background }}
    >
      <Icon className={iconSizeClasses[size]} style={{ color: iconColor }} />
    </motion.div>
  );
}

