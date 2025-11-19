'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { contactApi } from '@/lib/api/contact';
import type { ContactFormInput } from '@/lib/types/contact.types';

export default function ContactForm() {
  const t = useTranslations('pages.contact');
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({
    type: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await contactApi.submitContactForm(formData);
      if (response.success) {
        setStatus({ type: 'success', message: response.message });
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      } else {
        setStatus({ type: 'error', message: response.message || t('submitError') });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus({ type: 'error', message: t('submitError') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-lg rounded-2xl p-8 shadow-lg"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
        borderWidth: '1px',
      }}
    >
      <h2
        className="mb-6 text-center text-3xl font-bold"
        style={{ color: cssVars.secondary.DEFAULT }}
      >
        {t('formTitle')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium"
            style={{ color: cssVars.neutral.textSecondary }}
          >
            {t('nameLabel')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-md border p-3"
            style={{
              backgroundColor: cssVars.neutral.bg,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium"
            style={{ color: cssVars.neutral.textSecondary }}
          >
            {t('emailLabel')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-md border p-3"
            style={{
              backgroundColor: cssVars.neutral.bg,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="mb-1 block text-sm font-medium"
            style={{ color: cssVars.neutral.textSecondary }}
          >
            {t('subjectLabel')}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full rounded-md border p-3"
            style={{
              backgroundColor: cssVars.neutral.bg,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1 block text-sm font-medium"
            style={{ color: cssVars.neutral.textSecondary }}
          >
            {t('messageLabel')}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full rounded-md border p-3"
            style={{
              backgroundColor: cssVars.neutral.bg,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
          ></textarea>
        </div>

        {status.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-md p-3 text-center ${
              status.type === 'success' ? 'text-green-700' : 'text-red-700'
            }`}
            style={{
              backgroundColor:
                status.type === 'success' ? cssVars.status.success : cssVars.status.error,
              color: status.type === 'success' ? 'white' : 'white', // Ensure text is readable on status background
            }}
          >
            {status.message}
          </motion.div>
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="w-full rounded-md py-3 text-lg font-semibold"
          style={{
            background: cssVars.gradient.gold,
            color: cssVars.secondary.DEFAULT,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? t('submitting') : t('submitButton')}
        </motion.button>
      </form>
    </motion.div>
  );
}
