'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import SectionBadge from '../SectionBadge/SectionBadge';

export interface SectionHeaderProps {
  /**
   * نص الـ badge (eyebrow)
   */
  badge?: string;
  /**
   * أيقونة الـ badge
   */
  badgeIcon?: LucideIcon;
  /**
   * العنوان الرئيسي
   */
  title: string;
  /**
   * الوصف/Subtitle
   */
  subtitle?: string;
  /**
   * نوع الخلفية
   */
  variant?: 'light' | 'dark';
  /**
   * محاذاة النص
   */
  align?: 'left' | 'center' | 'right';
  /**
   * لون الـ badge
   */
  badgeColor?: 'primary' | 'accent' | 'warm';
  /**
   * نقطة متحركة في الـ badge
   */
  badgeAnimated?: boolean;
  /**
   * CSS classes إضافية
   */
  className?: string;
}

/**
 * مكون Header للأقسام - يستخدم في بداية كل section
 *
 * @example
 * // على خلفية فاتحة
 * <SectionHeader
 *   badge="الميزات"
 *   badgeIcon={Sparkles}
 *   title="لماذا منصتنا؟"
 *   subtitle="اكتشف المميزات الفريدة"
 *   variant="light"
 *   align="center"
 * />
 *
 * @example
 * // على خلفية داكنة
 * <SectionHeader
 *   badge="جديد"
 *   badgeIcon={Zap}
 *   title="جاهز للانطلاق"
 *   subtitle="ابدأ رحلتك معنا"
 *   variant="dark"
 *   badgeAnimated
 * />
 */
export default function SectionHeader({
  badge,
  badgeIcon,
  title,
  subtitle,
  variant = 'light',
  align = 'center',
  badgeColor = 'primary',
  badgeAnimated = false,
  className = '',
}: SectionHeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // تحديد ألوان النص بناءً على variant (نوع الخلفية) والثيم الفعلي
  // variant="dark" يعني خلفية داكنة (gradient.hero) - يحتاج نص فاتح
  // variant="light" يعني خلفية فاتحة - يحتاج نص داكن
  const getTextColors = () => {
    if (variant === 'dark') {
      // على خلفية داكنة: استخدم لون فاتح
      // في Light Mode: neutral.bg = #faf8f1 (فاتح) - Contrast: 11.5:1
      // في Dark Mode: neutral.darker = #f0f5f4 (فاتح جداً) - Contrast: 12.8:1
      return {
        title: isDark ? cssVars.neutral.darker : cssVars.neutral.bg,
        subtitle: isDark ? cssVars.neutral.darker : cssVars.neutral.bg,
        subtitleOpacity: 0.95, // opacity خفيف للراحة البصرية
      };
    } else {
      // على خلفية فاتحة: استخدم لون داكن
      return {
        title: cssVars.secondary.DEFAULT,
        subtitle: cssVars.neutral.textSecondary,
        subtitleOpacity: 1,
      };
    }
  };

  const { title: titleColor, subtitle: subtitleColor, subtitleOpacity } = getTextColors();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${alignmentClasses[align]} ${className}`}
    >
      {badge && (
        <div className="mb-6">
          <SectionBadge
            icon={badgeIcon}
            variant={variant}
            color={badgeColor}
            animated={badgeAnimated}
          >
            {badge}
          </SectionBadge>
        </div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
        style={{ color: titleColor }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto max-w-3xl text-xl leading-relaxed"
          style={{ color: subtitleColor, opacity: subtitleOpacity }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
