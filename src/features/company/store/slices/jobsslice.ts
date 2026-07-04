import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type JobStatus = 'open' | 'closed' | 'on-hold';

export interface Job {
  id: string;
  title: string;
  type: string;
  status: JobStatus;
  location: string;
  experience: string;
  salary: string;
  applications: number;
  posted: string;
  expiresIn: string;
}

export interface ATSStage {
  stage: string;
  count: number;
  color: string;
  candidates: string[];
}

interface JobsState {
  items: Job[];
  pipeline: ATSStage[];
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  items: [
    { id: '1', title: 'Senior React Developer',  type: 'Full-time',  status: 'open',   location: 'Bhopal / Remote', experience: 'Senior', salary: '₹15-25 LPA', applications: 18, posted: 'Feb 28, 2026', expiresIn: '12 days' },
    { id: '2', title: 'Backend Node.js Engineer', type: 'Full-time',  status: 'open',   location: 'Remote',          experience: 'Mid',    salary: '₹12-18 LPA', applications: 32, posted: 'Feb 25, 2026', expiresIn: '9 days'  },
    { id: '3', title: 'UI/UX Designer',           type: 'Contract',   status: 'open',   location: 'Bhopal',          experience: 'Mid',    salary: '₹8-12 LPA',  applications: 11, posted: 'Feb 20, 2026', expiresIn: '5 days'  },
    { id: '4', title: 'ML Engineer Intern',        type: 'Internship', status: 'closed', location: 'Bhopal',          experience: 'Entry',  salary: '₹20K/mo',    applications: 47, posted: 'Jan 15, 2026', expiresIn: 'Expired' },
  ],
  pipeline: [
    { stage: 'Applied',     count: 32, color: 'bg-gray-400',   candidates: ['Ravi Sharma', 'Priya Singh', 'Amit Kumar'] },
    { stage: 'Screening',   count: 14, color: 'bg-blue-500',   candidates: ['Sneha Verma', 'Karan Patel']               },
    { stage: 'Shortlisted', count: 8,  color: 'bg-yellow-500', candidates: ['Anjali Gupta', 'Rahul Joshi']              },
    { stage: 'Interview',   count: 4,  color: 'bg-orange-500', candidates: ['Pooja Mehta', 'Vikram Das']                },
    { stage: 'Accepted',    count: 1,  color: 'bg-green-500',  candidates: ['Harshit Kushwah']                          },
    { stage: 'Rejected',    count: 5,  color: 'bg-red-400',    candidates: []                                           },
  ],
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addJob(state, action: PayloadAction<Job>) {
      state.items.unshift(action.payload);
    },
    deleteJob(state, action: PayloadAction<string>) {
      state.items = state.items.filter(j => j.id !== action.payload);
    },
    updateJobStatus(state, action: PayloadAction<{ id: string; status: JobStatus }>) {
      const job = state.items.find(j => j.id === action.payload.id);
      if (job) job.status = action.payload.status;
    },
    // Move a candidate card between ATS stages
    moveCandidate(state, action: PayloadAction<{ name: string; from: string; to: string }>) {
      const { name, from, to } = action.payload;
      const fromStage = state.pipeline.find(s => s.stage === from);
      const toStage   = state.pipeline.find(s => s.stage === to);
      if (!fromStage || !toStage) return;
      fromStage.candidates = fromStage.candidates.filter(c => c !== name);
      fromStage.count = Math.max(0, fromStage.count - 1);
      toStage.candidates.push(name);
      toStage.count += 1;
    },
    // BACKEND HANDOFF
    setJobs(state, action: PayloadAction<Job[]>) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setPipeline(state, action: PayloadAction<ATSStage[]>) {
      state.pipeline = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  addJob, deleteJob, updateJobStatus, moveCandidate,
  setJobs, setPipeline, setLoading, setError,
} = jobsSlice.actions;
export default jobsSlice.reducer;