'use client';

import React, { useEffect, useState } from 'react';
import { X, Search, TrendingUp, Calendar, Hash } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import AnalyticsService from '@/lib/api/analytics.service';

interface SearchAppearancesModalProps {
    isOpen: boolean;
    onClose: () => void;
    analytics: any;
}

// Dummy search data
const dummySearchData = [
    {
        id: 1,
        searchTerm: 'Product Manager',
        count: 45,
        date: '2024-01-20',
        time: '10:30 AM',
        highlighted: true
    },
    {
        id: 2,
        searchTerm: 'Tech Lead India',
        count: 32,
        date: '2024-01-19',
        time: '2:45 PM',
        highlighted: false
    },
    {
        id: 3,
        searchTerm: 'Software Engineer',
        count: 28,
        date: '2024-01-18',
        time: '11:15 AM',
        highlighted: true
    },
    {
        id: 4,
        searchTerm: 'Startup Founder',
        count: 22,
        date: '2024-01-17',
        time: '4:20 PM',
        highlighted: false
    },
    {
        id: 5,
        searchTerm: 'Full Stack Developer',
        count: 19,
        date: '2024-01-16',
        time: '9:00 AM',
        highlighted: true
    },
    {
        id: 6,
        searchTerm: 'UI/UX Designer',
        count: 15,
        date: '2024-01-15',
        time: '3:30 PM',
        highlighted: false
    },
    {
        id: 7,
        searchTerm: 'Business Analyst',
        count: 12,
        date: '2024-01-14',
        time: '1:45 PM',
        highlighted: false
    },
    {
        id: 8,
        searchTerm: 'Data Scientist',
        count: 10,
        date: '2024-01-13',
        time: '5:00 PM',
        highlighted: true
    }
];

const generateSearchGraphData = (days: number) => {
    const labels = [];
    const searches = [];

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        searches.push(Math.floor(Math.random() * 30) + 5);
    }

    return { labels, searches };
};

