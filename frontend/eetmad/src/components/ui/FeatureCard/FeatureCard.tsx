'use client';

import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowUpRight } from 'lucide-react';
import GradientIcon from '../GradientIcon/GradientIcon';

export interface FeatureCardProps {
  /**
   * عنوان الميزة
   */
  title: string;
  /**
   * وصف الميزة
   */
  description: string;
  /**
   * الأيقونة
   */
  icon: LucideIcon;
  /**
   * لون/gradient الأيقونة
   */
  iconColor?: string;
  /**
   * إظهار مؤشر السهم
   */
  showArrow?: boolean;
  /**
   * نص إضافي أسفل البطاقة
   */
  footer?: string;
  /**
   * تأخير الحركة
   */
  animationDelay?: number;
  /**
   * CSS classes إضافية
   */
  className?: string;
  /**
   * معالج النقر
   */
  onClick?: () => void;
}

/**
 * بطاقة ميزة - تستخدم لعرض المميزات والفوائد
 *
 * @example
 * <FeatureCard
 *   title="الشفافية الكاملة"
 *   description="جميع العمليات واضحة ومراقبة"
 *   icon={ShieldCheck}
 *   iconColor={cssVars.status.success}
 *   showArrow
 * />
 */
export default function FeatureCard({
  title,
  description,
  icon,
  iconColor = cssVars.primary.DEFAULT,
  showArrow = true,
  footer,
  animationDelay = 0,
  className = '',
  onClick,
}: FeatureCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      {/* Animated gradient background on hover */}
      <div
        className="absolute inset-0 translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-5"
        style={{
          background: `linear-gradient(135deg, ${iconColor} 0%, transparent 100%)`,
        }}
      />

      {/* Icon */}
      <div className="relative mb-6">
        <GradientIcon
          icon={icon}
          background={`linear-gradient(135deg, ${iconColor} 0%, color-mix(in srgb, ${iconColor} 60%, transparent) 100%)`}
          size="md"
          animated
        />
        {showArrow && (
          <div
            className="absolute -right-1 -top-1 h-6 w-6 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ backgroundColor: iconColor }}
          >
            <ArrowUpRight className="h-6 w-6" style={{ color: cssVars.neutral.bg }} />
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="relative mb-4 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {title}
      </h3>

      {/* Description */}
      <p
        className="relative flex-1 text-sm leading-relaxed"
        style={{ color: cssVars.neutral.textSecondary }}
      >
        {description}
      </p>

      {/* Footer */}
      {footer && (
        <div className="relative mt-6 text-sm font-bold" style={{ color: iconColor }}>
          {footer}
        </div>
      )}

      {/* Bottom accent bar */}
      <div
        className="relative mt-6 h-1 w-0 rounded-full transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: iconColor }}
      />
    </motion.article>
  );
}
