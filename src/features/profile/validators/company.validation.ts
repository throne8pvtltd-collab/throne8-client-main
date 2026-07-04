// src/lib/validations/company.validation.ts
import { z } from 'zod';

const INDUSTRIES = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
    'Retail', 'Construction', 'Transportation', 'Media', 'Government',
    'Non-Profit', 'Real Estate', 'Energy', 'Agriculture', 'Hospitality',
    'Consulting', 'Legal', 'Marketing', 'Telecommunications', 'Biotechnology',
    'E-commerce', 'Gaming', 'Cybersecurity', 'Other',
] as const;

const COMPANY_SIZES = [
    '1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+'
] as const;

export const companyStep1Schema = z.object({
    companyName: z.string().min(2, 'Company name must be at least 2 characters').max(100),
    email: z.string().email('Please enter a valid email address'),
    phone: z.object({
        country: z.string().min(1, 'Country code is required'),
        number: z.string()
            .regex(/^\d{10,15}$/, 'Phone number must be 10-15 digits'),
    }),
    industry: z.enum(INDUSTRIES, {
        errorMap: () => ({ message: 'Please select a valid industry' })
    }),
    size: z.enum(COMPANY_SIZES, {
        errorMap: () => ({ message: 'Please select a valid company size' })
    }),
    founded: z.number()
        .int()
        .min(1800, 'Founded year must be after 1800')
        .max(new Date().getFullYear(), 'Founded year cannot be in the future')
        .optional(),
    headquarters: z.object({
        address: z.string().min(1, 'Address is required').max(200),
        city: z.string().min(1, 'City is required').max(50),
        state: z.string().min(1, 'State is required').max(50),
        country: z.string().max(50).default('India'),
        pincode: z.string().max(10).optional(),
    }),
    website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

export const companyStep2Schema = z.object({
    tagline: z.string().max(150, 'Tagline cannot exceed 150 characters').optional(),
    shortDescription: z.string()
        .min(10, 'Description must be at least 10 characters')
        .max(300)
        .optional()
        .or(z.literal('')),
});

// validation file me add karo at bottom:
export type Step1FlatErrors = {
    companyName?: string;
    email?: string;
    phoneCountry?: string;   // ← add karo
    phoneNumber?: string;    // ← add karo (phone ki jagah)
    industry?: string;
    size?: string;
    founded?: string;
    website?: string;
    hqAddress?: string;
    hqCity?: string;
    hqState?: string;
    hqCountry?: string;
    hqPincode?: string;
};

export type Step2FlatErrors = {
    tagline?: string;
    shortDescription?: string;
};

export type CompanyStep1Data = z.infer<typeof companyStep1Schema>;
export type CompanyStep2Data = z.infer<typeof companyStep2Schema>;

export { INDUSTRIES, COMPANY_SIZES };

