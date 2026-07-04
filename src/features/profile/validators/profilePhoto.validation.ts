import { z } from 'zod';

export const profilePhotoValidationSchema = z.object({
    file: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: 'File size must be less than 5MB',
        })
        .refine(
            (file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'].includes(file.type),
            {
                message: 'Only JPEG, PNG, WEBP, and GIF images are allowed',
            }
        ),
    setAsActive: z.boolean().default(true),
});

export type ProfilePhotoValidation = z.infer<typeof profilePhotoValidationSchema>;