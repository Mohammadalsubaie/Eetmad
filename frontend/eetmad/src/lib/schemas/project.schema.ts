import { z } from 'zod';

export const createMilestoneSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  amount: z.number().positive('Amount must be positive'),
  dueDate: z.string().datetime(),
});

export type CreateMilestoneInput = z.infer<typeof createMilestoneSchema>;
