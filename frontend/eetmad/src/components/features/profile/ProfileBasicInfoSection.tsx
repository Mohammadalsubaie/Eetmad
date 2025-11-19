'use client';

import { Card, Input } from '@/components/ui';
import type { UpdateUserProfileData } from '@/lib/types/user.types';
import { cssVars } from '@/styles/theme';
import { Calendar, FileText, Phone, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProfileBasicInfoSectionProps {
  formData: UpdateUserProfileData;
  onInputChange: (field: string, value: string | null) => void;
}

export default function ProfileBasicInfoSection({
  formData,
  onInputChange,
}: ProfileBasicInfoSectionProps) {
  const t = useTranslations('pages.profile.edit');

  return (
    <Card className="p-8">
      <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('sections.basicInfo')}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          icon={User}
          placeholder={t('fields.fullName.placeholder')}
          value={formData.fullName || ''}
          onChange={(e) => onInputChange('fullName', e.target.value)}
          fullWidth
          required
        />
        <Input
          icon={Phone}
          type="tel"
          placeholder={t('fields.phone.placeholder')}
          value={formData.phone || ''}
          onChange={(e) => onInputChange('phone', e.target.value)}
          fullWidth
        />
        <Input
          icon={Calendar}
          type="date"
          placeholder={t('fields.dateOfBirth.placeholder')}
          value={formData.dateOfBirth || ''}
          onChange={(e) => onInputChange('dateOfBirth', e.target.value)}
          fullWidth
        />
        <Input
          icon={FileText}
          placeholder={t('fields.nationalId.placeholder')}
          value={formData.nationalId || ''}
          onChange={(e) => onInputChange('nationalId', e.target.value)}
          fullWidth
        />
      </div>
      <div className="mt-6">
        <label
          className="mb-2 block text-sm font-semibold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('fields.bio.label')}
        </label>
        <textarea
          className="w-full rounded-2xl border-2 p-6 text-lg font-semibold outline-none transition-all"
          style={{
            backgroundColor: cssVars.neutral.bg,
            color: cssVars.secondary.DEFAULT,
            borderColor: cssVars.neutral.border,
            minHeight: '120px',
          }}
          placeholder={t('fields.bio.placeholder')}
          value={formData.bio || ''}
          onChange={(e) => onInputChange('bio', e.target.value)}
          maxLength={500}
        />
        <p className="mt-2 text-sm" style={{ color: cssVars.neutral.textMuted }}>
          {(formData.bio || '').length}/500 {t('fields.bio.maxLength')}
        </p>
      </div>
    </Card>
  );
}

