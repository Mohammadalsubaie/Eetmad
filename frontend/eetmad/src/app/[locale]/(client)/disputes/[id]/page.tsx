'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  FileText,
  Download,
  Upload,
  MessageSquare,
  CheckCircle2,
  XCircle,
  User,
  Calendar,
} from 'lucide-react';
import { cssVars } from '@/styles/theme';
import {
  useDispute,
  useDisputeMessages,
  useAddDisputeMessage,
  useAddEvidence,
  useCloseDispute,
} from '@/lib/hooks/useDisputes';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import StatusBadge from '@/components/shared/badges/StatusBadge';
import { Badge } from '@/components/ui';
import Input from '@/components/ui/Input/Input';

export default function DisputeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.disputes');
  const { data: dispute, isLoading, error } = useDispute(id);
  const { data: messages, isLoading: messagesLoading } = useDisputeMessages(id);
  const { mutate: addMessage, isLoading: sending } = useAddDisputeMessage();
  const { mutate: addEvidence, isLoading: uploading } = useAddEvidence();
  const { mutate: closeDispute, isLoading: closing } = useCloseDispute();
  const [messageContent, setMessageContent] = useState('');
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!messageContent.trim()) return;

    try {
      await addMessage(id, { content: messageContent });
      setMessageContent('');
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleAddEvidence = async () => {
    if (!evidenceFile) return;

    try {
      await addEvidence(id, { file: evidenceFile });
      setEvidenceFile(null);
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleClose = () => {
    if (confirm(t('confirmClose'))) {
      closeDispute(id);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/disputes` }, { label: id }]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !dispute) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/disputes` }, { label: id }]}
          className="mb-6"
        />
        <ErrorMessage error={error?.message || t('disputeNotFound')} variant="banner" />
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('notAvailable');
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/disputes` },
          { label: dispute.disputeNumber || id },
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
        <div className="mb-4 flex items-center gap-2">
          <StatusBadge
            status={dispute.status}
            labels={{
              open: t('status.open'),
              in_review: t('status.in_review'),
              resolved: t('status.resolved'),
              closed: t('status.closed'),
              escalated: t('status.escalated'),
            }}
            colorMap={{
              open: cssVars.status.warning,
              in_review: cssVars.status.info,
              resolved: cssVars.status.success,
              closed: cssVars.neutral.textMuted,
              escalated: cssVars.status.error,
            }}
          />
          <Badge
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
              color: cssVars.primary.DEFAULT,
              borderColor: cssVars.primary.DEFAULT,
            }}
          >
            {t(`category.${dispute.category}`)}
          </Badge>
          <Badge
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`,
              color: cssVars.status.warning,
              borderColor: cssVars.status.warning,
            }}
          >
            {t(`priority.${dispute.priority}`)}
          </Badge>
        </div>
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {dispute.subject}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {dispute.description}
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          {/* Evidence */}
          {dispute.evidence && dispute.evidence.length > 0 && (
            <div
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('evidence')}
              </h2>
              <div className="space-y-2">
                {dispute.evidence.map(
                  (evidence: {
                    id: string;
                    filePath: string;
                    fileType: string;
                    description?: string;
                    uploadedAt: string;
                  }) => (
                    <a
                      key={evidence.id}
                      href={evidence.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border-2 p-3 transition-all hover:shadow-md"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                        borderColor: cssVars.primary.DEFAULT,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
                        <div>
                          <p className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                            {evidence.filePath.split('/').pop()}
                          </p>
                          {evidence.description && (
                            <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                              {evidence.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <Download className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
                    </a>
                  )
                )}
              </div>
            </div>
          )}

          {/* Messages */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('messages')}
            </h2>
            <div className="max-h-96 space-y-4 overflow-y-auto">
              {messagesLoading ? (
                <LoadingSpinner />
              ) : messages.length === 0 ? (
                <p style={{ color: cssVars.neutral.textMuted }}>{t('noMessages')}</p>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className="rounded-lg border-2 p-4"
                    style={{
                      backgroundColor: message.isInternal
                        ? `color-mix(in srgb, ${cssVars.status.warning} 10%, transparent)`
                        : cssVars.neutral.bg,
                      borderColor: cssVars.neutral.border,
                    }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
                        <span
                          className="text-xs font-semibold"
                          style={{ color: cssVars.neutral.textMuted }}
                        >
                          {message.isInternal ? t('internalNote') : t('message')}
                        </span>
                      </div>
                      <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: cssVars.secondary.DEFAULT }}>
                      {message.content}
                    </p>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Add Message */}
            {dispute.status !== 'closed' && (
              <div className="mt-4 space-y-3">
                <Input
                  type="text"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder={t('typeMessage')}
                  className="w-full"
                  icon={MessageSquare}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={sending || !messageContent.trim()}
                  variant="primary"
                  style={{
                    background: cssVars.gradient.gold,
                    color: cssVars.secondary.DEFAULT,
                  }}
                >
                  {sending ? t('sending') : t('send')}
                </Button>
              </div>
            )}
          </div>

          {/* Add Evidence */}
          {dispute.status !== 'closed' && (
            <div
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('addEvidence')}
              </h2>
              <div className="space-y-3">
                <input
                  type="file"
                  onChange={(e) => setEvidenceFile(e.target.files?.[0] || null)}
                  className="w-full rounded-xl border-2 px-4 py-3 text-sm"
                  style={{
                    backgroundColor: cssVars.neutral.bg,
                    borderColor: cssVars.neutral.border,
                    color: cssVars.secondary.DEFAULT,
                  }}
                />
                {evidenceFile && (
                  <div
                    className="flex items-center justify-between rounded-lg border-2 p-3"
                    style={{ borderColor: cssVars.primary.DEFAULT }}
                  >
                    <span className="text-sm" style={{ color: cssVars.secondary.DEFAULT }}>
                      {evidenceFile.name}
                    </span>
                    <Button
                      onClick={handleAddEvidence}
                      disabled={uploading}
                      variant="primary"
                      size="sm"
                      style={{
                        background: cssVars.gradient.gold,
                        color: cssVars.secondary.DEFAULT,
                      }}
                    >
                      {uploading ? t('uploading') : t('upload')}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Dispute Info */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h3 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('disputeInfo')}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                  {t('disputeNumber')}
                </p>
                <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                  {dispute.disputeNumber}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                  {t('createdAt')}
                </p>
                <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                  {formatDate(dispute.createdAt)}
                </p>
              </div>
              {dispute.resolvedAt && (
                <div>
                  <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                    {t('resolvedAt')}
                  </p>
                  <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                    {formatDate(dispute.resolvedAt)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Resolution */}
          {dispute.resolution && (
            <div
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 10%, transparent)`,
                borderColor: cssVars.status.success,
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" style={{ color: cssVars.status.success }} />
                <h3 className="text-lg font-bold" style={{ color: cssVars.status.success }}>
                  {t('resolution')}
                </h3>
              </div>
              <p className="text-sm" style={{ color: cssVars.secondary.DEFAULT }}>
                {dispute.resolution}
              </p>
            </div>
          )}

          {/* Actions */}
          {dispute.status !== 'closed' && (
            <Button
              onClick={handleClose}
              disabled={closing}
              variant="outline"
              icon={XCircle}
              fullWidth
              style={{
                borderColor: cssVars.status.error,
                color: cssVars.status.error,
              }}
            >
              {t('close')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
