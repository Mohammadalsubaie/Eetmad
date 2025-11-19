'use client';

import { Card, Input } from '@/components/ui';
import type { UpdateUserProfileData } from '@/lib/types/user.types';
import { cssVars } from '@/styles/theme';
import { Github, Globe, Linkedin, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProfileSocialSectionProps {
  formData: UpdateUserProfileData;
  onInputChange: (field: string, value: string | null) => void;
}

export default function ProfileSocialSection({
  formData,
  onInputChange,
}: ProfileSocialSectionProps) {
  const t = useTranslations('pages.profile.edit');

  return (
    <Card className="p-8">
      <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('sections.socialLinks')}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          icon={Globe}
          type="url"
          placeholder={t('fields.website.placeholder')}
          value={formData.website || ''}
          onChange={(e) => onInputChange('website', e.target.value)}
          fullWidth
        />
        <Input
          icon={Linkedin}
          type="url"
          placeholder={t('fields.linkedin.placeholder')}
          value={formData.socialLinks?.linkedin || ''}
          onChange={(e) => onInputChange('socialLinks.linkedin', e.target.value)}
          fullWidth
        />
        <Input
          icon={Twitter}
          type="url"
          placeholder={t('fields.twitter.placeholder')}
          value={formData.socialLinks?.twitter || ''}
          onChange={(e) => onInputChange('socialLinks.twitter', e.target.value)}
          fullWidth
        />
        <Input
          icon={Github}
          type="url"
          placeholder={t('fields.github.placeholder')}
          value={formData.socialLinks?.github || ''}
          onChange={(e) => onInputChange('socialLinks.github', e.target.value)}
          fullWidth
        />
      </div>
    </Card>
  );
}

