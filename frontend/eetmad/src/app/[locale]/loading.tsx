'use client';

import { animationVariants, easing } from '@/lib/theme/animation-standards';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Loading() {
  const t = useTranslations('common');

  // Generate floating particles (using useState with lazy initializer to avoid impure function calls during render)
  const particles = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
  )[0];

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        backgroundColor: cssVars.neutral.bg,
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${cssVars.primary.DEFAULT}15 0%, transparent 50%),
                      radial-gradient(ellipse at 70% 50%, ${cssVars.accent.primary}10 0%, transparent 50%)`,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: cssVars.primary.DEFAULT,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, (particle.x % 20) - 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: easing.easeInOut,
            delay: particle.delay,
          }}
        />
      ))}

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-12">
        {/* Morphing blob with gradient */}
        <motion.div
          className="relative"
          initial={animationVariants.scaleIn.initial}
          animate={animationVariants.scaleIn.animate}
          transition={animationVariants.scaleIn.transition}
        >
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0"
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              border: `3px solid transparent`,
              borderTopColor: cssVars.primary.DEFAULT,
              borderRightColor: cssVars.accent.primary,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Middle pulsing ring */}
          <motion.div
            className="absolute inset-0"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: `2px solid ${cssVars.accent.warm}`,
              opacity: 0.6,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: easing.easeInOut,
            }}
          />

          {/* Central morphing blob */}
          <motion.div
            className="relative flex h-24 w-24 items-center justify-center"
            style={{
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              background: `linear-gradient(135deg, ${cssVars.primary.DEFAULT}, ${cssVars.accent.primary}, ${cssVars.accent.warm})`,
              backgroundSize: '200% 200%',
              boxShadow: `0 0 60px ${cssVars.primary.DEFAULT}50, inset 0 0 30px ${cssVars.accent.warm}30`,
            }}
            animate={{
              borderRadius: [
                '30% 70% 70% 30% / 30% 30% 70% 70%',
                '70% 30% 30% 70% / 70% 70% 30% 30%',
                '30% 70% 70% 30% / 30% 30% 70% 70%',
              ],
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              rotate: [0, 180, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: easing.easeInOut,
            }}
          >
            {/* Inner icon */}
            <motion.div
              animate={{
                rotate: -360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                },
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: easing.easeInOut,
                },
              }}
            >
              <Sparkles
                className="h-12 w-12"
                style={{ color: cssVars.neutral.bg }}
                aria-hidden="true"
              />
            </motion.div>

            {/* Glowing dots around the blob */}
            {[0, 1, 2, 3].map((index) => {
              const angle = (index * 90 * Math.PI) / 180;
              const radius = 70;
              return (
                <motion.div
                  key={index}
                  className="absolute h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: cssVars.accent.warm,
                    boxShadow: `0 0 12px ${cssVars.accent.warm}`,
                    left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                    top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: easing.easeInOut,
                    delay: index * 0.2,
                  }}
                />
              );
            })}
          </motion.div>
        </motion.div>

        {/* Loading text with wave animation */}
        <motion.div
          className="relative flex flex-col items-center gap-4"
          initial={animationVariants.fadeInUp.initial}
          animate={animationVariants.fadeInUp.animate}
          transition={{
            ...animationVariants.fadeInUp.transition,
            delay: 0.3,
          }}
        >
          <motion.p
            className="text-2xl font-bold tracking-wide"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('loading')
              .split('')
              .map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: easing.easeInOut,
                    delay: index * 0.1,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
          </motion.p>

          {/* Progress bar animation */}
          <div
            className="relative h-1 w-48 overflow-hidden rounded-full"
            style={{
              backgroundColor: `${cssVars.neutral.border}40`,
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${cssVars.primary.DEFAULT}, ${cssVars.accent.primary}, ${cssVars.accent.warm})`,
                backgroundSize: '200% 100%',
                boxShadow: `0 0 10px ${cssVars.primary.DEFAULT}60`,
              }}
              animate={{
                x: ['-100%', '100%'],
                backgroundPosition: ['0% 0%', '200% 0%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Wave effects at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="absolute bottom-0 h-full w-full"
            style={{
              background: `linear-gradient(180deg, transparent, ${cssVars.primary.DEFAULT}${5 + index * 3})`,
              clipPath: `polygon(0 ${100 - index * 10}%, 100% ${90 - index * 10}%, 100% 100%, 0% 100%)`,
            }}
            animate={{
              clipPath: [
                `polygon(0 ${100 - index * 10}%, 100% ${90 - index * 10}%, 100% 100%, 0% 100%)`,
                `polygon(0 ${95 - index * 10}%, 100% ${85 - index * 10}%, 100% 100%, 0% 100%)`,
                `polygon(0 ${100 - index * 10}%, 100% ${90 - index * 10}%, 100% 100%, 0% 100%)`,
              ],
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              ease: easing.easeInOut,
              delay: index * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
