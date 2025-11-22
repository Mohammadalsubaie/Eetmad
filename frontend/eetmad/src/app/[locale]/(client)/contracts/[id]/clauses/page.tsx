'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useContract } from '@/lib/hooks/useContracts';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { contractsApi } from '@/lib/api/contracts';
import { useState } from 'react';
import Input from '@/components/ui/Input/Input';

export default function ContractClausesPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.contracts');
  const { data: contract, isLoading, error } = useContract(id);
  const [newClauseKey, setNewClauseKey] = useState('');
  const [newClauseValue, setNewClauseValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddClause = async () => {
    if (!newClauseKey.trim() || !newClauseValue.trim()) return;

    try {
      await contractsApi.addClause(id, {
        [newClauseKey]: newClauseValue,
      });
      setNewClauseKey('');
      setNewClauseValue('');
      setIsAdding(false);
      // Refresh contract data
      window.location.reload();
    } catch (err) {
      console.error('Failed to add clause:', err);
    }
  };

  const handleDeleteClause = async (clauseId: string) => {
    if (!confirm(t('confirmDeleteClause'))) return;

    try {
      await contractsApi.deleteClause(id, clauseId);
      // Refresh contract data
      window.location.reload();
    } catch (err) {
      console.error('Failed to delete clause:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('title'), href: `/${locale}/contracts` },
            { label: id },
            { label: t('clauses') },
          ]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('title'), href: `/${locale}/contracts` },
            { label: id },
            { label: t('clauses') },
          ]}
          className="mb-6"
        />
        <ErrorMessage error={error?.message || t('notFound')} variant="banner" />
      </div>
    );
  }

  const clauses = contract.customClauses || {};

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/contracts` },
          { label: contract.contractNumber || id, href: `/${locale}/contracts/${id}` },
          { label: t('clauses') },
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('clauses')}
          </h1>
          <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {t('clausesDescription')}
          </p>
        </div>
        {contract.status !== 'signed' && (
          <Button
            onClick={() => setIsAdding(!isAdding)}
            variant="primary"
            icon={Plus}
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {t('addClause')}
          </Button>
        )}
      </div>

      {/* Add Clause Form */}
      {isAdding && contract.status !== 'signed' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl border-2 p-6"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h3 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('addClause')}
          </h3>
          <div className="space-y-4">
            <Input
              type="text"
              value={newClauseKey}
              onChange={(e) => setNewClauseKey(e.target.value)}
              placeholder={t('clauseKeyPlaceholder')}
              className="w-full"
            />
            <textarea
              value={newClauseValue}
              onChange={(e) => setNewClauseValue(e.target.value)}
              rows={4}
              className="w-full rounded-xl border-2 px-4 py-3 text-sm"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
              placeholder={t('clauseValuePlaceholder')}
            />
            <div className="flex gap-2">
              <Button
                onClick={handleAddClause}
                variant="primary"
                style={{
                  background: cssVars.gradient.gold,
                  color: cssVars.secondary.DEFAULT,
                }}
              >
                {t('add')}
              </Button>
              <Button
                onClick={() => {
                  setIsAdding(false);
                  setNewClauseKey('');
                  setNewClauseValue('');
                }}
                variant="outline"
              >
                {t('cancel')}
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Clauses List */}
      <div className="space-y-4">
        {Object.keys(clauses).length === 0 ? (
          <div
            className="rounded-2xl border-2 p-8 text-center"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <p style={{ color: cssVars.neutral.textSecondary }}>{t('noClauses')}</p>
          </div>
        ) : (
          Object.entries(clauses).map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3
                    className="mb-2 text-lg font-bold"
                    style={{ color: cssVars.secondary.DEFAULT }}
                  >
                    {key}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: cssVars.neutral.textSecondary }}
                  >
                    {typeof value === 'string' ? value : JSON.stringify(value)}
                  </p>
                </div>
                {contract.status !== 'signed' && (
                  <Button
                    onClick={() => handleDeleteClause(key)}
                    variant="outline"
                    icon={Trash2}
                    style={{
                      borderColor: cssVars.status.error,
                      color: cssVars.status.error,
                    }}
                  >
                    {t('delete')}
                  </Button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
