// src/types/analytics.types.ts

export interface AnalyticsSummary {
    profileViews: {
        total: number;
        last7Days: number;
        last30Days: number;
        last90Days: number;
    };
    postImpressions: {
        total: number;
        last7Days: number;
        last30Days: number;
    };
    searchAppearances: {
        total: number;
        last7Days: number;
        last30Days: number;
        topKeywords: Array<{
            keyword: string;
            count: number;
        }>;
    };
    engagements: {
        total: number;
        last7Days: number;
        last30Days: number;
        reactions: {
            total: number;
            like: number;
            love: number;
            celebrate: number;
            support: number;
            insightful: number;
            funny: number;
        };
        comments: {
            total: number;
            last7Days: number;
            last30Days: number;
        };
        shares: {
            total: number;
            last7Days: number;
            last30Days: number;
        };
    };
    demographics?: {
        locations: Array<{ location: string; count: number }>;
        jobTitles: Array<{ title: string; count: number }>;
        industries: Array<{ industry: string; count: number }>;
    };
}

export interface PostImpression {
    postId: string;
    source: 'feed' | 'profile' | 'search' | 'hashtag' | 'direct';
    viewerId?: string;
    viewedAt: Date;
    viewCount: number;
    timeBasedCounts?: Array<{
        date: string;
        count: number;
        firstViewAt: Date;
        lastViewAt: Date;
    }>;
}

export interface ProfileView {
    viewerId?: string;
    viewerName?: string;
    viewerHeadline?: string;
    viewerPhotoUrl?: string;
    viewedAt: Date;
    isAnonymous: boolean;
}

export interface SearchAppearance {
    searchQuery: string;
    searcherId?: string;
    appearedAt: Date;
    wasClicked: boolean;
    position?: number;
}

export interface TrendData {
    date: string;
    views?: number;
    impressions?: number;
    engagements?: number;
    searches?: number;
}