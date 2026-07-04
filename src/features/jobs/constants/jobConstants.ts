import { ApplicationStatus } from '@/features/jobs/types/jobs'

export interface StatusConfig {
  label:  string
  color:  string
  bg:     string
  border: string
  dot:    string
}

export const STATUS_CFG: Record<ApplicationStatus, StatusConfig> = {
  applied:    { label: 'Applied',    color: 'text-blue-700',    bg: 'bg-blue-50',    border: 'border-blue-200',    dot: 'bg-blue-500'    },
  reviewing:  { label: 'In Review',  color: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200',   dot: 'bg-amber-500'   },
  interview:  { label: 'Interview',  color: 'text-violet-700',  bg: 'bg-violet-50',  border: 'border-violet-200',  dot: 'bg-violet-500'  },
  assessment: { label: 'Assessment', color: 'text-orange-700',  bg: 'bg-orange-50',  border: 'border-orange-200',  dot: 'bg-orange-500'  },
  offer:      { label: 'Offer 🎉',   color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  rejected:   { label: 'Rejected',   color: 'text-red-600',     bg: 'bg-red-50',     border: 'border-red-200',     dot: 'bg-red-400'     },
  withdrawn:  { label: 'Withdrawn',  color: 'text-zinc-500',    bg: 'bg-zinc-50',    border: 'border-zinc-200',    dot: 'bg-zinc-400'    },
}

export const APPLICATION_PIPELINE: ApplicationStatus[] = [
  'applied', 'reviewing', 'interview', 'assessment', 'offer',
]

export const LOGO_BG: Record<string, string> = {
  T8: '#4a3728', NL: '#2d4a6b', OR: '#7a3d1a',
  DC: '#1a5c3a', FM: '#6b1a3a', PL: '#1a4a6b',
  LC: '#6b4a1a', ST: '#3a3a3a',
}

export const WORK_MODE_STYLE: Record<string, string> = {
  remote: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  hybrid: 'bg-amber-50   text-amber-700   border-amber-200',
  onsite: 'bg-rose-50    text-rose-700    border-rose-200',
}

export const TYPE_LABEL: Record<string, string> = {
  'full-time':  'Full-time',
  'part-time':  'Part-time',
  contract:     'Contract',
  freelance:    'Freelance',
  internship:   'Internship',
}

export const formatSalary = (min: number, max: number): string =>
  `$${Math.round(min / 1000)}k – $${Math.round(max / 1000)}k`

export const timeAgo = (dateStr: string): string => {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7)  return `${days}d ago`
  return `${Math.floor(days / 7)}w ago`
}