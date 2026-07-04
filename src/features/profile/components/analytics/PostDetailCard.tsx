import AnalyticsService from "@/lib/api/analytics.service";
import { useEffect, useState } from "react";

type PostStats = {
    totalImpressions: number;
    uniqueViewers: number;
    avgViewsPerViewer: number;
    sourceBreakdown: Record<string, number>;
    timeBreakdown: { date: string; count: number }[];
};

const PostDetailCard = ({ postId, isDarkMode }: { postId: string; isDarkMode: boolean }) => {
    const [postStats, setPostStats] = useState<PostStats | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (isExpanded) {
            fetchPostStats();
        }
    }, [isExpanded, postId]);

    const fetchPostStats = async () => {
        try {
            const response = await AnalyticsService.getPostImpressionStats(postId);
            setPostStats(response.data);
        } catch (error) {
            console.error('Failed to fetch post stats:', error);
        }
    };

    return (
        <div className={`rounded-xl p-4 mb-3 border ${isDarkMode ? 'bg-slate-700/60' : 'bg-white/60'}`}>
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex-1">
                    <p className="font-semibold text-sm">Post ID: {postId}</p>
                    <p className="text-xs text-gray-500">
                        {postStats?.totalImpressions || '...'} impressions
                    </p>
                </div>
                <button className="text-sm">
                    {isExpanded ? '▲' : '▼'}
                </button>
            </div>

            {isExpanded && postStats && (
                <div className="mt-4 space-y-3">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2">
                        <div className="p-2 rounded bg-blue-50">
                            <p className="text-xs text-gray-600">Total Views</p>
                            <p className="text-lg font-bold text-blue-600">
                                {postStats.totalImpressions}
                            </p>
                        </div>
                        <div className="p-2 rounded bg-green-50">
                            <p className="text-xs text-gray-600">Unique Viewers</p>
                            <p className="text-lg font-bold text-green-600">
                                {postStats.uniqueViewers}
                            </p>
                        </div>
                        <div className="p-2 rounded bg-purple-50">
                            <p className="text-xs text-gray-600">Avg Views/User</p>
                            <p className="text-lg font-bold text-purple-600">
                                {postStats.avgViewsPerViewer}
                            </p>
                        </div>
                    </div>

                    {/* Source Breakdown */}
                    <div>
                        <p className="text-xs font-semibold mb-2">Traffic Sources</p>
                        <div className="space-y-1">
                            {Object.entries(postStats.sourceBreakdown).map(([source, count]) => (
                                <div key={source} className="flex justify-between text-xs">
                                    <span className="capitalize">{source}</span>
                                    <span className="font-semibold">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline Mini Chart */}
                    <div>
                        <p className="text-xs font-semibold mb-2">Daily Breakdown</p>
                        <div className="flex items-end gap-1 h-16">
                            {postStats.timeBreakdown.map((day, idx) => (
                                <div
                                    key={idx}
                                    className="flex-1 bg-blue-500 rounded-t"
                                    style={{
                                        height: `${(day.count / Math.max(...postStats.timeBreakdown.map(d => d.count))) * 100}%`
                                    }}
                                    title={`${day.date}: ${day.count}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};