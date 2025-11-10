export type OTPPurpose =
  | 'email_verification'
  | 'phone_verification'
  | 'password_reset'
  | 'login'
  | 'transaction';

export type OTPChannel = 'email' | 'sms';

export interface OTPVerification {
  id: string;
  userId: string;
  otpCode: string;
  purpose: OTPPurpose;
  channel: OTPChannel;
  isUsed: boolean;
  expiresAt: string;
  attemptCount: number;
  maxAttempts: number;
  createdAt: string;
  usedAt: string | null;
}
