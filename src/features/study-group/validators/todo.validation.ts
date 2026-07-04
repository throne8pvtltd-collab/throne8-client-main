import { z } from 'zod';

export const TaskPriority = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
} as const;

export const TaskStatus = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    OVERDUE: 'overdue',
    CANCELLED: 'cancelled',
} as const;

// Create Task — backend createTaskSchema ke exactly same
export const createTaskSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(200, 'Title must not exceed 200 characters')
        .trim(),

    description: z
        .string()
        .max(1000, 'Description must not exceed 1000 characters')
        .trim()
        .nullable()
        .optional(),

    priority: z
        .enum(['low', 'medium', 'high', 'urgent'])
        .optional()
        .default('medium'),

    deadline: z
        .string()
        .optional()
        .nullable()
        .refine((val) => {
            if (!val) return true;
            return new Date(val) > new Date();
        }, 'Deadline must be in the future'),

    //   tags: z
    //     .array(z.string().trim())
    //     .max(10, 'Maximum 10 tags allowed')
    //     .optional()
    //     .default([]),
    // BAAD (optional karo properly)
    tags: z
        .array(z.string().trim())
        .max(10, 'Maximum 10 tags allowed')
        .optional(),

    reminderAt: z
        .string()
        .optional()
        .nullable()
        .refine((val) => {
            if (!val) return true;
            return new Date(val) > new Date();
        }, 'Reminder time must be in the future'),

    groupId: z
        .string()
        .uuid('Invalid group ID')
        .nullable()
        .optional(),
});

// Update Task
export const updateTaskSchema = createTaskSchema
    .partial()
    .extend({
        status: z.enum(['pending', 'in_progress', 'completed', 'overdue', 'cancelled']).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field is required for update',
    });

// Query filters — GET /tasks ke liye
export const taskQuerySchema = z.object({
    status: z.enum(['pending', 'in_progress', 'completed', 'overdue', 'cancelled']).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    completed: z.boolean().optional(),
    search: z.string().max(100).optional(),
    tags: z.union([z.string(), z.array(z.string())]).optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
    sortBy: z.enum(['createdAt', 'updatedAt', 'deadline', 'priority', 'title']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskQueryInput = z.infer<typeof taskQuerySchema>;