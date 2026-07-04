'use client';

import React, { useEffect, useState } from 'react';
import { BarChart2, Eye, TrendingUp, Users } from 'lucide-react';
import AnalyticsService from '@/lib/api/analytics.service';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface AnalyticsDashboardProps {
    userId: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ userId }) => {
    const router = useRouter();
    const { user: currentUser } = useAuth();
    const [analytics, setAnalytics] = useState({
        profileViews: { total: 0, last7Days: 0, last30Days: 0 },
        postImpressions: { total: 0, last7Days: 0, last30Days: 0 },
        searchAppearances: { total: 0, last7Days: 0, last30Days: 0 }
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setIsLoading(true);

                // Fetch all analytics data
                const [profileViews, postImpressions, searchAppearances] = await Promise.all([
                    AnalyticsService.getProfileViewsCount(30),
                    AnalyticsService.getPostImpressionsCount(20),
                    AnalyticsService.getSearchAppearancesCount()
                ]);

                setAnalytics({
                    profileViews: profileViews.data || { total: 0, last7Days: 0, last30Days: 0 },
                    postImpressions: postImpressions.data || { total: 0, last7Days: 0, last30Days: 0 },
                    searchAppearances: searchAppearances.data || { total: 0, last7Days: 0, last30Days: 0 }
                });
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchAnalytics();
        }
    }, [userId]);

    if (isLoading) {
        return (
            <div className="bg-white/60 rounded-3xl p-6 border border-[#4a3728]/20">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-20 bg-gray-200 rounded"></div>
                        <div className="h-20 bg-gray-200 rounded"></div>
                        <div className="h-20 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white/60 rounded-3xl p-6 border border-[#4a3728]/20 shadow-lg mb-4">
            <h3 className="text-xl font-bold text-[#4a3728] mb-4 flex items-center gap-2">
                <BarChart2 className="w-5 h-5" />
                Your Analytics
            </h3>

            <div className="finalAnalyticsDesignDiv grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Views */}
                <div
                    onClick={() => router.push(`/profile/analytics/${currentUser?.userId}`)}
                    className="group bg-[#e0d8cf] rounded-2xl p-6 shadow-xl border border-[#c9bfb4] hover:shadow-[0_0_22px_#c9bfb4] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Eye className="w-7 h-7 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-green-600">
                            +12%
                        </p>
                    </div>

                    {/* Main Value */}
                    <div className="mb-2">
                        <h2 className="text-4xl font-bold text-[#4a3728]">
                            {analytics.profileViews.last30Days.toLocaleString()}
                        </h2>
                        <p className="text-xs text-[#7a5c3e] mt-1">
                            out of {analytics.profileViews.total.toLocaleString()} total
                        </p>
                    </div>

                    <p className="text-base font-semibold text-[#4a3728]/80 mb-2">
                        Profile Views
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="w-full h-2 bg-[#d1c5b9] rounded-full overflow-hidden">
                            <div
                                className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700"
                                style={{ width: '70%' }}
                            ></div>
                        </div>
                    </div>

                    <p className="text-xs text-[#4a3728]/70 mt-3">
                        People visiting your profile.
                    </p>

                    {/* Footer */}
                    <div className="mt-5 pt-4 border-t border-[#c9bfb4]/60 flex justify-between items-center">
                        <span className="text-[#4a3728]/60 text-xs font-medium">
                            Last 7 days
                        </span>
                    </div>
                </div>

                {/* Post Impressions */}
                <div
                    onClick={() => router.push(`/profile/analytics/${currentUser?.userId}`)}
                    className="group bg-[#e0d8cf] rounded-2xl p-6 shadow-xl border border-[#c9bfb4] hover:shadow-[0_0_22px_#c9bfb4] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <TrendingUp className="w-7 h-7 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-green-600">
                            +60%
                        </p>
                    </div>

                    {/* Main Value */}
                    <div className="mb-2">
                        <h2 className="text-4xl font-bold text-[#4a3728]">
                            {analytics.postImpressions.last30Days.toLocaleString()}
                        </h2>
                        <p className="text-xs text-[#7a5c3e] mt-1">
                            out of {analytics.postImpressions.total.toLocaleString()} total
                        </p>
                    </div>

                    <p className="text-base font-semibold text-[#4a3728]/80 mb-2">
                        Post Impressions
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="w-full h-2 bg-[#d1c5b9] rounded-full overflow-hidden">
                            <div
                                className="h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-700"
                                style={{ width: '85%' }}
                            ></div>
                        </div>
                    </div>

                    <p className="text-xs text-[#4a3728]/70 mt-3">
                        Engagement on your posts.
                    </p>

                    {/* Footer */}
                    <div className="mt-5 pt-4 border-t border-[#c9bfb4]/60 flex justify-between items-center">
                        <span className="text-[#4a3728]/60 text-xs font-medium">
                            Last 7 days
                        </span>
                    </div>
                </div>

                {/* Search Appearances */}
                <div
                    onClick={() => router.push(`/profile/analytics/${currentUser?.userId}`)}
                    className="group bg-[#e0d8cf] rounded-2xl p-6 shadow-xl border border-[#c9bfb4] hover:shadow-[0_0_22px_#c9bfb4] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Users className="w-7 h-7 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-green-600">
                            +40%
                        </p>
                    </div>

                    {/* Main Value */}
                    <div className="mb-2">
                        <h2 className="text-4xl font-bold text-[#4a3728]">
                            {analytics.searchAppearances.last30Days.toLocaleString()}
                        </h2>
                        <p className="text-xs text-[#7a5c3e] mt-1">
                            out of {analytics.searchAppearances.total.toLocaleString()} total
                        </p>
                    </div>

                    <p className="text-base font-semibold text-[#4a3728]/80 mb-2">
                        Search Appearances
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="w-full h-2 bg-[#d1c5b9] rounded-full overflow-hidden">
                            <div
                                className="h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-700"
                                style={{ width: '60%' }}
                            ></div>
                        </div>
                    </div>

                    <p className="text-xs text-[#4a3728]/70 mt-3">
                        Times you appeared in searches.
                    </p>

                    {/* Footer */}
                    <div className="mt-5 pt-4 border-t border-[#c9bfb4]/60 flex justify-between items-center">
                        <span className="text-[#4a3728]/60 text-xs font-medium">
                            Last 7 days
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;