const SearchAppearancesModal: React.FC<SearchAppearancesModalProps> = ({
    isOpen,
    onClose,
    analytics
}) => {
    const [timeRange, setTimeRange] = useState<7 | 30 | 90>(30);
    const [filterType, setFilterType] = useState<'all' | 'highlighted'>('all');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customDays, setCustomDays] = useState('');

    const [searchHistory, setSearchHistory] = useState<any[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadSearchHistory();
        }
    }, [isOpen, timeRange]);

    const loadSearchHistory = async () => {
        try {
            setIsLoadingHistory(true);
            const response = await AnalyticsService.getSearchAppearancesDetail(1, 50);

            // Group by search query and count
            const grouped = response.data.appearances.reduce((acc: any, item: any) => {
                const query = item.searchQuery;
                if (!acc[query]) {
                    acc[query] = {
                        searchTerm: query,
                        count: 0,
                        dates: [],
                        highlighted: item.wasClicked // Use actual click data
                    };
                }
                acc[query].count++;
                acc[query].dates.push(item.appearedAt);
                return acc;
            }, {});

            const searchData = Object.values(grouped).sort((a: any, b: any) => b.count - a.count);
            setSearchHistory(searchData);
        } catch (error) {
            console.error('Failed to load search history:', error);
        } finally {
            setIsLoadingHistory(false);
        }
    };

    if (!isOpen) return null;

    const graphData = generateSearchGraphData(timeRange);
    const filteredSearches = filterType === 'all'
        ? dummySearchData
        : dummySearchData.filter(s => s.highlighted);

    const chartData = {
        labels: graphData.labels,
        datasets: [
            {
                label: 'Search Appearances',
                data: graphData.searches,
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#8b5cf6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#4a3728',
                padding: 12,
                borderRadius: 8,
                titleColor: '#f6ede8',
                bodyColor: '#f6ede8'
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#7a5c3e',
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(122, 92, 62, 0.1)'
                },
                ticks: {
                    color: '#7a5c3e',
                    font: {
                        size: 11
                    }
                }
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#f6ede8] rounded-3xl shadow-2xl border border-[#e0d8cf] max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Search className="w-8 h-8 text-white" />
                        <div>
                            <h2 className="text-2xl font-bold text-white">Search Appearances</h2>
                            <p className="text-sm text-white/80">
                                Total Appearances: <span className="font-bold">{analytics?.searchAppearances?.total || 0}</span>
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Graph Controls */}
                    <div className="mb-6 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-[#4a3728]">Appearances Over Time</h3>
                        <div className="flex gap-2 items-center">
                            {[7, 30, 90].map((days) => (
                                <button
                                    key={days}
                                    onClick={() => {
                                        setTimeRange(days as 7 | 30 | 90);
                                        setShowCustomInput(false);
                                    }}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${timeRange === days && !showCustomInput
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-[#e0d8cf] text-[#7a5c3e] hover:bg-[#d4c4b5]'
                                        }`}
                                >
                                    {days} days
                                </button>
                            ))}

                            {/* Custom Days Button */}
                            <button
                                onClick={() => setShowCustomInput(!showCustomInput)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${showCustomInput
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-[#e0d8cf] text-[#7a5c3e] hover:bg-[#d4c4b5]'
                                    }`}
                            >
                                Custom
                            </button>

                            {/* Custom Input Field */}
                            {showCustomInput && (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        min="1"
                                        max="365"
                                        value={customDays}
                                        onChange={(e) => setCustomDays(e.target.value)}
                                        placeholder="Days"
                                        className="w-20 px-3 py-2 rounded-lg border border-[#e0d8cf] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-[#4a3728]"
                                    />
                                    <button
                                        onClick={() => {
                                            const days = parseInt(customDays);
                                            if (days > 0 && days <= 365) {
                                                setTimeRange(days as any);
                                            }
                                        }}
                                        className="px-3 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-all"
                                    >
                                        Apply
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Graph */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#e0d8cf] mb-6">
                        <div style={{ height: '250px' }}>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 shadow border border-[#e0d8cf]">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-5 h-5 text-purple-500" />
                                <span className="text-sm text-[#7a5c3e]">Last 7 Days</span>
                            </div>
                            <p className="text-2xl font-bold text-[#4a3728]">
                                {analytics?.searchAppearances?.last7Days || 0}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow border border-[#e0d8cf]">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-5 h-5 text-purple-500" />
                                <span className="text-sm text-[#7a5c3e]">Last 30 Days</span>
                            </div>
                            <p className="text-2xl font-bold text-[#4a3728]">
                                {analytics?.searchAppearances?.last30Days || 0}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow border border-[#e0d8cf]">
                            <div className="flex items-center gap-2 mb-2">
                                <Hash className="w-5 h-5 text-purple-500" />
                                <span className="text-sm text-[#7a5c3e]">Highlighted</span>
                            </div>
                            <p className="text-2xl font-bold text-[#4a3728]">
                                {dummySearchData.filter(s => s.highlighted).length}
                            </p>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="mb-4 flex gap-2">
                        <button
                            onClick={() => setFilterType('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterType === 'all'
                                ? 'bg-purple-500 text-white'
                                : 'bg-[#e0d8cf] text-[#7a5c3e] hover:bg-[#d4c4b5]'
                                }`}
                        >
                            All Searches
                        </button>
                        <button
                            onClick={() => setFilterType('highlighted')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterType === 'highlighted'
                                ? 'bg-purple-500 text-white'
                                : 'bg-[#e0d8cf] text-[#7a5c3e] hover:bg-[#d4c4b5]'
                                }`}
                        >
                            Highlighted Only
                        </button>
                    </div>

                    {/* Search History */}
                    <div>
                        <h3 className="text-xl font-bold text-[#4a3728] mb-4">
                            Search Terms
                        </h3>
                        <div className="space-y-3">
                            {filteredSearches.map((search) => (
                                <div
                                    key={search.id}
                                    className="bg-white rounded-xl p-4 shadow border border-[#e0d8cf] hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                                <Search className="w-6 h-6 text-purple-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-[#4a3728]">{search.searchTerm}</h4>
                                                    {search.highlighted && (
                                                        <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full">
                                                            ⭐ Highlighted
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-[#7a5c3e]">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {search.date}
                                                    </span>
                                                    <span>{search.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-purple-600">{search.count}</p>
                                            <p className="text-xs text-[#7a5c3e]">appearances</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchAppearancesModal;