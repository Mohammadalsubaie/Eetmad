'use client';

import { Card, Input } from '@/components/ui';
import type { UpdateUserProfileData } from '@/lib/types/user.types';
import { cssVars } from '@/styles/theme';
import { MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProfileAddressSectionProps {
  formData: UpdateUserProfileData;
  onInputChange: (field: string, value: string | null) => void;
}

export default function ProfileAddressSection({
  formData,
  onInputChange,
}: ProfileAddressSectionProps) {
  const t = useTranslations('pages.profile.edit');

  return (
    <Card className="p-8">
      <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('sections.address')}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          icon={MapPin}
          placeholder={t('fields.street.placeholder')}
          value={formData.address?.street || ''}
          onChange={(e) => onInputChange('address.street', e.target.value)}
          fullWidth
        />
        <Input
          icon={MapPin}
          placeholder={t('fields.city.placeholder')}
          value={formData.address?.city || ''}
          onChange={(e) => onInputChange('address.city', e.target.value)}
          fullWidth
        />
        <Input
          icon={MapPin}
          placeholder={t('fields.state.placeholder')}
          value={formData.address?.state || ''}
          onChange={(e) => onInputChange('address.state', e.target.value)}
          fullWidth
        />
        <Input
          icon={MapPin}
          placeholder={t('fields.country.placeholder')}
          value={formData.address?.country || ''}
          onChange={(e) => onInputChange('address.country', e.target.value)}
          fullWidth
        />
        <Input
          icon={MapPin}
          placeholder={t('fields.postalCode.placeholder')}
          value={formData.address?.postalCode || ''}
          onChange={(e) => onInputChange('address.postalCode', e.target.value)}
          fullWidth
        />
      </div>
    </Card>
  );
}

