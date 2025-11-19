import type { User, UserType } from './user.types';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: UserType;
  phoneNumber?: string;
  companyName?: string;
  commercialReg?: string;
  agreeTerms: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  newPassword: string;
  confirmPassword: string;
  token?: string;
}

export interface VerifyEmailData {
  code: string;
  email?: string;
}

export interface TwoFactorVerificationData {
  verificationCode: string;
}

export type DeviceType = 'desktop' | 'mobile' | 'tablet';

export interface Session {
  id: string;
  device: DeviceType;
  browser: string;
  os: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

/**
 * Simplified user object returned by auth endpoints.
 * Contains only essential fields for authentication.
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  verified?: boolean;
  avatar?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: AuthUser | User;
  token: string;
  refreshToken?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshAuth?: () => Promise<void>;
}
