/**
 * ====================================
 * STUDY GROUP - ZOD VALIDATION SCHEMAS
 * ====================================
 * Frontend form validation matching backend Joi validators
 */

import { z } from 'zod';
import { GroupCategory, GroupVisibility } from '@/lib/api/studyGroup.service';

// ==================== CONSTANTS (mirrors backend) ====================
const GROUP_CONSTANTS = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  MIN_CAPACITY: 2,
  MAX_CAPACITY: 100,
  GOAL_HOURS_MIN: 1,
  GOAL_HOURS_MAX: 24,
  MAX_TAGS: 10,
  JOIN_CODE_LENGTH: 8,
};

// ==================== CREATE GROUP SCHEMA ====================

export const createGroupSchema = z.object({
  title: z
    .string()
    .min(GROUP_CONSTANTS.TITLE_MIN_LENGTH, `Title must be at least ${GROUP_CONSTANTS.TITLE_MIN_LENGTH} characters`)
    .max(GROUP_CONSTANTS.TITLE_MAX_LENGTH, `Title must not exceed ${GROUP_CONSTANTS.TITLE_MAX_LENGTH} characters`)
    .trim(),

  description: z
    .string()
    .max(GROUP_CONSTANTS.DESCRIPTION_MAX_LENGTH, `Description must not exceed ${GROUP_CONSTANTS.DESCRIPTION_MAX_LENGTH} characters`)
    .trim()
    .optional()
    .or(z.literal('')),

  category: z.nativeEnum(GroupCategory, {
    errorMap: () => ({ message: 'Please select a valid category' }),
  }),

  visibility: z
    .nativeEnum(GroupVisibility, {
      errorMap: () => ({ message: 'Visibility must be public or private' }),
    })
    .optional()
    .default(GroupVisibility.PUBLIC),

  capacity: z
    .number({
      invalid_type_error: 'Capacity must be a number',
    })
    .int('Capacity must be a whole number')
    .min(GROUP_CONSTANTS.MIN_CAPACITY, `Capacity must be at least ${GROUP_CONSTANTS.MIN_CAPACITY}`)
    .max(GROUP_CONSTANTS.MAX_CAPACITY, `Capacity cannot exceed ${GROUP_CONSTANTS.MAX_CAPACITY}`)
    .optional(),

  goalHours: z
    .number({
      invalid_type_error: 'Goal hours must be a number',
    })
    .int('Goal hours must be a whole number')
    .min(GROUP_CONSTANTS.GOAL_HOURS_MIN, `Goal hours must be at least ${GROUP_CONSTANTS.GOAL_HOURS_MIN}`)
    .max(GROUP_CONSTANTS.GOAL_HOURS_MAX, `Goal hours cannot exceed ${GROUP_CONSTANTS.GOAL_HOURS_MAX}`)
    .optional(),

  tags: z
    .array(z.string().trim())
    .max(GROUP_CONSTANTS.MAX_TAGS, `Maximum ${GROUP_CONSTANTS.MAX_TAGS} tags allowed`)
    .optional()
    .default([]),

  // ADD these fields to the zod schema object
  cameraRequired: z.boolean().optional().default(false),
  attendanceRequired: z.boolean().optional().default(false),
  minAttendancePercent: z.number().int().min(50).max(100).optional().nullable(),
});

export type CreateGroupFormData = z.infer<typeof createGroupSchema>;

// ==================== UPDATE GROUP SCHEMA ====================

