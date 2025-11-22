'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, Paperclip, X } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { Button } from '@/components/ui';

interface MessageInputProps {
  onSend: (content: string, attachments?: File[]) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function MessageInput({
  onSend,
  isLoading = false,
  placeholder,
}: MessageInputProps) {
  const t = useTranslations('pages.messages');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (content.trim() || attachments.length > 0) {
      onSend(content, attachments.length > 0 ? attachments : undefined);
      setContent('');
      setAttachments([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className="rounded-2xl border-2 p-4"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg border-2 px-3 py-2"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                borderColor: cssVars.primary.DEFAULT,
              }}
            >
              <span className="text-xs font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                {file.name}
              </span>
              <button
                onClick={() => removeAttachment(index)}
                className="flex-shrink-0"
                style={{ color: cssVars.status.error }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-3">
        {/* File Attachment Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => fileInputRef.current?.click()}
          className="flex-shrink-0 rounded-xl p-3 transition-all"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
            color: cssVars.primary.DEFAULT,
          }}
        >
          <Paperclip className="h-5 w-5" />
        </motion.button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Text Input */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder || t('typeMessage')}
          rows={1}
          className="flex-1 resize-none rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.bg,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
            minHeight: '48px',
            maxHeight: '120px',
          }}
        />

        {/* Send Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleSend}
            disabled={isLoading || (!content.trim() && attachments.length === 0)}
            variant="primary"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
            icon={Send}
          >
            {isLoading ? t('sending') : t('send')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
