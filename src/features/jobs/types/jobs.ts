export type JobType         = 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship'
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive'
export type WorkMode        = 'remote' | 'hybrid' | 'onsite'
export type SectionView     = 'recommended' | 'recent'

export type ApplicationStatus =
  | 'applied'
  | 'reviewing'
  | 'interview'
  | 'assessment'
  | 'offer'
  | 'rejected'
  | 'withdrawn'

export interface ApplicationRecord {
  jobId:     string
  status:    ApplicationStatus
  appliedAt: string
  updatedAt: string
  notes?:    string
}

export interface Salary {
  min:      number
  max:      number
  currency: string
}

export interface Job {
  id:               string
  title:            string
  company:          string
  companyLogo:      string
  location:         string
  salary:           Salary
  type:             JobType
  experience:       ExperienceLevel
  workMode:         WorkMode
  tags:             string[]
  description:      string
  responsibilities: string[]
  requirements:     string[]
  benefits:         string[]
  postedAt:         string
  deadline:         string
  applicants:       number
  featured:         boolean
  category:         string
}

export interface FilterState {
  search:     string
  types:      JobType[]
  experience: ExperienceLevel[]
  workMode:   WorkMode[]
  categories: string[]
  location:   string
  salaryMin:  number
  salaryMax:  number
}

export interface JobsState {
  jobs:          Job[]
  filteredJobs:  Job[]
  savedJobs:     string[]
  applications:  ApplicationRecord[]
  filters:       FilterState
  activeSection: SectionView
  loading:       boolean
  error:         string | null
}