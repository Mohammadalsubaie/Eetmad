'use client';

import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { User, Building2, CheckCircle2 } from 'lucide-react';
import type { UserType } from '@/lib/types/user.types';

// Re-export for backward compatibility
export type { UserType };

interface UserTypeSelectorProps {
  selectedType: UserType | null;
  onSelect: (type: UserType) => void;
}

export default function UserTypeSelector({ selectedType, onSelect }: UserTypeSelectorProps) {
  const t = useTranslations('auth.register.userType');

  const userTypes: Array<{
    type: Exclude<UserType, 'admin'>; // Exclude admin from registration
    icon: typeof User;
    titleKey: 'client' | 'supplier';
  }> = [
    { type: 'client', icon: User, titleKey: 'client' },
    { type: 'supplier', icon: Building2, titleKey: 'supplier' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3
          className="mb-2 text-xl font-bold sm:text-2xl"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('title')}
        </h3>
        <p className="text-sm sm:text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('subtitle')}
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {userTypes.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedType === item.type;

          return (
            <motion.button
              key={item.type}
              type="button"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(item.type)}
              className="relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all sm:rounded-2xl sm:p-6"
              style={{
                backgroundColor: isSelected
                  ? `color-mix(in srgb, ${cssVars.primary.DEFAULT} 5%, ${cssVars.neutral.surface})`
                  : cssVars.neutral.surface,
                borderColor: isSelected ? cssVars.primary.DEFAULT : cssVars.neutral.border,
              }}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full sm:right-4 sm:top-4 sm:h-8 sm:w-8"
                  style={{ backgroundColor: cssVars.primary.DEFAULT }}
                >
                  <CheckCircle2
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    style={{ color: cssVars.neutral.surface }}
                  />
                </motion.div>
              )}

              <div
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl sm:mb-4 sm:h-16 sm:w-16 sm:rounded-2xl"
                style={{
                  backgroundColor: isSelected
                    ? `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`
                    : `color-mix(in srgb, ${cssVars.neutral.textMuted} 10%, transparent)`,
                }}
              >
                <Icon
                  className="h-6 w-6 sm:h-8 sm:w-8"
                  style={{
                    color: isSelected ? cssVars.primary.DEFAULT : cssVars.neutral.textMuted,
                  }}
                />
              </div>

              <h4
                className="mb-1.5 text-lg font-bold sm:mb-2 sm:text-xl"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t(`${item.titleKey}.title`)}
              </h4>
              <p className="text-xs sm:text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                {t(`${item.titleKey}.description`)}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
