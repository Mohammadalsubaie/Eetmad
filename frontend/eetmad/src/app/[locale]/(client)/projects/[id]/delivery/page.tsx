'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, FileText, X } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useProject, useAddDeliveryProof } from '@/lib/hooks/useProjects';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function DeliveryProofPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.projects');
  const { data: project, isLoading: projectLoading } = useProject(id);
  const { mutate: addDeliveryProof, isLoading: uploading, error } = useAddDeliveryProof();
  const [files, setFiles] = useState<File[]>([]);
  const [notes, setNotes] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert(t('filesRequired'));
      return;
    }

    try {
      await addDeliveryProof(id, files, notes || undefined);
      router.push(`/${locale}/projects/${id}`);
    } catch (err) {
      // Error handled by hook
    }
  };

  if (projectLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('title'), href: `/${locale}/projects` },
            { label: id },
            { label: t('deliveryProof') },
          ]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('title'), href: `/${locale}/projects` },
            { label: id },
            { label: t('deliveryProof') },
          ]}
          className="mb-6"
        />
        <ErrorMessage error={t('projectNotFound')} variant="banner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/projects` },
          { label: project.projectNumber || id, href: `/${locale}/projects/${id}` },
          { label: t('deliveryProof') },
        ]}
        className="mb-6"
      />

      {/* Back Button */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-medium"
        style={{ color: cssVars.primary.DEFAULT }}
      >
        <ArrowLeft className="h-4 w-4" />
        {t('back')}
      </motion.button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('deliveryProof')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('deliveryProofDescription')}
        </p>
      </div>

      {/* Form */}
      <div
        className="rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        {error && (
          <ErrorMessage error={error.message || String(error)} variant="inline" className="mb-6" />
        )}

        {/* Files Upload */}
        <div className="mb-6">
          <label
            htmlFor="files"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('deliveryFiles')} *
          </label>
          <div className="space-y-3">
            <label
              htmlFor="files-upload"
              className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-all hover:border-primary"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
              }}
            >
              <Upload className="h-8 w-8" style={{ color: cssVars.primary.DEFAULT }} />
              <div className="text-center">
                <p className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {t('uploadFiles')}
                </p>
                <p className="text-sm" style={{ color: cssVars.neutral.textMuted }}>
                  {t('uploadFilesDescription')}
                </p>
              </div>
            </label>
            <input
              id="files-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border-2 px-3 py-2"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                      borderColor: cssVars.primary.DEFAULT,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
                      <span
                        className="text-sm font-medium"
                        style={{ color: cssVars.secondary.DEFAULT }}
                      >
                        {file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="flex-shrink-0"
                      style={{ color: cssVars.status.error }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label
            htmlFor="notes"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('deliveryNotes')} ({t('optional')})
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full rounded-xl border-2 px-4 py-3 text-sm"
            style={{
              backgroundColor: cssVars.neutral.bg,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
            placeholder={t('deliveryNotesPlaceholder')}
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
            style={{
              borderColor: cssVars.neutral.border,
              color: cssVars.neutral.textSecondary,
            }}
          >
            {t('cancel')}
          </Button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
            <Button
              onClick={handleSubmit}
              disabled={uploading || files.length === 0}
              className="w-full"
              icon={Upload}
              style={{
                background: cssVars.gradient.gold,
                color: cssVars.secondary.DEFAULT,
              }}
            >
              {uploading ? t('uploading') : t('submit')}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
