export type CommissionType = 'percentage' | 'fixed';

export interface PlatformCommission {
  id: string;
  categoryId: string | null;
  userType: 'client' | 'supplier' | null;
  minAmount: number | null;
  maxAmount: number | null;
  commissionType: CommissionType;
  commissionValue: number;
  isActive: boolean;
  effectiveFrom: string;
  effectiveTo: string | null;
  createdAt: string;
  updatedAt: string;
}
