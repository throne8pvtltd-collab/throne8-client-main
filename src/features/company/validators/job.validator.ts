import { z } from 'zod';

export const jobApplicationSchema = z.object({
  name:         z.string().min(2, 'Name is required').max(100),
  email:        z.string().email('Valid email required'),
  phone:        z.string().regex(/^[+\d\s-]{10,15}$/, 'Valid phone number required').optional(),
  resumeUrl:    z.string().url('Valid resume URL required'),
  coverLetter:  z.string().max(2000, 'Max 2000 characters').optional(),
  linkedinUrl:  z.string().url().optional().or(z.literal('')),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
});

export const jobFilterSchema = z.object({
  department: z.string().default('All'),
  location:   z.string().default('All'),
  type:       z.string().default('All'),
  query:      z.string().default(''),
});

export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
export type JobFilterInput      = z.infer<typeof jobFilterSchema>;
