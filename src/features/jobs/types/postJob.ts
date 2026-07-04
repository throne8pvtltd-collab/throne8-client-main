import { WorkMode, JobType } from '@/features/jobs/types/jobs'

// ── Plan ──────────────────────────────────────────────────────────────────────
export type PostJobPlan = 'basic' | 'featured' | 'premium'
export type ApplyType   = 'link' | 'email'

// ── Form shape ────────────────────────────────────────────────────────────────
export interface JobPostForm {
  // Step 0 — Company
  companyName:    string
  companyWebsite: string
  companySize:    string
  companyLogo:    string   // object URL preview; convert to base64 on submit

  // Step 1 — Role
  title:     string
  category:  string
  workMode:  WorkMode | ''
  jobType:   JobType
  location:  string
  salaryMin: string
  salaryMax: string
  currency:  string
  tags:      string[]
  tagInput:  string

  // Step 2 — Details
  description:  string
  requirements: string
  niceToHave:   string
  applyType:    ApplyType
  applyValue:   string

  // Step 3 — Plan
  plan: PostJobPlan
}

export const INITIAL_FORM: JobPostForm = {
  companyName: '', companyWebsite: '', companySize: '', companyLogo: '',
  title: '', category: '', workMode: '', jobType: 'full-time',
  location: '', salaryMin: '', salaryMax: '', currency: 'USD',
  tags: [], tagInput: '',
  description: '', requirements: '', niceToHave: '',
  applyType: 'link', applyValue: '',
  plan: 'featured',
}

// ── Static data (defined once, never recreated) ───────────────────────────────
export const POST_JOB_CATEGORIES = [
  'Engineering', 'Product', 'Design', 'Data & ML',
  'Marketing', 'Sales', 'Operations', 'Finance',
  'Legal', 'HR', 'Support', 'Other',
] as const

export const COMPANY_SIZES = [
  '1–10', '11–50', '51–200', '201–500', '501–1000', '1000+',
] as const

export const WORK_MODE_OPTIONS: { value: WorkMode; label: string }[] = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'Onsite' },
]

export const JOB_TYPE_OPTIONS: { value: JobType; label: string }[] = [
  { value: 'full-time',  label: 'Full-time'  },
  { value: 'part-time',  label: 'Part-time'  },
  { value: 'contract',   label: 'Contract'   },
  { value: 'internship', label: 'Internship' },
]

export const APPLY_OPTIONS: { value: ApplyType; label: string }[] = [
  { value: 'link',  label: '🔗 Application URL' },
  { value: 'email', label: '✉️ Email'            },
]

// ── Plans (static — defined once outside component tree) ─────────────────────
export interface PlanConfig {
  id:       PostJobPlan
  name:     string
  price:    string
  desc:     string
  perks:    readonly string[]
  popular?: boolean
  dark?:    boolean
  bg:       string
  border:   string
}

export const PLANS: readonly PlanConfig[] = [
  {
    id: 'basic', name: 'Basic', price: 'Free',
    desc: 'Standard listing for 30 days',
    perks: ['Listed in job feed', '30-day visibility', 'Up to 100 applicants'],
    bg: 'white', border: '#e8e0d6',
  },
  {
    id: 'featured', name: 'Featured', price: '$199',
    desc: 'Stand out from the crowd',
    perks: ['Highlighted in feed', '60-day visibility', 'Unlimited applicants', 'Email to matched candidates'],
    popular: true, bg: '#fdf8f3', border: '#c9a882',
  },
  {
    id: 'premium', name: 'Premium', price: '$499',
    desc: 'Maximum reach & screening',
    perks: ['Top of feed placement', '90-day visibility', 'Unlimited applicants', 'AI candidate matching', 'Dedicated support', 'Analytics dashboard'],
    dark: true, bg: '#2d1f14', border: '#2d1f14',
  },
] as const

export const TOTAL_STEPS = 3
export const STEP_LABELS  = ['Role', 'Details', 'Plan & Post'] as const