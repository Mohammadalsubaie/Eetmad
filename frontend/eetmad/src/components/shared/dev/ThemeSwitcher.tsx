'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/lib/utils/themeColors';
import { getAvailableThemes, getThemeDisplayName, type ThemeOption } from '@/lib/utils/themeLoader';
import { cssVars } from '@/styles/theme';
import { ChevronDown, ChevronRight, Palette, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['Themes']));
  const { themeOption, setThemeOption } = useTheme();
  const t = useTranslations('dev');

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const availableThemes = getAvailableThemes();

  const toggleGroup = (group: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(group)) {
      newExpanded.delete(group);
    } else {
      newExpanded.add(group);
    }
    setExpandedGroups(newExpanded);
  };

  const selectTheme = (theme: ThemeOption) => {
    setThemeOption(theme);
    setIsOpen(false);
  };

  const filteredThemes = availableThemes.filter(
    (theme) =>
      getThemeDisplayName(theme).toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isActive = (theme: ThemeOption) => themeOption === theme;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-28 right-2 z-50 flex h-12 w-12 touch-manipulation items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 sm:bottom-36 sm:right-4"
        style={{
          backgroundColor: cssVars.primary.DEFAULT,
          color: cssVars.neutral.bg,
        }}
        title={t('themeSwitcher')}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Palette className="h-6 w-6" />}
      </button>

      {/* Switcher Panel */}
      {isOpen && (
        <div
          className="fixed right-0 top-0 z-50 flex h-screen w-full flex-col rounded-none border-0 shadow-2xl sm:right-4 sm:top-4 sm:h-[calc(100vh-2rem)] sm:w-80 sm:rounded-2xl sm:border-2"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between border-b-2 p-4"
            style={{ borderColor: cssVars.neutral.border }}
          >
            <h2 className="text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              🎨 Theme Switcher
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-lg p-1 transition-colors hover:opacity-80"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search */}
          <div className="border-b-2 p-4" style={{ borderColor: cssVars.neutral.border }}>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: cssVars.neutral.textMuted }}
              />
              <input
                type="text"
                placeholder={t('searchThemes')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full touch-manipulation rounded-lg border-2 px-10 py-2 text-sm focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: cssVars.neutral.bg,
                  borderColor: cssVars.neutral.border,
                  color: cssVars.neutral.DEFAULT,
                }}
              />
            </div>
          </div>

          {/* Current Theme Display */}
          <div className="border-b-2 p-4" style={{ borderColor: cssVars.neutral.border }}>
            <div className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
              {t('currentTheme')}
            </div>
            <div className="mt-1 text-sm font-bold" style={{ color: cssVars.primary.DEFAULT }}>
              {getThemeDisplayName(themeOption)}
            </div>
          </div>

          {/* Themes List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4">
              <button
                onClick={() => toggleGroup('Themes')}
                className="mb-2 flex min-h-[44px] w-full touch-manipulation items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: cssVars.primary.DEFAULT }}
              >
                <span>{t('themes')}</span>
                {expandedGroups.has('Themes') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {expandedGroups.has('Themes') && (
                <div className="space-y-2">
                  {filteredThemes.map((theme) => {
                    const active = isActive(theme);
                    const colors = getThemeColors(theme);
                    return (
                      <button
                        key={theme}
                        onClick={() => selectTheme(theme)}
                        className={`min-h-[44px] w-full touch-manipulation rounded-lg px-3 py-2.5 text-left transition-all ${
                          active ? 'font-semibold ring-2' : ''
                        }`}
                        style={{
                          backgroundColor: active
                            ? `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`
                            : 'transparent',
                          color: active ? cssVars.primary.DEFAULT : cssVars.neutral.DEFAULT,
                        }}
                        onMouseEnter={(e) => {
                          if (!active) {
                            e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!active) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {/* Color Palette Preview */}
                          <div
                            className="flex gap-0.5 rounded border"
                            style={{ borderColor: cssVars.neutral.border }}
                          >
                            <div
                              className="h-8 w-8 rounded-l"
                              style={{ backgroundColor: colors.primary }}
                              title={t('primary')}
                            />
                            <div
                              className="h-8 w-8"
                              style={{ backgroundColor: colors.accent }}
                              title={t('accent')}
                            />
                            <div
                              className="h-8 w-8"
                              style={{ backgroundColor: colors.background }}
                              title={t('background')}
                            />
                            <div
                              className="h-8 w-8 rounded-r"
                              style={{ backgroundColor: colors.text }}
                              title={t('text')}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{getThemeDisplayName(theme)}</span>
                              {active && <span className="text-xs opacity-60">✓</span>}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {filteredThemes.length === 0 && (
              <div
                className="py-8 text-center text-sm"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                {t('noThemesFound')}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="border-t-2 p-3 text-center text-xs"
            style={{
              borderColor: cssVars.neutral.border,
              color: cssVars.neutral.textMuted,
            }}
          >
            <div>{t('totalThemes', { count: availableThemes.length })}</div>
            <div className="mt-1">{t('devModeOnly')}</div>
          </div>
        </div>
      )}
    </>
  );
}
