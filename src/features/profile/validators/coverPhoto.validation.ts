import { z } from 'zod';

export const coverPhotoValidationSchema = z.object({
    file: z
        .instanceof(File)
        .refine((file) => file.size <= 50 * 1024 * 1024, {
            message: 'File size must be less than 50MB',
        })
        .refine(
            (file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'].includes(file.type),
            {
                message: 'Only JPEG, PNG, WEBP, and GIF images are allowed',
            }
        ),
    setAsActive: z.boolean().default(true),
});

export type CoverPhotoValidation = z.infer<typeof coverPhotoValidationSchema>;