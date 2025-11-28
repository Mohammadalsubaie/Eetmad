'use client';

import { Button, Card, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useChangePassword } from '@/lib/hooks/useUserMutations';
import ChangePasswordFields from './ChangePasswordFields';

export default function ChangePasswordForm() {
  const t = useTranslations('pages.profile.security');
  const { changePassword, isLoading, error, success } = useChangePassword();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validation
    if (!currentPassword) {
      setValidationError(t('errors.currentPasswordRequired'));
      return;
    }

    if (newPassword.length < 8) {
      setValidationError(t('errors.passwordTooShort'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setValidationError(t('errors.passwordsNotMatch'));
      return;
    }

    if (currentPassword === newPassword) {
      setValidationError(t('errors.samePassword'));
      return;
    }

    try {
      await changePassword({
        currentPassword,
        newPassword,
      });
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 rounded-xl border-2 p-4"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 10%, transparent)`,
              borderColor: cssVars.status.success,
            }}
          >
            <CheckCircle2
              className="h-5 w-5 flex-shrink-0"
              style={{ color: cssVars.status.success }}
            />
            <p className="text-sm font-semibold" style={{ color: cssVars.status.success }}>
              {t('success.passwordChanged')}
            </p>
          </motion.div>
        )}

        {/* Error Message */}
        {(error || validationError) && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <ErrorMessage
              error={error?.message || validationError || String(error)}
              variant="inline"
            />
          </motion.div>
        )}

        <ChangePasswordFields
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          showCurrentPassword={showCurrentPassword}
          showNewPassword={showNewPassword}
          showConfirmPassword={showConfirmPassword}
          onCurrentPasswordChange={setCurrentPassword}
          onNewPasswordChange={setNewPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onShowCurrentPasswordToggle={() => setShowCurrentPassword(!showCurrentPassword)}
          onShowNewPasswordToggle={() => setShowNewPassword(!showNewPassword)}
          onShowConfirmPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        {/* Submit Button */}
        <Button type="submit" variant="primary" size="lg" fullWidth disabled={isLoading}>
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              {t('changing')}
            </>
          ) : (
            t('saveButton')
          )}
        </Button>
      </form>
    </Card>
  );
}
