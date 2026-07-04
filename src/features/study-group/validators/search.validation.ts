import { z } from 'zod';

const GroupCategoryEnum = z.enum([
  'JEE', 'NEET', 'Competitive Examinations',
  'College Students', 'Working Professionals',
  'Language Learning', 'Other'
]);

const SortOptionEnum = z.enum([
  'newest', 'oldest', 'mostMembers',
  'leastMembers', 'topRanked', 'mostActive'
]);

// GET /search/groups
export const SearchGroupsSchema = z.object({
  search:     z.string().min(1).max(100).optional(),
  category:   GroupCategoryEnum.optional(),
  visibility: z.enum(['public', 'private']).optional(),
  tags:       z.union([z.string(), z.array(z.string())]).optional(),
  hasSpace:   z.boolean().optional(),
  minHours:   z.number().min(0).max(24).optional(),
  maxHours:   z.number().min(0).max(24).optional(),
  sort:       SortOptionEnum.optional(),
  page:       z.number().int().min(1).optional(),
  limit:      z.number().int().min(1).max(100).optional(),
});

// GET /search/groups/popular  &  /trending  &  /available
export const LimitOnlySchema = z.object({
  limit: z.number().int().min(1).max(50).optional(),
});

// GET /search/groups/recommended
export const RecommendedGroupsSchema = z.object({
  category: GroupCategoryEnum.optional(),
  limit:    z.number().int().min(1).max(50).optional(),
});

// GET /search/groups/category/:category  (path param)
export const CategoryParamSchema = z.object({
  category: GroupCategoryEnum,
});

// GET /search/groups/tags
export const SearchByTagsSchema = z.object({
  tags:  z.union([z.string().min(1), z.array(z.string().min(1))]),
  page:  z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export type SearchGroupsInput      = z.infer<typeof SearchGroupsSchema>;
export type RecommendedGroupsInput = z.infer<typeof RecommendedGroupsSchema>;
export type SearchByTagsInput      = z.infer<typeof SearchByTagsSchema>;