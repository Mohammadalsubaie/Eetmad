import { z } from 'zod';

export const createRequestSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(1, 'Category is required'),
  budget: z.number().positive().optional(),
  deadline: z.string().datetime(),
  location: z.string().optional(),
});

export const updateRequestSchema = createRequestSchema.partial();

export type CreateRequestInput = z.infer<typeof createRequestSchema>;
export type UpdateRequestInput = z.infer<typeof updateRequestSchema>;
