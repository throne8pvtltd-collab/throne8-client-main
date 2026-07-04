import * as z from 'zod'; 


export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .toLowerCase()
    .max(255, { message: 'Email is too long (max 255 characters)' })
    .refine((email) => {
      // No test/demo emails
      const blockedDomains = ['example.com', 'test.com', 'demo.com'];
      const domain = email.split('@')[1];
      return !blockedDomains.includes(domain);
    }, {
      message: 'Test or demo emails are not allowed',
    })
    .refine((email) => {
      // Basic email format validation
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }, {
      message: 'Invalid email format',
    }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(128, { message: 'Password is too long (max 128 characters)' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter (A-Z)'
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter (a-z)'
    })
    .regex(/[0-9]/, {
      message: 'Password must contain at least one number (0-9)'
    })
    .regex(/[@$!%*?&#^()_+\-=\[\]{}|;:,.<>]/, {
      message: 'Password must contain at least one special character (@$!%*?&#^()_+-=[]{}|;:,.<>)'
    })
    .refine((pwd) => !/\s/.test(pwd), {
      message: 'Password cannot contain spaces'
    })
    .refine((pwd) => !pwd.toLowerCase().includes('password'), {
      message: 'Password cannot contain the word "password"',
    })
    .refine((pwd) => !pwd.toLowerCase().includes('123'), {
      message: 'Avoid common sequences like "123"',
    }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
