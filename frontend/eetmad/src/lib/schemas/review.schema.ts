import { z } from 'zod';

export const createReviewSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
