'use client';

import { useUnreadCount } from '@/lib/hooks/useNotifications';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { cssVars } from '@/styles/theme';

interface NotificationBadgeProps {
  className?: string;
  showCount?: boolean;
}

export default function NotificationBadge({
  className = '',
  showCount = true,
}: NotificationBadgeProps) {
  const { data: unreadCount } = useUnreadCount();

  if (!showCount || unreadCount === 0) {
    return (
      <div className={`relative ${className}`}>
        <Bell className="h-5 w-5" style={{ color: cssVars.secondary.DEFAULT }} />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Bell className="h-5 w-5" style={{ color: cssVars.secondary.DEFAULT }} />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
        style={{
          backgroundColor: cssVars.status.error,
          color: cssVars.neutral.bg,
        }}
      >
        {unreadCount > 9 ? '9+' : unreadCount}
      </motion.div>
    </div>
  );
}