export const updateGroupSchema = z.object({
  title: z
    .string()
    .min(GROUP_CONSTANTS.TITLE_MIN_LENGTH, `Title must be at least ${GROUP_CONSTANTS.TITLE_MIN_LENGTH} characters`)
    .max(GROUP_CONSTANTS.TITLE_MAX_LENGTH, `Title must not exceed ${GROUP_CONSTANTS.TITLE_MAX_LENGTH} characters`)
    .trim()
    .optional(),

  description: z
    .string()
    .max(GROUP_CONSTANTS.DESCRIPTION_MAX_LENGTH, `Description must not exceed ${GROUP_CONSTANTS.DESCRIPTION_MAX_LENGTH} characters`)
    .trim()
    .optional()
    .or(z.literal('')),

  category: z
    .nativeEnum(GroupCategory, {
      errorMap: () => ({ message: 'Please select a valid category' }),
    })
    .optional(),

  visibility: z
    .nativeEnum(GroupVisibility, {
      errorMap: () => ({ message: 'Visibility must be public or private' }),
    })
    .optional(),

  capacity: z
    .number({ invalid_type_error: 'Capacity must be a number' })
    .int('Capacity must be a whole number')
    .min(GROUP_CONSTANTS.MIN_CAPACITY, `Capacity must be at least ${GROUP_CONSTANTS.MIN_CAPACITY}`)
    .max(GROUP_CONSTANTS.MAX_CAPACITY, `Capacity cannot exceed ${GROUP_CONSTANTS.MAX_CAPACITY}`)
    .optional(),

  goalHours: z
    .number({ invalid_type_error: 'Goal hours must be a number' })
    .int('Goal hours must be a whole number')
    .min(GROUP_CONSTANTS.GOAL_HOURS_MIN, `Goal hours must be at least ${GROUP_CONSTANTS.GOAL_HOURS_MIN}`)
    .max(GROUP_CONSTANTS.GOAL_HOURS_MAX, `Goal hours cannot exceed ${GROUP_CONSTANTS.GOAL_HOURS_MAX}`)
    .optional(),

  tags: z
    .array(z.string().trim())
    .max(GROUP_CONSTANTS.MAX_TAGS, `Maximum ${GROUP_CONSTANTS.MAX_TAGS} tags allowed`)
    .optional(),

  avatar: z
    .string()
    .url('Invalid avatar URL')
    .optional()
    .or(z.literal(''))
    .or(z.null()),

  coverImage: z
    .string()
    .url('Invalid cover image URL')
    .optional()
    .or(z.literal(''))
    .or(z.null()),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});

export type UpdateGroupFormData = z.infer<typeof updateGroupSchema>;

// ==================== JOIN GROUP SCHEMA ====================

export const joinGroupSchema = z.object({
  joinCode: z
    .string()
    .length(GROUP_CONSTANTS.JOIN_CODE_LENGTH, `Join code must be exactly ${GROUP_CONSTANTS.JOIN_CODE_LENGTH} characters`)
    .toUpperCase()
    .optional()
    .or(z.literal('')),
});

export type JoinGroupFormData = z.infer<typeof joinGroupSchema>;

// Join schema for private groups (joinCode required)
export const joinPrivateGroupSchema = z.object({
  joinCode: z
    .string()
    .min(1, 'Join code is required for private groups')
    .length(GROUP_CONSTANTS.JOIN_CODE_LENGTH, `Join code must be exactly ${GROUP_CONSTANTS.JOIN_CODE_LENGTH} characters`)
    .toUpperCase(),
});

export type JoinPrivateGroupFormData = z.infer<typeof joinPrivateGroupSchema>;

// ==================== SEARCH / FILTER SCHEMA ====================

export const groupListQuerySchema = z.object({
  page: z
    .number()
    .int()
    .min(1, 'Page must be at least 1')
    .optional()
    .default(1),

  limit: z
    .number()
    .int()
    .min(1)
    .max(100, 'Limit cannot exceed 100')
    .optional()
    .default(10),

  category: z
    .nativeEnum(GroupCategory)
    .optional(),

  visibility: z
    .nativeEnum(GroupVisibility)
    .optional(),

  search: z
    .string()
    .trim()
    .min(2, 'Search query must be at least 2 characters')
    .max(100, 'Search query too long')
    .optional(),

  sortBy: z
    .enum(['createdAt', 'memberCount', 'title'])
    .optional()
    .default('createdAt'),

  sortOrder: z
    .enum(['asc', 'desc'])
    .optional()
    .default('desc'),
});

export type GroupListQueryFormData = z.infer<typeof groupListQuerySchema>;

// ==================== HELPER: Safe Parse with formatted errors ====================

/**
 * Parse form data and return formatted errors for react-hook-form
 * Usage: const result = safeParseGroup(createGroupSchema, formData);
 */
export function safeParseGroup<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  result.error.errors.forEach((err) => {
    const path = err.path.join('.');
    if (path) errors[path] = err.message;
  });

  return { success: false, errors };
}
