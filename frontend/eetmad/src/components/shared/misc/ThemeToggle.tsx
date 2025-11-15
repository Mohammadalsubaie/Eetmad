'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-10 w-20 rounded-full"
        style={{
          backgroundColor: `color-mix(in srgb, ${cssVars.neutral.textMuted} 15%, transparent)`,
        }}
      />
    );
  }

  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative h-10 w-20 overflow-hidden rounded-full shadow-sm"
      style={{
        backgroundColor: isDark ? cssVars.secondary.DEFAULT : cssVars.accent.light,
        border: `1px solid ${cssVars.neutral.border}`,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Sliding indicator */}
      <motion.div
        className="absolute inset-y-0 w-1/2 rounded-full shadow-md"
        style={{
          backgroundColor: cssVars.neutral.surface,
        }}
        initial={false}
        animate={{
          x: isDark ? '100%' : '0%',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
      />

      {/* Icons container */}
      <div className="relative flex h-full items-center justify-between px-2">
        <motion.div
          animate={{
            scale: isDark ? 0.75 : 1,
            opacity: isDark ? 0.4 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="flex flex-1 items-center justify-center"
        >
          <Sun
            className="h-5 w-5"
            style={{
              color: isDark ? cssVars.neutral.textMuted : cssVars.accent.warm,
            }}
          />
        </motion.div>
        <motion.div
          animate={{
            scale: isDark ? 1 : 0.75,
            opacity: isDark ? 1 : 0.4,
          }}
          transition={{ duration: 0.2 }}
          className="flex flex-1 items-center justify-center"
        >
          <Moon
            className="h-5 w-5"
            style={{
              color: isDark ? cssVars.primary.DEFAULT : cssVars.neutral.textMuted,
            }}
          />
        </motion.div>
      </div>
    </motion.button>
  );
}
