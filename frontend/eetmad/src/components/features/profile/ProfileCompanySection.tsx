'use client';

import { Card, Input } from '@/components/ui';
import type { UpdateUserProfileData } from '@/lib/types/user.types';
import { Building2, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';

interface ProfileCompanySectionProps {
  formData: UpdateUserProfileData;
  onInputChange: (field: string, value: string | null) => void;
}

export default function ProfileCompanySection({
  formData,
  onInputChange,
}: ProfileCompanySectionProps) {
  const t = useTranslations('pages.profile.edit');

  return (
    <Card className="p-8">
      <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('sections.companyInfo')}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          icon={Building2}
          placeholder={t('fields.companyName.placeholder')}
          value={formData.companyName || ''}
          onChange={(e) => onInputChange('companyName', e.target.value)}
          fullWidth
        />
        <Input
          icon={FileText}
          placeholder={t('fields.commercialRegister.placeholder')}
          value={formData.commercialRegister || ''}
          onChange={(e) => onInputChange('commercialRegister', e.target.value)}
          fullWidth
        />
        <Input
          icon={FileText}
          placeholder={t('fields.taxNumber.placeholder')}
          value={formData.taxNumber || ''}
          onChange={(e) => onInputChange('taxNumber', e.target.value)}
          fullWidth
        />
      </div>
    </Card>
  );
}
