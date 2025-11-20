'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cssVars } from '@/styles/theme';

interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export default function RatingInput({
  value,
  onChange,
  size = 'md',
  label,
}: RatingInputProps) {
  const iconSize = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-8 w-8' : 'h-6 w-6';

  return (
    <div>
      {label && (
        <label
          className="mb-2 block text-sm font-semibold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <motion.button
            key={rating}
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange(rating)}
            className="rounded-lg p-1 transition-all"
          >
            <Star
              className={iconSize}
              style={{
                color:
                  value >= rating ? cssVars.status.warning : cssVars.neutral.border,
                fill: value >= rating ? cssVars.status.warning : 'none',
              }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
