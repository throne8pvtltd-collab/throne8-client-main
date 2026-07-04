/**
 * Company API client
 * ─────────────────────────────────────────────────────────────────
 * Backend integration points are clearly marked.
 * All functions return typed promises matching types/index.ts.
 * Replace the mock returns with real fetch() calls when API is ready.
 * ─────────────────────────────────────────────────────────────────
 */
import type { CompanyMeta, JobPosting, ApiResponse } from '@/features/company/type/company.types';
import { apiConfig } from '@/config/site.config';

const BASE = `${apiConfig.baseUrl}/${apiConfig.version}`;

// ── Generic fetcher ───────────────────────────────────────────────

async function apiFetch<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
  return res.json() as Promise<ApiResponse<T>>;
}

// ── Company endpoints ────────────────────────────────────────────

/** GET /v1/company — fetch company profile */
export async function getCompany(slug: string): Promise<CompanyMeta> {
  // TODO: uncomment when backend is ready
  // const { data } = await apiFetch<CompanyMeta>(`${apiConfig.endpoints.company}/${slug}`);
  // return data;
  throw new Error(`getCompany(${slug}) — API not yet connected. Using mock data.`);
}

/** POST /v1/company/follow — toggle follow */
export async function toggleFollowCompany(
  companyId: string,
  userId: string,
  action: 'follow' | 'unfollow',
): Promise<{ followers: number }> {
  // TODO: uncomment when backend is ready
  // const { data } = await apiFetch<{ followers: number }>(apiConfig.endpoints.follow, {
  //   method: 'POST',
  //   body: JSON.stringify({ companyId, userId, action }),
  // });
  // return data;
  throw new Error('toggleFollowCompany — API not yet connected.');
}

// ── Jobs endpoints ────────────────────────────────────────────────

/** GET /v1/jobs?company=:id — fetch job listings */
export async function getJobs(companyId: string): Promise<JobPosting[]> {
  // TODO: uncomment when backend is ready
  // const { data } = await apiFetch<JobPosting[]>(`${apiConfig.endpoints.jobs}?company=${companyId}`);
  // return data;
  throw new Error('getJobs — API not yet connected. Using mock data.');
}

/** POST /v1/jobs/:id/apply — submit application */
export async function applyToJob(
  jobId: string,
  payload: { name: string; email: string; resumeUrl: string; coverLetter?: string },
): Promise<{ applicationId: string }> {
  // TODO: uncomment when backend is ready
  // const { data } = await apiFetch<{ applicationId: string }>(
  //   apiConfig.endpoints.applyJob.replace(':id', jobId),
  //   { method: 'POST', body: JSON.stringify(payload) },
  // );
  // return data;
  throw new Error('applyToJob — API not yet connected.');
}
