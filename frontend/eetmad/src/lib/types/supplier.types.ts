import type { Category } from './category.types';

export interface SupplierCategory {
  id: string;
  supplierId: string;
  categoryId: string;
  category?: Category; // Optional expanded category
  isPrimary: boolean;
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[]; // Array of image URLs/paths
  category: string;
  completedAt: string;
  // Additional fields that might be in JSON structure
  projectId?: string;
  clientName?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string;
  expiryDate: string | null;
  fileUrl: string;
  // Additional fields that might be in JSON structure
  certificateNumber?: string;
}

export interface WorkingHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string; // Time format: "HH:mm"
  close: string; // Time format: "HH:mm"
  closed: boolean;
}

export interface SupplierProfile {
  id: string;
  userId: string;
  categories: SupplierCategory[]; // Changed from string[] - array of category assignments
  serviceDescription: string; // Changed from description
  portfolio: PortfolioItem[]; // JSON array
  certifications: Certification[]; // Changed from certificates, JSON array
  workingHours: WorkingHours; // JSON object
  responseTime: number; // in minutes/hours
  acceptanceRate: number; // decimal 0-100
  onTimeDelivery: number; // decimal 0-100
  isVerified: boolean;
  verificationDate: string | null;
  verificationNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

// Alias for backward compatibility
export interface Supplier extends SupplierProfile {
  // Keep for backward compatibility if needed
  businessName?: string; // This might come from User.companyName
  description?: string; // Alias for serviceDescription
  rating?: number; // This comes from User.averageRating
  totalReviews?: number; // This comes from User.totalReviews
}
