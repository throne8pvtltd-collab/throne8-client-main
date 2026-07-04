import { z } from 'zod';

// File size limits (in bytes)
const MAX_IMAGE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_DOCUMENT_SIZE = 50 * 1024 * 1024; // 50MB

// Allowed MIME types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm', 'video/x-msvideo'];
const ALLOWED_DOCUMENT_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

export const createPostSchema = z.object({
    title: z.string()
        .min(1, 'Title must be at least 1 character')
        .max(200, 'Title cannot exceed 200 characters')
        .regex(/^[A-Z]/, 'Title must start with a capital letter'),

    content: z.string()
        .max(10000, 'Content cannot exceed 10000 characters')
        .optional(),

    images: z.array(z.instanceof(File))
        .max(10, 'Maximum 10 images allowed')
        .optional()
        .refine(
            (files) => !files || files.every(file => file.size <= MAX_IMAGE_SIZE),
            'Each image must be less than 50MB'
        )
        .refine(
            (files) => !files || files.every(file => ALLOWED_IMAGE_TYPES.includes(file.type)),
            'Only JPG, PNG, WebP, and GIF images are allowed'
        ),

    videos: z.array(z.instanceof(File))
        .max(5, 'Maximum 5 videos allowed')
        .optional()
        .refine(
            (files) => !files || files.every(file => file.size <= MAX_VIDEO_SIZE),
            'Each video must be less than 50MB'
        )
        .refine(
            (files) => !files || files.every(file => ALLOWED_VIDEO_TYPES.includes(file.type)),
            'Only MP4, MPEG, QuickTime, WebM videos are allowed'
        ),

    documents: z.array(z.instanceof(File))
        .max(5, 'Maximum 5 documents allowed')
        .optional()
        .refine(
            (files) => !files || files.every(file => file.size <= MAX_DOCUMENT_SIZE),
            'Each document must be less than 50MB'
        )
        .refine(
            (files) => !files || files.every(file => ALLOWED_DOCUMENT_TYPES.includes(file.type)),
            'Only PDF, Word, and Excel documents are allowed'
        ),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;