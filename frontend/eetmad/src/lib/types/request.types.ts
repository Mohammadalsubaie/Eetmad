import type { Category } from './category.types';
import { UserInfo } from './home.types';

export type RequestStatus =
  | 'draft'
  | 'open'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'closed'
  | 'published';

export interface RequestAttachment {
  id: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}

export interface RequestLocation {
  address?: string;
  city?: string;
  region?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  requiresOnSiteVisit: boolean;
}

export interface Request {
  id: string;
  requestNumber: string;
  clientId: string;
  title: string;
  description: string;
  categoryId: string;
  category?: Category; // Optional expanded category
  budgetMin: number | null;
  budgetMax: number | null;
  expectedDuration: number; // in days
  deadline: string;
  preferredStartDate: string | null;
  attachments: RequestAttachment[];
  status: RequestStatus;
  selectedOfferId: string | null;
  viewsCount: number;
  offersCount: number;
  requiresOnSiteVisit: boolean;
  location: RequestLocation | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  closedAt: string | null;
}

export interface CreateRequestInput {
  title: string;
  description: string;
  categoryId: string;
  budgetMin?: number;
  budgetMax?: number;
  expectedDuration: number;
  deadline: string;
  preferredStartDate?: string;
  attachments?: File[]; // For upload
  requiresOnSiteVisit: boolean;
  location?: RequestLocation;
}

export interface UpdateRequestInput {
  title?: string;
  description?: string;
  categoryId?: string;
  budgetMin?: number;
  budgetMax?: number;
  expectedDuration?: number;
  deadline?: string;
  preferredStartDate?: string;
  attachments?: File[];
  status?: RequestStatus;
  requiresOnSiteVisit?: boolean;
  location?: RequestLocation;
}

/**
 * طلب مميز للصفحة الرئيسية
 */
export interface FeaturedRequest extends Request {
  client: UserInfo; // مضمون في Featured
  categoryName: string;
  categoryIcon?: string;
}

export interface RequestFilters {
  status?: RequestStatus | '';
  categoryId?: string;
  budgetMin?: string | number;
  budgetMax?: string | number;
  [key: string]: string | number | RequestStatus | undefined;
}
