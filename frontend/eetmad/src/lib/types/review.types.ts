export type ReviewType = 'client_to_supplier' | 'supplier_to_client';

export type ReviewStatus = 'pending' | 'published' | 'hidden' | 'reported';

export interface Review {
  id: string;
  projectId: string;
  reviewerId: string;
  reviewedId: string; // Changed from revieweeId
  rating: number; // 1-5
  reviewType: ReviewType;
  title: string;
  comment: string;
  qualityRating: number | null; // 1-5
  communicationRating: number | null; // 1-5
  timelinessRating: number | null; // 1-5
  professionalismRating: number | null; // 1-5
  status: ReviewStatus;
  isVerified: boolean;
  response: string | null;
  respondedAt: string | null;
  helpfulCount: number;
  notHelpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
  };
  // Sub-ratings averages
  averageQualityRating?: number;
  averageCommunicationRating?: number;
  averageTimelinessRating?: number;
  averageProfessionalismRating?: number;
}
