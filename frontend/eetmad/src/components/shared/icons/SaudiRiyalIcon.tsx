'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils/cn';
import { cssVars } from '@/styles/theme';
import { useEffect, useState } from 'react';

interface SaudiRiyalIconProps {
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

export default function SaudiRiyalIcon({ className, style, width, height }: SaudiRiyalIconProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === 'dark';

  // Default size matches typical icon sizes (h-5 w-5 = 20px)
  const defaultSize = 20;
  const iconWidth = width || defaultSize;
  const iconHeight = height || defaultSize;

  // Avoid hydration mismatch
  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Theme-aware styles using CSS variables
  // Use CSS mask to apply theme color to the black icon
  const maskColor = mounted
    ? isDark
      ? cssVars.neutral.light // Light color in dark mode
      : cssVars.secondary.DEFAULT // Theme color in light mode
    : cssVars.secondary.DEFAULT; // Default to theme color before mount

  return (
    <span
      className={cn('inline-block', className)}
      style={{
        width: iconWidth,
        height: iconHeight,
        backgroundColor: maskColor,
        maskImage: 'url(/saudi-riyal-symbol.png)',
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: 'url(/saudi-riyal-symbol.png)',
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        transition: 'background-color 0.3s ease-in-out',
        ...style,
      }}
      role="img"
      aria-label="Saudi Riyal"
    />
  );
}
