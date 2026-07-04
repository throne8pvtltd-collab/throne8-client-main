import { z } from 'zod';

export const createAboutSchema = z.object({
    aboutText: z.string()
        .min(50, 'About text must be at least 50 characters')
        .max(2600, 'About text cannot exceed 2600 characters')
        .regex(/^[A-Z]/, 'About text must start with a capital letter')
        .trim(),

    textFormatting: z.string()
        .optional()
        .refine(
            (val) => {
                if (!val) return true;
                try {
                    JSON.parse(val);
                    return true;
                } catch {
                    return false;
                }
            },
            { message: 'Text formatting must be valid JSON' }
        ),
});

export type CreateAboutFormData = z.infer<typeof createAboutSchema>;

export const updateAboutSchema = z.object({
    aboutText: z.string()
        .min(50, 'About text must be at least 50 characters')
        .max(2600, 'About text cannot exceed 2600 characters')
        .regex(/^[A-Z]/, 'About text must start with a capital letter')
        .trim()
        .optional(),

    isExpanded: z.boolean().optional(),

    textFormatting: z.string()
        .optional()
        .refine(
            (val) => {
                if (!val) return true;
                try {
                    JSON.parse(val);
                    return true;
                } catch {
                    return false;
                }
            },
            { message: 'Text formatting must be valid JSON' }
        ),
}).refine(
    (data) => data.aboutText || data.isExpanded !== undefined || data.textFormatting,
    {
        message: 'At least one field must be provided for update',
    }
);

export type UpdateAboutFormData = z.infer<typeof updateAboutSchema>;