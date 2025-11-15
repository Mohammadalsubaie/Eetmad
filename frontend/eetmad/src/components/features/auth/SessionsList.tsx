'use client';

import { useState } from 'react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Tablet, MapPin, Clock, CheckCircle2, X } from 'lucide-react';
import type { Session, DeviceType } from '@/lib/types/auth.types';

export default function SessionsList() {
  const t = useTranslations('auth.sessions');
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      device: 'desktop',
      browser: 'Chrome 120',
      os: 'Windows 11',
      location: 'Riyadh, Saudi Arabia',
      ip: '192.168.1.1',
      lastActive: '2 minutes ago',
      isCurrent: true,
    },
    {
      id: '2',
      device: 'mobile',
      browser: 'Safari',
      os: 'iOS 17',
      location: 'Jeddah, Saudi Arabia',
      ip: '192.168.1.2',
      lastActive: '1 hour ago',
      isCurrent: false,
    },
    {
      id: '3',
      device: 'tablet',
      browser: 'Firefox 121',
      os: 'Android 14',
      location: 'Dammam, Saudi Arabia',
      ip: '192.168.1.3',
      lastActive: '3 hours ago',
      isCurrent: false,
    },
  ]);

  const handleTerminateSession = (sessionId: string) => {
    setSessions(sessions.filter((s) => s.id !== sessionId));
  };

  const handleTerminateAll = () => {
    setSessions(sessions.filter((s) => s.isCurrent));
  };

  const getDeviceIcon = (device: DeviceType) => {
    switch (device) {
      case 'desktop':
        return Monitor;
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  const otherSessions = sessions.filter((s) => !s.isCurrent);

  return (
    <div
      className="w-full max-w-3xl rounded-3xl border-2 p-8 shadow-2xl md:p-10"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('title')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('subtitle')}
        </p>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((session) => {
          const Icon = getDeviceIcon(session.device);

          return (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-2xl border-2 p-6"
              style={{
                backgroundColor: session.isCurrent
                  ? `color-mix(in srgb, ${cssVars.primary.DEFAULT} 5%, ${cssVars.neutral.bg})`
                  : cssVars.neutral.bg,
                borderColor: session.isCurrent ? cssVars.primary.DEFAULT : cssVars.neutral.border,
              }}
            >
              {/* Current Session Badge */}
              {session.isCurrent && (
                <div
                  className="absolute right-6 top-6 flex items-center gap-2 rounded-lg px-3 py-1 text-xs font-bold"
                  style={{
                    backgroundColor: cssVars.status.success,
                    color: cssVars.neutral.surface,
                  }}
                >
                  <CheckCircle2 className="h-3 w-3" />
                  {t('currentSession')}
                </div>
              )}

              <div className="flex items-start gap-4">
                {/* Device Icon */}
                <div
                  className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                  }}
                >
                  <Icon className="h-8 w-8" style={{ color: cssVars.primary.DEFAULT }} />
                </div>

                {/* Session Info */}
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {session.browser}
                  </h3>
                  <p className="mb-3 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                    {session.os}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                      <MapPin className="h-4 w-4" />
                      <span>{session.location}</span>
                      <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                        ({session.ip})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                      <Clock className="h-4 w-4" />
                      <span>{t('lastActive', { time: session.lastActive })}</span>
                    </div>
                  </div>
                </div>

                {/* Terminate Button */}
                {!session.isCurrent && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTerminateSession(session.id)}
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-all"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${cssVars.status.error} 15%, transparent)`,
                    }}
                  >
                    <X className="h-5 w-5" style={{ color: cssVars.status.error }} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Terminate All Button */}
      {otherSessions.length > 0 ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleTerminateAll}
          className="mt-6 w-full rounded-xl border-2 py-4 font-bold transition-all"
          style={{
            backgroundColor: cssVars.neutral.bg,
            borderColor: cssVars.status.error,
            color: cssVars.status.error,
          }}
        >
          {t('terminateAllButton')}
        </motion.button>
      ) : (
        <div
          className="mt-6 rounded-2xl p-6 text-center"
          style={{ backgroundColor: cssVars.neutral.bg }}
        >
          <p className="text-sm font-semibold" style={{ color: cssVars.neutral.textMuted }}>
            {t('noOtherSessions')}
          </p>
        </div>
      )}
    </div>
  );
}
