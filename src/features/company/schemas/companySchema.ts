import { CompanyFormValues } from "../types";

export function validateCompanyForm(data: CompanyFormValues): Partial<Record<keyof CompanyFormValues, string>> {
  const errors: Partial<Record<keyof CompanyFormValues, string>> = {};

  if (!data.name?.trim()) errors.name = 'Company name is required';
  if (!data.slug?.trim()) errors.slug = 'Slug is required';
  else if (!/^[a-z0-9-]+$/.test(data.slug)) errors.slug = 'Only lowercase letters, numbers, hyphens';
  if (!data.industry?.trim()) errors.industry = 'Industry is required';
  if (data.founded && !/^\d{4}$/.test(data.founded)) errors.founded = 'Enter a valid 4-digit year';
  if (data.website) { try { new URL(data.website); } catch { errors.website = 'Enter a valid URL'; } }

  return errors;
}