'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/features/profile/hooks/useProfile';
import config from '@/config/env.config';
import { ChartMetric, TimeRange } from '@/features/company/types';
import api from '@/lib/api/api.intance';
import MetricsGrid from '@/features/company/components/analysis/MetricsGrid';
import AnalyticsChart from '@/features/company/components/analysis/AnalyticsChart';
import TopPosts from '@/features/company/components/analysis/TopPosts';
import AudienceInsights from '@/features/company/components/analysis/AudienceInsights';

export default function AnalyticsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const {
    userProfileData,
    isLoadingProfile,
    loadProfile
  } = useProfile();

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  // // console.log('👤 [SETUP_PAGE] Current User:', user);
  console.log('👤 [SETUP_PAGE] User Profile Data:', userProfileData?.companyId);

  const companyId = userProfileData?.companyId;

  const [activeChart, setActiveChart] = useState<ChartMetric>('impressions');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [isLoading, setIsLoading] = useState(true);

  // Real data states
  const [metrics, setMetrics] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [topPosts, setTopPosts] = useState<any[]>([]);
  const [dashboardV2, setDashboardV2] = useState<any>(null);

  const daysMap: Record<TimeRange, number> = {
    '7d': 7,
    '30d': 30,
    '90d': 90,
  };

  useEffect(() => {
    if (!companyId) return;
    fetchAnalytics();
  }, [companyId, timeRange]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const days = daysMap[timeRange];  

      const [dashV2Res, monthlyRes, topPostsRes] = await Promise.all([
        api.get(`${config.NEXT_PUBLIC_COMPANY_ANALYTICS_DASHBOARD_V2_ENDPOINT || process.env.NEXT_PUBLIC_COMPANY_ANALYTICS_DASHBOARD_V2_ENDPOINT }`, {
          params: { companyId, days }
        }),
        api.get(`${config.NEXT_PUBLIC_COMPANY_ANALYTICS_COMPANY_ENDPOINT || process.env.NEXT_PUBLIC_COMPANY_ANALYTICS_COMPANY_ENDPOINT }/${companyId}/monthly`),
        api.get(`${config.NEXT_PUBLIC_COMPANY_ANALYTICS_TOP_POSTS_ENDPOINT || process.env.NEXT_PUBLIC_COMPANY_ANALYTICS_TOP_POSTS_ENDPOINT }`, {
          params: { companyId, days, limit: 5 }
        }),
      ]);

      console.log("full logs of analyses=>", dashV2Res, monthlyRes, topPostsRes)

      const v2 = dashV2Res.data?.data;
      setDashboardV2(v2);

      // MetricsGrid ke liye format
      setMetrics([
        {
          label: 'Search Appearances',
          value: v2?.summary?.searchAppearances ?? 0,
          growth: 0,
        },
        {
          label: 'Unique Search Users',
          value: v2?.summary?.uniqueSearchUsers ?? 0,
          growth: 0,
        },
        {
          label: 'Page Views',
          value: v2?.summary?.pageViews ?? 0,
          growth: 0,
        },
        {
          label: 'Post Impressions',
          value: v2?.summary?.postImpressions ?? 0,
          growth: 0,
        },
      ]);

      // AnalyticsChart ke liye monthly data format
      const monthly = monthlyRes.data?.data || [];
      const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const formattedChart = monthly.map((item: any) => ({
        label: `${MONTH_NAMES[(item.month ?? 1) - 1]} ${item.year ?? ''}`,
        views: item.totalPostsViews ?? 0,
        impressions: item.totalPageViews ?? 0,
        followers: item.followersGained ?? 0,
      }));
      setChartData(formattedChart);

      // TopPosts format
      const posts = topPostsRes.data?.data || [];
      const formattedPosts = posts.map((p: any, i: number) => ({
        id: p.postId || String(i),
        title: p.title || 'Untitled',
        views: p.totalViews ?? 0,
        engagementRate: p.totalEngagement ?? 0,
      }));
      setTopPosts(formattedPosts);

    } catch (err) {
      console.error('❌ Analytics fetch failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredChartData = useMemo(() => {
    if (!chartData.length) return [];
    switch (timeRange) {
      case '7d': return chartData.slice(-3);
      case '30d': return chartData.slice(-6);
      case '90d': return chartData;
      default: return chartData;
    }
  }, [chartData, timeRange]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-[#d4c4b5] border-t-[#4a3728] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MetricsGrid metrics={metrics} />

      <div className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-[#4a3728]">Performance Over Time</h3>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-[#e0d8cf]/50 rounded-xl p-1">
              {(['impressions', 'views', 'followers'] as const).map((c) => (
                <button key={c} onClick={() => setActiveChart(c)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition
                  ${activeChart === c ? 'bg-[#4a3728] text-[#f6ede8]' : 'text-[#4a3728]/60 hover:text-[#4a3728]'}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="flex gap-1 bg-[#e0d8cf]/50 rounded-xl p-1">
              {(['7d', '30d', '90d'] as TimeRange[]).map((range) => (
                <button key={range} onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg uppercase transition
                  ${timeRange === range ? 'bg-[#4a3728] text-[#f6ede8]' : 'text-[#4a3728]/60 hover:text-[#4a3728]'}`}>
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
        <AnalyticsChart activeChart={activeChart} data={filteredChartData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopPosts posts={topPosts} />
        {/* AudienceInsights ke liye abhi backend data nahi hai, placeholder rakhte hain */}
        <AudienceInsights location={[]} industry={[]} />
      </div>
    </div>
  );
}
