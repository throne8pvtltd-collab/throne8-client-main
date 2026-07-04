// src/store/features/education/education.types.ts

export interface EducationData {
    educationId?: string;
    schoolCollegeName: string;
    degree: string;
    degreeType: 'High School' | 'Diploma' | "Bachelor's" | "Master's" | 'Doctorate' | 'Certificate' | 'Other';
    specialization?: string;
    startDate: string;
    endDate?: string | null;
    description?: string;
    educationType?: 'full-time' | 'part-time' | 'distance' | 'online';
    gradeType?: 'percentage' | 'cgpa' | 'gpa' | 'grade';
    gradeValue?: string;
    location?: string;
    isOngoing?: boolean;
    duration?: string;
}

export interface EducationState {
    educationList: EducationData[];
    isLoadingEducation: boolean;
    educationError: string | null;
    selectedEducation: EducationData | null;
}