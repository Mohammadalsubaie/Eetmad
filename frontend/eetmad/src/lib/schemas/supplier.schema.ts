import { z } from 'zod';

export const supplierProfileSetupSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  workingHours: z
    .object({
      monday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
      tuesday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
      wednesday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
      thursday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
      friday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
      saturday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
      sunday: z.object({ open: z.string(), close: z.string(), closed: z.boolean() }),
    })
    .optional(),
});

export type SupplierProfileSetupInput = z.infer<typeof supplierProfileSetupSchema>;
