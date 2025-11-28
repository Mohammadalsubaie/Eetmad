'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  FileText,
  Download,
  MessageSquare,
  CheckCircle2,
  XCircle,
  User,
  Calendar,
  AlertTriangle,
  UserPlus,
  TrendingUp,
  Shield,
} from 'lucide-react';
import { cssVars } from '@/styles/theme';
import {
  useDispute,
  useDisputeMessages,
  useAddDisputeMessage,
  useAddEvidence,
  useCloseDispute,
} from '@/lib/hooks/useDisputes';
import { disputesApi } from '@/lib/api/disputes';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import StatusBadge from '@/components/shared/badges/StatusBadge';
import { Badge } from '@/components/ui';
import Input from '@/components/ui/Input/Input';

export default function AdminDisputeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.disputes');
  const tPages = useTranslations('pages');
  const tAdmin = useTranslations('admin');

  const { data: dispute, isLoading, error } = useDispute(id);
  const { data: messages, isLoading: messagesLoading } = useDisputeMessages(id);
  const { mutate: addMessage, isLoading: sending } = useAddDisputeMessage();
  const { mutate: addEvidence, isLoading: uploading } = useAddEvidence();
  const { mutate: closeDispute, isLoading: closing } = useCloseDispute();

  const [messageContent, setMessageContent] = useState('');
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [isResolving, setIsResolving] = useState(false);
  const [isEscalating, setIsEscalating] = useState(false);
  const [resolutionText, setResolutionText] = useState('');
  const [internalNote, setInternalNote] = useState('');
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

  const handleAddInternalNote = async () => {
    if (!internalNote.trim()) return;

    try {
      await disputesApi.addInternalNote(id, internalNote);
      setInternalNote('');
      // Refresh messages
      window.location.reload();
    } catch (err) {
      console.error('Failed to add internal note:', err);
      alert(t('noteError') || 'Failed to add internal note');
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

  const handleResolve = async () => {
    if (!resolutionText.trim()) {
      const message = t('resolutionRequired');
      alert(message || 'Resolution text is required');
      return;
    }

    const confirmMessage = t('confirmResolve');
    if (!confirm(confirmMessage || 'Are you sure you want to resolve this dispute?')) {
      return;
    }

    setIsResolving(true);
    try {
      await disputesApi.resolve(id, resolutionText);
      // Refresh dispute data
      window.location.reload();
    } catch (err) {
      console.error('Failed to resolve dispute:', err);
      alert(t('resolveError') || 'Failed to resolve dispute');
    } finally {
      setIsResolving(false);
    }
  };

  const handleEscalate = async () => {
    const confirmMessage = t('confirmEscalate');
    if (!confirm(confirmMessage || 'Are you sure you want to escalate this dispute?')) {
      return;
    }

    setIsEscalating(true);
    try {
      await disputesApi.escalate(id);
      // Refresh dispute data
      window.location.reload();
    } catch (err) {
      console.error('Failed to escalate dispute:', err);
      alert(t('escalateError') || 'Failed to escalate dispute');
    } finally {
      setIsEscalating(false);
    }
  };

  const handleClose = () => {
    const confirmMessage = t('confirmClose');
    if (confirm(confirmMessage || 'Are you sure you want to close this dispute?')) {
      closeDispute(id);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('disputes.title'), href: `/${locale}/admin/disputes` },
            { label: id },
          ]}
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
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('disputes.title'), href: `/${locale}/admin/disputes` },
            { label: id },
          ]}
          className="mb-6"
        />
        <ErrorMessage error={error?.message || t('disputeNotFound')} variant="banner" />
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('notAvailable') || 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: cssVars.neutral.bg }}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute start-0 top-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.accent.primary }}
        />
        <div
          className="absolute bottom-1/4 end-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.primary.DEFAULT }}
        />
      </div>

      <div className="container relative mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('disputes.title'), href: `/${locale}/admin/disputes` },
            { label: dispute.disputeNumber || id },
          ]}
          className="mb-6"
        />

        {/* Back Button */}
        <motion.button
          whileHover={{ x: -4 }}
          onClick={() => router.push(`/${locale}/admin/disputes`)}
          className="mb-6 flex items-center gap-2 text-sm font-medium"
          style={{ color: cssVars.primary.DEFAULT }}
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back') || 'Back'}
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <StatusBadge
              status={dispute.status}
              labels={{
                open: t('status.open') || 'Open',
                in_review: t('status.in_review') || 'In Review',
                resolved: t('status.resolved') || 'Resolved',
                closed: t('status.closed') || 'Closed',
                escalated: t('status.escalated') || 'Escalated',
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
              {t(`category.${dispute.category}`) || dispute.category}
            </Badge>
            <Badge
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`,
                color: cssVars.status.warning,
                borderColor: cssVars.status.warning,
              }}
            >
              {t(`priority.${dispute.priority}`) || dispute.priority}
            </Badge>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.error} 15%, transparent)`,
              }}
            >
              <AlertTriangle className="h-6 w-6" style={{ color: cssVars.status.error }} />
            </div>
            <div>
              <h1
                className="mb-1 text-3xl font-bold lg:text-4xl"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {dispute.subject}
              </h1>
              <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
                {dispute.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 md:col-span-2">
            {/* Evidence */}
            {dispute.evidence && dispute.evidence.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border-2 p-6 shadow-lg"
                style={{
                  backgroundColor: cssVars.neutral.surface,
                  borderColor: cssVars.neutral.border,
                }}
              >
                <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {t('evidence') || 'Evidence'}
                </h2>
                <div className="space-y-2">
                  {dispute.evidence.map((evidence) => (
                    <motion.a
                      key={evidence.id}
                      href={evidence.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
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
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Messages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border-2 p-6 shadow-lg"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('messages') || 'Messages'}
              </h2>
              <div className="max-h-96 space-y-4 overflow-y-auto">
                {messagesLoading ? (
                  <LoadingSpinner />
                ) : messages.length === 0 ? (
                  <p style={{ color: cssVars.neutral.textMuted }}>
                    {t('noMessages') || 'No messages yet'}
                  </p>
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
                            {message.isInternal
                              ? t('internalNote') || 'Internal Note'
                              : t('message') || 'Message'}
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
                    placeholder={t('typeMessage') || 'Type a message...'}
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
                    {sending ? t('sending') || 'Sending...' : t('send') || 'Send'}
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Add Evidence */}
            {dispute.status !== 'closed' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border-2 p-6 shadow-lg"
                style={{
                  backgroundColor: cssVars.neutral.surface,
                  borderColor: cssVars.neutral.border,
                }}
              >
                <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {t('addEvidence') || 'Add Evidence'}
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
                        {uploading ? t('uploading') || 'Uploading...' : t('upload') || 'Upload'}
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Dispute Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border-2 p-6 shadow-lg"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h3 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t('disputeInfo') || 'Dispute Information'}
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                    {t('disputeNumber') || 'Dispute Number'}
                  </p>
                  <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                    {dispute.disputeNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
                    {t('createdAt') || 'Created At'}
                  </p>
                  <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                    {formatDate(dispute.createdAt)}
                  </p>
                </div>
                {dispute.resolvedAt && (
                  <div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: cssVars.neutral.textMuted }}
                    >
                      {t('resolvedAt') || 'Resolved At'}
                    </p>
                    <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                      {formatDate(dispute.resolvedAt)}
                    </p>
                  </div>
                )}
                {dispute.assignedTo && (
                  <div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: cssVars.neutral.textMuted }}
                    >
                      {t('assignedTo') || 'Assigned To'}
                    </p>
                    <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                      {dispute.assignedTo}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Resolution */}
            {dispute.resolution && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border-2 p-6 shadow-lg"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 10%, transparent)`,
                  borderColor: cssVars.status.success,
                }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" style={{ color: cssVars.status.success }} />
                  <h3 className="text-lg font-bold" style={{ color: cssVars.status.success }}>
                    {t('resolution') || 'Resolution'}
                  </h3>
                </div>
                <p className="text-sm" style={{ color: cssVars.secondary.DEFAULT }}>
                  {dispute.resolution}
                </p>
              </motion.div>
            )}

            {/* Admin Actions */}
            {dispute.status !== 'closed' && dispute.status !== 'resolved' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3 rounded-2xl border-2 p-6 shadow-lg"
                style={{
                  backgroundColor: cssVars.neutral.surface,
                  borderColor: cssVars.neutral.border,
                }}
              >
                <h3 className="mb-4 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {tAdmin('actions') || 'Admin Actions'}
                </h3>

                {/* Resolve Dispute */}
                <div className="space-y-2">
                  <textarea
                    value={resolutionText}
                    onChange={(e) => setResolutionText(e.target.value)}
                    placeholder={t('resolutionPlaceholder') || 'Enter resolution...'}
                    rows={4}
                    className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all focus:border-primary"
                    style={{
                      backgroundColor: cssVars.neutral.bg,
                      borderColor: cssVars.neutral.border,
                      color: cssVars.secondary.DEFAULT,
                    }}
                  />
                  <Button
                    onClick={handleResolve}
                    disabled={isResolving || !resolutionText.trim()}
                    variant="primary"
                    icon={CheckCircle2}
                    fullWidth
                    style={{
                      background: cssVars.gradient.gold,
                      color: cssVars.secondary.DEFAULT,
                    }}
                  >
                    {isResolving
                      ? t('resolving') || 'Resolving...'
                      : t('resolve') || 'Resolve Dispute'}
                  </Button>
                </div>

                {/* Escalate Dispute */}
                <Button
                  onClick={handleEscalate}
                  disabled={isEscalating}
                  variant="outline"
                  icon={TrendingUp}
                  fullWidth
                  style={{
                    borderColor: cssVars.status.error,
                    color: cssVars.status.error,
                  }}
                >
                  {isEscalating ? t('escalating') || 'Escalating...' : t('escalate') || 'Escalate'}
                </Button>

                {/* Close Dispute */}
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
                  {closing ? t('closing') || 'Closing...' : t('close') || 'Close'}
                </Button>
              </motion.div>
            )}

            {/* Internal Note */}
            {dispute.status !== 'closed' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-2xl border-2 p-6 shadow-lg"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.status.warning} 5%, transparent)`,
                  borderColor: cssVars.status.warning,
                }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5" style={{ color: cssVars.status.warning }} />
                  <h3 className="text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                    {t('internalNote') || 'Internal Note'}
                  </h3>
                </div>
                <textarea
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder={
                    t('internalNotePlaceholder') || 'Add internal note (only visible to admins)...'
                  }
                  rows={3}
                  className="mb-3 w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all focus:border-warning"
                  style={{
                    backgroundColor: cssVars.neutral.bg,
                    borderColor: cssVars.neutral.border,
                    color: cssVars.secondary.DEFAULT,
                  }}
                />
                <Button
                  onClick={handleAddInternalNote}
                  disabled={sending || !internalNote.trim()}
                  variant="outline"
                  icon={MessageSquare}
                  fullWidth
                  style={{
                    borderColor: cssVars.status.warning,
                    color: cssVars.status.warning,
                  }}
                >
                  {sending ? t('sending') || 'Sending...' : t('addNote') || 'Add Note'}
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
