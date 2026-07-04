export type InterviewRound = 'screening' | 'technical' | 'system-design' | 'behavioral' | 'culture-fit' | 'final'

export interface RoundMeta {
  id:       InterviewRound
  label:    string
  icon:     string
  dur:      string
  desc:     string
  focus:    string[]
  tips:     string[]
}

export interface PrepQuestion {
  id:         string
  text:       string
  round:      InterviewRound
  difficulty: 'easy' | 'medium' | 'hard'
  hint?:      string
}

export interface PrepAnswer {
  questionId:  string
  text:        string
  durationSec: number
  via:         'text' | 'voice'
}

export interface AnswerFeedback {
  questionId:   string
  score:        number
  strengths:    string[]
  improvements: string[]
  idealAnswer:  string
  keywords:     string[]
}

export interface PrepSession {
  jobId:      string
  jobTitle:   string
  company:    string
  round:      InterviewRound
  questions:  PrepQuestion[]
  answers:    PrepAnswer[]
  feedbacks:  AnswerFeedback[]
  currentIdx: number
  phase:      'idle' | 'question' | 'feedback' | 'summary'
  startedAt:  string | null
}

export const ROUNDS: RoundMeta[] = [
  { id: 'screening',     label: 'Screening',     icon: '📞', dur: '20–30 min', desc: 'Recruiter call to assess fit, salary expectations and availability.',               focus: ['Elevator pitch', 'Why this company', 'Salary range', 'Notice period'],          tips: ['Research company mission', 'Prepare 3 smart questions', 'Know your salary range'] },
  { id: 'technical',     label: 'Technical',     icon: '💻', dur: '60–90 min', desc: 'Coding problems, DSA, system knowledge and domain expertise.',                       focus: ['Data Structures', 'Algorithms', 'Code quality', 'Problem solving'],              tips: ['Think out loud always', 'Clarify constraints first', 'Test with edge cases'] },
  { id: 'system-design', label: 'System Design', icon: '🏗️', dur: '45–60 min', desc: 'Design scalable systems — architecture, tradeoffs, real-world constraints.',        focus: ['Scalability', 'Database design', 'API design', 'Caching + CDN'],               tips: ['Clarify scale requirements first', 'Start high-level then drill', 'Mention monitoring'] },
  { id: 'behavioral',    label: 'Behavioral',    icon: '🧠', dur: '30–45 min', desc: 'Past experiences via STAR method. Tests soft skills and leadership.',               focus: ['Leadership', 'Conflict resolution', 'Ownership', 'Teamwork'],                   tips: ['Use STAR format every time', 'Have 5–6 strong stories', 'Quantify outcomes'] },
  { id: 'culture-fit',   label: 'Culture Fit',   icon: '🤝', dur: '30–45 min', desc: 'Alignment with company values, working style and team dynamics.',                   focus: ['Values alignment', 'Work style', 'Team collaboration', 'Growth mindset'],      tips: ['Research company values deeply', 'Be authentic', 'Show curiosity'] },
  { id: 'final',         label: 'Final Round',   icon: '🎯', dur: '60–90 min', desc: 'Senior leadership on vision, impact and long-term fit.',                            focus: ['Strategic thinking', 'Vision alignment', 'Executive presence', 'Impact'],      tips: ['Know the business deeply', 'Prep a 30-60-90 plan', 'Ask strategic questions'] },
]

export const ROUND_MAP = Object.fromEntries(ROUNDS.map(r => [r.id, r])) as Record<InterviewRound, RoundMeta>