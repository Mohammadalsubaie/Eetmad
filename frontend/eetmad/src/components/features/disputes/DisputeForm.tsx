'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FileText, Upload, X } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { Button, ErrorMessage } from '@/components/ui';
import Input from '@/components/ui/Input/Input';
import { useCreateDispute } from '@/lib/hooks/useDisputes';

interface DisputeFormProps {
  projectId?: string;
  onSuccess?: () => void;
}

export default function DisputeForm({ projectId, onSuccess }: DisputeFormProps) {
  const t = useTranslations('pages.disputes');
  const router = useRouter();
  const { mutate: createDispute, isLoading, error } = useCreateDispute();
  const [formData, setFormData] = useState({
    projectId: projectId || '',
    subject: '',
    description: '',
    category: 'other',
    priority: 'medium',
  });
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setEvidenceFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setEvidenceFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dispute = await createDispute({
        ...formData,
        category: formData.category as
          | 'quality'
          | 'delivery'
          | 'payment'
          | 'communication'
          | 'other',
        priority: formData.priority as 'low' | 'medium' | 'high' | 'urgent',
        evidence: evidenceFiles.length > 0 ? evidenceFiles : undefined,
      });

      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/disputes/${dispute.id}`);
      }
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage error={error.message || String(error)} variant="inline" />}

      {/* Project ID */}
      {!projectId && (
        <div>
          <label
            htmlFor="projectId"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('projectId')} *
          </label>
          <Input
            type="text"
            id="projectId"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            required
            className="w-full"
            placeholder={t('projectIdPlaceholder')}
          />
        </div>
      )}

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('subject')} *
        </label>
        <Input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full"
          placeholder={t('subjectPlaceholder')}
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('description')} *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={6}
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          placeholder={t('descriptionPlaceholder')}
        />
      </div>

      {/* Category and Priority */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('categoryLabel')} *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-xl border-2 px-4 py-3 text-sm"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            <option value="quality">{t('category.quality')}</option>
            <option value="delivery">{t('category.delivery')}</option>
            <option value="payment">{t('category.payment')}</option>
            <option value="communication">{t('category.communication')}</option>
            <option value="other">{t('category.other')}</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="priority"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('priorityLabel')} *
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            className="w-full rounded-xl border-2 px-4 py-3 text-sm"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            <option value="low">{t('priority.low')}</option>
            <option value="medium">{t('priority.medium')}</option>
            <option value="high">{t('priority.high')}</option>
            <option value="urgent">{t('priority.urgent')}</option>
          </select>
        </div>
      </div>

      {/* Evidence Files */}
      <div>
        <label
          htmlFor="evidence"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('evidence')} ({t('optional')})
        </label>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label
              htmlFor="evidence-upload"
              className="flex cursor-pointer items-center gap-2 rounded-xl border-2 px-4 py-3 transition-all"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <Upload className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
              <span className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('uploadEvidence')}
              </span>
            </label>
            <input
              id="evidence-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
          {evidenceFiles.length > 0 && (
            <div className="space-y-2">
              {evidenceFiles.map((file, index) => (
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

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
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
            type="submit"
            disabled={isLoading}
            className="w-full"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {isLoading ? t('submitting') : t('submit')}
          </Button>
        </motion.div>
      </div>
    </form>
  );
}
