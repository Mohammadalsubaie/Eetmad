import { z } from 'zod';

export const createOfferSchema = z.object({
  requestId: z.string().min(1, 'Request ID is required'),
  amount: z.number().positive('Amount must be positive'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  estimatedDays: z.number().positive('Estimated days must be positive'),
  notes: z.string().optional(),
});

export type CreateOfferInput = z.infer<typeof createOfferSchema>;
