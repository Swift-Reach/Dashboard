'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, ListChecks, Target, Euro } from 'lucide-react';
import { api } from '@/lib/api';

interface Stats {
    score: number;
    actions: {
        completed: number;
        overdue: number;
    };
    leads: {
        progressed: number;
        closed: number;
        new?: number;
    };
}

export function StatsDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const now = new Date();
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            monthStart.setHours(0, 0, 0, 0);

            const res = await api.get('/self/stats', {
                params: {
                    start: monthStart.toISOString(),
                    end: now.toISOString()
                }
            });
            setStats(res.data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !stats) {
        return (
            <div className="mb-8 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 bg-white rounded-2xl border border-gray-200"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-md border border-teal-200 p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 animate-in fade-in zoom-in duration-500">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-teal-600 to-teal-500 rounded-xl shadow-md">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                        {loading ? '...' : stats?.leads?.progressed || 0}
                    </div>
                    <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
                        Processed Leads
                    </div>
                </div>

                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-md border border-blue-200 p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 animate-in fade-in zoom-in duration-500" style={{ animationDelay: '100ms' }}>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl shadow-md">
                            <ListChecks className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                        {loading ? '...' : stats?.actions?.completed || 0}
                    </div>
                    <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
                        Actions
                    </div>
                </div>

                <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-md border border-orange-200 p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 animate-in fade-in zoom-in duration-500" style={{ animationDelay: '200ms' }}>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl shadow-md">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                        {loading ? '...' : stats?.leads?.closed || 0}
                    </div>
                    <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
                        Closed
                    </div>
                </div>

                <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-md border border-emerald-200 p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 animate-in fade-in zoom-in duration-500" style={{ animationDelay: '300ms' }}>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-xl shadow-md">
                            <Euro className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                        {loading ? '...' : `€${((stats?.leads?.closed || 0) * 1000).toLocaleString()}`}
                    </div>
                    <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
                        Cut
                    </div>
                </div>
            </div>
        </div>
    );
}
