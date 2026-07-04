import { z } from 'zod';


export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .toLowerCase()
    .max(255, { message: 'Email is too long (max 255 characters)' })
    .refine((email) => {
      const blockedDomains = ['example.com', 'test.com', 'demo.com'];
      const domain = email.split('@')[1];
      return !blockedDomains.includes(domain);
    }, {
      message: 'Test or demo emails are not allowed',
    })
    .refine((email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }, {
      message: 'Invalid email format',
    }),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;