'use client';

import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: cssVars.neutral.bg }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute right-20 top-20 h-96 w-96 animate-pulse rounded-full blur-3xl"
          style={{ background: cssVars.accent.primary, animationDuration: '4s' }}
        />
        <div
          className="absolute bottom-20 left-20 h-96 w-96 animate-pulse rounded-full blur-3xl"
          style={{
            background: cssVars.primary.DEFAULT,
            animationDuration: '6s',
            animationDelay: '1s',
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full blur-3xl"
          style={{ background: cssVars.accent.warm, animationDuration: '5s', animationDelay: '2s' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-100px)] items-center justify-center px-3 py-6 sm:min-h-[calc(100vh-120px)] sm:px-4 sm:py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex w-full justify-center"
        >
          {children}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-20 -top-20 h-40 w-40 rounded-full"
          style={{
            background: cssVars.gradient.gold,
            opacity: 0.1,
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full"
          style={{
            background: cssVars.gradient.primary,
            opacity: 0.1,
          }}
        />
      </div>
    </div>
  );
}
