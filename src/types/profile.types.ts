export interface UserProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    location: string;
    profilePhotoId?: string;
    coverPhotoId?: string;
    headlineId?: string;
    aboutId?: string;
    experienceIds?: string[];
    currentPosition?: string;
    education?: string;
    contactInfo?: any;
    onboarding?: {
        userType?: 'student' | 'working';
        completedAt?: string;
        studentProfile?: {
            collegeName: string;
            degree: string;
            fieldOfStudy: string;
            graduationYear: string;
        };
        workingProfile?: {
            companyName: string;
            jobTitle: string;
            startDate: string;
            endDate?: string | null;
        };
    };
}

export interface ProfileData {
    // ✅ FIX: stray index signature hataya — yehi TS error ka root cause tha
    bannerImage: string;
    profileImage: string;
    pronouns: string;
    description: string;
    followers: number;
    connections: string;
    userName: string;
    email: string;
    name: string;
    headline: string;
    education: {
        collegeName: string;
        degree: string;
        fieldOfStudy: string;
        graduationYear: string;
    };
    company: string;
    location: string;
}

export interface TransformedPost {
    postId: string;
    title: string;
    text: string;
    image: string;
    likes: number;
    isLiked: boolean;
    comments: number;
    reposts: number;
    time: string;
    images: any[];
    videos: any[];
    documents: any[];
    createdAt: string;
    isPinned: boolean;
    isSaved: boolean;
    isArchived: boolean;
}

export interface AboutData {
    coverStory?: {
        videoSecureUrl?: string;
    };
}

export interface HeadlineData {
    title: string;
}