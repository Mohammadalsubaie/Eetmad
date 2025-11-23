'use client';

import { cssVars } from '@/styles/theme';
import React from 'react';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

/**
 * SkipLink Component
 * 
 * يوفر رابط للتنقل السريع للمستخدمين الذين يستخدمون لوحة المفاتيح.
 * يظهر عند الضغط على Tab ويختفي بعد التنقل.
 * 
 * @example
 * <SkipLink href="#main-content">تخطي إلى المحتوى الرئيسي</SkipLink>
 */
const SkipLink: React.FC<SkipLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only"
      style={{
        position: 'absolute',
        top: '-100px',
        right: '16px',
        zIndex: 1000,
        padding: '12px 24px',
        backgroundColor: cssVars.primary.dark,
        color: 'white',
        borderRadius: '8px',
        fontWeight: 'bold',
        textDecoration: 'none',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        transition: 'top 0.2s ease-in-out',
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = '16px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-100px';
      }}
    >
      {children}
    </a>
  );
};

export default SkipLink;

