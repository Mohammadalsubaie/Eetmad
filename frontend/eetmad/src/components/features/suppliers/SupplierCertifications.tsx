'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Supplier } from '@/lib/types/supplier.types';

interface SupplierCertificationsProps {
  supplier: Supplier;
}

export default function SupplierCertifications({ supplier }: SupplierCertificationsProps) {
  const t = useTranslations('pages.suppliers');

  if (!supplier.certifications || supplier.certifications.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('certifications') || 'Certifications'}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {supplier.certifications.map((cert) => (
          <div
            key={cert.id}
            className="flex items-center gap-4 rounded-2xl border-2 p-4"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <Award className="h-8 w-8 flex-shrink-0" style={{ color: cssVars.accent.warm }} />
            <div>
              <h3 className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {cert.name}
              </h3>
              <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                {cert.issuer} • {new Date(cert.issuedAt).getFullYear()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

