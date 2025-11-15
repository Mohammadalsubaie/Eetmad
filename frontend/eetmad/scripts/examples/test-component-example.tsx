/**
 * ملف مثال لاختبار سكريبت فحص قواعد البناء
 * يحتوي على أخطاء متعمدة لإظهار قدرات السكريبت
 */

'use client';

import { useState } from 'react';
// ❌ خطأ: استيراد colors بدلاً من cssVars
import { colors } from '@/styles/theme';

export default function TestComponent() {
  const [count, setCount] = useState(0);

  return (
    <div
      className="container mx-auto p-4"
      // ❌ خطأ: استخدام hex color مباشر
      style={{
        backgroundColor: '#FAF8F1',
        color: '#334443',
      }}
    >
      {/* ❌ خطأ: نص hardcoded */}
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
      
      {/* ❌ خطأ: نص عربي hardcoded */}
      <p className="text-lg">مرحباً بك في منصتنا الرائعة</p>

      <div
        // ❌ خطأ: استخدام rgba مباشر
        style={{
          backgroundColor: 'rgba(51, 68, 67, 0.95)',
          padding: '20px',
        }}
      >
        {/* ❌ خطأ: استخدام directional class */}
        <button 
          className="ml-4 mr-2 px-6 py-3"
          onClick={() => setCount(count + 1)}
        >
          Click Me
        </button>

        {/* ❌ خطأ: استخدام Tailwind arbitrary value */}
        <div className="bg-[#FFFFFF] text-[#334443] p-4">
          <span>Count: {count}</span>
        </div>
      </div>

      {/* ❌ خطأ: استخدام colors بدلاً من cssVars */}
      <div style={{ backgroundColor: colors.neutral.bg }}>
        <p>This uses colors instead of cssVars</p>
      </div>
    </div>
  );
}

