// src/validations/studyGroup/chat.validation.ts

import { z } from 'zod';

// =======================Allowed file types=======================

const IMAGE_TYPES = [
  'image/jpeg', 'image/png', 'image/gif',
  'image/webp', 'image/heic', 'image/heif'
];
const VIDEO_TYPES = [
  'video/mp4', 'video/webm',
  'video/quicktime', 'video/x-msvideo'
];
const DOC_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
];


export const ALL_ALLOWED_TYPES = [...IMAGE_TYPES, ...VIDEO_TYPES, ...DOC_TYPES];

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;   // 10MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;   // 50MB
const MAX_DOC_SIZE = 10 * 1024 * 1024;   // 10MB


// ==================== ENUMS ====================

export const MessageTypeEnum = z.enum([
  'text', 'image', 'file', 'voice', 'video'
]);

export const ReactionEmojiEnum = z.enum([
  '👍', '❤️', '😂', '😮', '😢', '😡', '🔥', '👏', '🎉', '✅'
]);

// ==================== SEND MESSAGE ====================

export const sendMessageSchema = z.object({
  content: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(2000, 'Message cannot exceed 2000 characters')
    .trim(),
  messageType: MessageTypeEnum.default('text'),
  fileUrl: z.string().url('Invalid file URL').nullable().optional(),
  fileName: z
    .string()
    .max(255, 'File name too long')
    .nullable()
    .optional(),
  fileSize: z
    .number()
    .positive('File size must be positive')
    .nullable()
    .optional(),
  replyTo: z.string().uuid('Invalid message ID').nullable().optional(),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;

// ==================== EDIT MESSAGE ====================

export const editMessageSchema = z.object({
  content: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(2000, 'Message cannot exceed 2000 characters')
    .trim(),
});

export type EditMessageInput = z.infer<typeof editMessageSchema>;

// ==================== REACT TO MESSAGE ====================

export const reactToMessageSchema = z.object({
  emoji: ReactionEmojiEnum,
});

export type ReactToMessageInput = z.infer<typeof reactToMessageSchema>;

// ==================== GET MESSAGES QUERY ====================

export const getMessagesQuerySchema = z.object({
  page: z
    .number()
    .int()
    .min(1, 'Page must be at least 1')
    .default(1),
  limit: z
    .number()
    .int()
    .min(1)
    .max(100, 'Limit cannot exceed 100')
    .default(50),
});

export type GetMessagesQuery = z.infer<typeof getMessagesQuerySchema>;

// ==================== SEARCH MESSAGES ====================

export const searchMessagesSchema = z.object({
  query: z
    .string()
    .min(1, 'Search query cannot be empty')
    .max(200, 'Search query too long')
    .trim(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(20),
});

export type SearchMessagesInput = z.infer<typeof searchMessagesSchema>;

// ==================== FILE UPLOAD VALIDATION ====================


export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => ALL_ALLOWED_TYPES.includes(file.type),
      'File type not allowed. Allowed: images, videos, PDF, DOC, DOCX, PPT, PPTX, TXT'
    )
    .refine((file) => {
      if (IMAGE_TYPES.includes(file.type)) return file.size <= 10 * 1024 * 1024;
      if (VIDEO_TYPES.includes(file.type)) return file.size <= 50 * 1024 * 1024;
      return file.size <= 10 * 1024 * 1024;
    }, 'File size exceeds limit (Images: 10MB, Videos: 50MB, Docs: 10MB)'),
});

export type FileUploadInput = z.infer<typeof fileUploadSchema>;

// ==================== HELPER: get messageType from File ====================

export const getMessageTypeFromFile = (
  file: File
): 'image' | 'video' | 'file' => {
  if (IMAGE_TYPES.includes(file.type)) return 'image';
  if (VIDEO_TYPES.includes(file.type)) return 'video';
  return 'file';
};

// ==================== HELPER: validate file before upload ====================

export const validateChatFile = (
  file: File
): { valid: boolean; error?: string } => {
  const result = fileUploadSchema.safeParse({ file });
  if (!result.success) {
    return {
      valid: false,
      error: result.error.errors[0]?.message ?? 'Invalid file',
    };
  }
  return { valid: true };
};


export const groupFileSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => ALL_ALLOWED_TYPES.includes(file.type),
      'File type not allowed. Allowed: images, videos, PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT'
    )
    .refine((file) => {
      if (IMAGE_TYPES.includes(file.type)) return file.size <= MAX_IMAGE_SIZE;
      if (VIDEO_TYPES.includes(file.type)) return file.size <= MAX_VIDEO_SIZE;
      return file.size <= MAX_DOC_SIZE;
    }, 'File too large. Images: 10MB, Videos: 50MB, Documents: 10MB'),
});

export type GroupFileInput = z.infer<typeof groupFileSchema>;

// ── Helper: validate before upload ──
export const validateGroupFile = (
  file: File
): { valid: boolean; error?: string } => {
  const result = groupFileSchema.safeParse({ file });
  if (!result.success) {
    return { valid: false, error: result.error.errors[0]?.message };
  }
  return { valid: true };
};

// ── Helper: get display category from mimeType ──
export const getFileCategoryFromMime = (
  mimeType: string
): 'Images' | 'Videos' | 'Notes' | 'Reference' => {
  if (IMAGE_TYPES.includes(mimeType)) return 'Images';
  if (VIDEO_TYPES.includes(mimeType)) return 'Videos';
  if (mimeType === 'application/pdf') return 'Notes';
  return 'Reference';
};

// ── Helper: get messageType for chat from mimeType ──
export const getMessageTypeFromMime = (
  mimeType: string
): 'image' | 'video' | 'file' => {
  if (IMAGE_TYPES.includes(mimeType)) return 'image';
  if (VIDEO_TYPES.includes(mimeType)) return 'video';
  return 'file';
};

// ── File search/filter schema ──
export const fileQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  search: z.string().max(100).optional(),
  fileType: z.string().optional(),
  sortBy: z.enum(['createdAt', 'fileName', 'fileSize', 'downloadCount']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  pinnedOnly: z.boolean().default(false),
});

export type FileQueryInput = z.infer<typeof fileQuerySchema>;