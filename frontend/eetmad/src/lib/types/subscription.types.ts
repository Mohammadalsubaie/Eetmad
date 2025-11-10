export type SubscriptionPlanType = 'basic' | 'premium' | 'enterprise' | 'custom';

export type BillingCycle = 'monthly' | 'quarterly' | 'yearly' | 'lifetime';

export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'pending' | 'suspended';

export interface Subscription {
  id: string;
  userId: string;
  planName: string;
  planType: SubscriptionPlanType;
  features: Record<string, unknown>; // JSON
  price: number;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethod: string | null;
  lastPaymentDate: string | null;
  nextPaymentDate: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
}
