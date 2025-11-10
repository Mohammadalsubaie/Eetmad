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
