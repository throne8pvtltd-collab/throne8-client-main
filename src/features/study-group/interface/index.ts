
export interface Group {
  id: number;
  title: string;
  description: string;
  category: string;
members: number;

  rank: number;

  visibility: 'public' | 'private';
  cameraOn: boolean;
  
  capacity: number;
  leader: string;
  goalHours: number;
  attendanceAvg: number;
  // my-groups specific fields
  isCreator?: boolean;
  joinedDate?: string;
  lastActive?: string;
  streak?: number;
  studyTime?: number;
  attendance?: number;
  cameraRequired?: boolean;

  leaderId: string;
  updatedAt?: string;
  currentMemberCount?: number;
  groupId?: string;
  joinCode?: string;
}

export interface PublicGroup {
  id: number;
  title: string;
  members: number;
}

// ─── Types (unchanged) ────────────────────────────────────────
export interface Member {
  id: number;
  name: string;
  avatar: string;
  joinedDate: string;
  studyTime: number;
  attendance: number;
  streak: number;
  rank: number;
  violations: number;
  lastActive: string;
}


export interface SettingsModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  group: Group | null;
  onUpdate: (groupId: string, formData: Partial<Group>) => void;
  onDelete: (groupId: string) => void;
  onLeave: (groupId: string) => void;
}

export interface FormData {
  title: string;
  description: string;
  category: string;
  goalHours: number;
  capacity: number;
  cameraRequired: boolean;
  attendanceRequired: boolean;    
  minAttendancePercent: number | null;  
  visibility: 'public' | 'private';
}