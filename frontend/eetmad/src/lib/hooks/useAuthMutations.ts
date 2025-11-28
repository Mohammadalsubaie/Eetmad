'use client';

import { useState } from 'react';
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  verifyPhone,
  resendVerification,
  logoutAll,
  enable2FA,
  disable2FA,
  verify2FA,
  getBackupCodes,
} from '@/lib/api/auth';
import type { AuthResponse } from '@/lib/types/auth.types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  companyName?: string;
  commercialReg?: string;
  userType: 'client' | 'supplier';
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginUser(credentials);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const register = async (data: RegisterData): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await registerUser({
        name: data.fullName,
        email: data.email,
        password: data.password,
        userType: data.userType,
      });
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
}

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const sendResetLink = async (email: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendResetLink, isLoading, error, success };
}

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const reset = async (token: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { reset, isLoading, error, success };
}

export function useVerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const verify = async (token: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await verifyEmail(token);
      setSuccess(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { verify, isLoading, error, success };
}

export function useVerifyPhone() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const verify = async (code: string, phone?: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await verifyPhone(code, phone);
      setSuccess(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { verify, isLoading, error, success };
}

export function useResendVerification() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const resend = async (type: 'email' | 'phone', email?: string, phone?: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await resendVerification(type, email, phone);
      setSuccess(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { resend, isLoading, error, success };
}

export function useLogoutAll() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await logoutAll();
      setSuccess(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error, success };
}

export function useEnable2FA() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const enable = async (): Promise<{ qrCode: string; secret: string }> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await enable2FA();
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { enable, isLoading, error };
}

export function useDisable2FA() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const disable = async (password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await disable2FA(password);
      setSuccess(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { disable, isLoading, error, success };
}

export function useVerify2FA() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const verify = async (code: string): Promise<{ verified: boolean }> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await verify2FA(code);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { verify, isLoading, error };
}

export function useBackupCodes() {
  const [data, setData] = useState<{ codes: string[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = async (): Promise<{ codes: string[] }> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getBackupCodes();
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, fetch, isLoading, error };
}
