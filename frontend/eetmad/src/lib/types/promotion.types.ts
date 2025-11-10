export type DiscountType = 'percentage' | 'fixed';

export interface PromotionCampaign {
  id: string;
  campaignCode: string;
  nameAr: string;
  nameEn: string;
  discountType: DiscountType;
  discountValue: number;
  minPurchaseAmount: number | null;
  maxDiscountAmount: number | null;
  usageLimit: number | null;
  usageCount: number;
  userType: 'client' | 'supplier' | null;
  categoryId: string | null;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PromotionUsage {
  id: string;
  promotionId: string;
  userId: string;
  projectId: string | null;
  discountAmount: number;
  usedAt: string;
}
