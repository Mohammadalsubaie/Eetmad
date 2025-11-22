import apiClient from './client';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: 'client' | 'supplier';
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    userType: 'client' | 'supplier' | 'admin';
    verified?: boolean;
    avatar?: string;
    phone?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  token: string;
}

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};

export const refreshToken = async (): Promise<{ token: string }> => {
  const response = await apiClient.post<{ token: string }>('/auth/refresh');
  return response.data;
};

export const verifyEmail = async (token: string): Promise<void> => {
  await apiClient.post('/auth/verify-email', { token });
};

export const forgotPassword = async (email: string): Promise<void> => {
  await apiClient.post('/auth/forgot-password', { email });
};

export const resetPassword = async (token: string, password: string): Promise<void> => {
  await apiClient.post('/auth/reset-password', { token, password });
};

export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

export const verifyPhone = async (code: string, phone?: string): Promise<void> => {
  await apiClient.post('/auth/verify-phone', { code, phone });
};

export const resendVerification = async (
  type: 'email' | 'phone',
  email?: string,
  phone?: string
): Promise<void> => {
  await apiClient.post('/auth/resend-verification', { type, email, phone });
};

export const logoutAll = async (): Promise<void> => {
  await apiClient.post('/auth/logout-all');
};

// Two-Factor Authentication
export const enable2FA = async (): Promise<{ qrCode: string; secret: string }> => {
  const response = await apiClient.post<{ qrCode: string; secret: string }>('/auth/2fa/enable');
  return response.data;
};

export const disable2FA = async (password: string): Promise<void> => {
  await apiClient.post('/auth/2fa/disable', { password });
};

export const verify2FA = async (code: string): Promise<{ verified: boolean }> => {
  const response = await apiClient.post<{ verified: boolean }>('/auth/2fa/verify', { code });
  return response.data;
};

export const getBackupCodes = async (): Promise<{ codes: string[] }> => {
  const response = await apiClient.get<{ codes: string[] }>('/auth/2fa/backup-codes');
  return response.data;
};
