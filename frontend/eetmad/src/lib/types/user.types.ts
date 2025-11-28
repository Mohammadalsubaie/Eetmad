export type UserStatus = 'active' | 'inactive' | 'suspended' | 'banned';
export type UserType = 'client' | 'supplier' | 'admin';

export interface UserAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface NotificationPreferences {
  email?: {
    requests?: boolean;
    offers?: boolean;
    messages?: boolean;
    reviews?: boolean;
    system?: boolean;
  };
  push?: {
    requests?: boolean;
    offers?: boolean;
    messages?: boolean;
    reviews?: boolean;
    system?: boolean;
  };
  sms?: {
    important?: boolean;
    security?: boolean;
  };
}

export interface User {
  id: string;
  userType: UserType;
  email: string;
  phone: string;
  // passwordHash is backend only, not included in frontend types
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  status: UserStatus;
  fullName: string;
  avatar: string;
  dateOfBirth: string | null;
  nationalId: string | null;
  companyName: string | null;
  commercialRegister: string | null;
  taxNumber: string | null;
  averageRating: number;
  totalReviews: number;
  completedProjects: number;
  walletBalance: number;
  address: UserAddress;
  notificationPreferences: NotificationPreferences;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
}

export interface UserProfile extends User {
  // Profile-specific extended fields can be added here if needed
  // Most profile data is now in the base User interface
  bio?: string;
  website?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface UpdateUserProfileData {
  fullName?: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string | null;
  nationalId?: string | null;
  companyName?: string | null;
  commercialRegister?: string | null;
  taxNumber?: string | null;
  address?: Partial<UserAddress>;
  notificationPreferences?: Partial<NotificationPreferences>;
  bio?: string;
  website?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface UserStatistics {
  totalProjects: number;
  completedProjects: number;
  activeProjects: number;
  cancelledProjects: number;
  totalSpent?: number; // For clients
  totalEarned?: number; // For suppliers
  averageRating: number;
  totalReviews: number;
}
