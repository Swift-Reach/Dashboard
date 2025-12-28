'use client';

import { useEffect, useState } from 'react';
import { Plus, TriangleAlert, Clock, ListChecks, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { AxiosError } from 'axios';
import { sameDay } from '@/lib/utils';
import { ActionCard } from './(components)/ActionCard';
import { StatsDashboard } from './(components)/StatsDashboard';
import { DailyProgress } from './(components)/DailyProgress';

export default function ActionQueue() {
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [actions, setActions] = useState<Action[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [todayScore, setTodayScore] = useState<number>(0);
    const [hasAvailableActions, setHasAvailableActions] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const [actionsRes, statsRes, availableRes] = await Promise.all([
                    api.get("/self/actions"),
                    api.get('/self/stats', {
                        params: {
                            start: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
                        }
                    }),
                    api.get('/self/actions/available')
                ]);

                const actions: Action[] = actionsRes.data.map((a: any) => ({ ...a, due: new Date(a.due) }));

                const grouped = actions.reduce((groups: any[], a: Action) => {
                    const group = groups.find((g: any) => sameDay(g[0].due, a.due));
                    if (group) group.push(a);
                    else groups.push([a]);
                    return groups;
                }, []);

                grouped.forEach(g => {
                    g.sort((a: Action, b: Action) => {
                        const priorityOrder: any = { 'High': 0, 'Medium': 1, 'Low': 2 };
                        return priorityOrder[a.priority] - priorityOrder[b.priority];
                    });
                });

                grouped.sort((a: Action[], b: Action[]) => a[0].due.getTime() - b[0].due.getTime());

                setActions(grouped.flat());
                setTodayScore(statsRes.data.score || 0);
                setHasAvailableActions(availableRes.data.length > 0);
                setLoading(false);
            } catch (e) {
                if (e instanceof AxiosError) setError(e.response?.data?.error);
                else {
                    setError("An unknown error occurred!");
                    console.error("Failed to fetch next action", e);
                }
                setLoading(false);
            }
        })();
    }, []);


    const handleNextAction = async () => {
        try {
            const res = await api.get("/self/actions/next");
            const action: Action = { ...res.data, due: new Date(res.data.due) };
            router.push(`/actions/${action.id}`);
        } catch (e) {
            if (e instanceof AxiosError) setError(e.response?.data?.error);
            else {
                setError("An unknown error occurred!");
                console.error("Failed to fetch next action", e);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 animate-in fade-in slide-in-from-top duration-500">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                                    Action Queue
                                </h1>
                                <div className="px-4 py-1.5 bg-gradient-to-r from-gray-900 to-gray-700 text-white text-sm font-semibold rounded-full shadow-md animate-pulse">
                                    {actions.length}
                                </div>
                            </div>
                            <p className="text-gray-600 text-lg font-medium">
                                Complete actions, earn points, level up! 🚀
                            </p>
                        </div>

                        <button
                            onClick={handleNextAction}
                            disabled={loading || !hasAvailableActions}
                            className="group relative bg-gradient-to-br from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 overflow-hidden disabled:cursor-not-allowed disabled:opacity-60 hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                            <div className="relative px-6 py-4 flex items-center gap-3">
                                <Sparkles className="w-5 h-5" />
                                <span className="font-bold">
                                    {loading ? 'Loading...' : 'Start Next Action'}
                                </span>
                            </div>
                        </button>
                    </div>
                </div>

                <StatsDashboard />

                {!loading && <DailyProgress earnedScore={todayScore} /> }

                {error && (
                    <div className="bg-gradient-to-r from-red-50 to-white border border-red-300 rounded-2xl p-5 mb-6 shadow-md animate-in fade-in slide-in-from-top duration-300">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-red-600 to-red-500 rounded-lg">
                                <TriangleAlert className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-gray-900 font-medium">{error}</p>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div
                                key={i}
                                className="bg-white rounded-3xl h-32 animate-pulse border border-gray-200 shadow-sm"
                            />
                        ))}
                    </div>
                ) : actions.length === 0 ? (
                    <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-xl border-2 border-green-200 p-16 text-center animate-in fade-in zoom-in duration-500">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                                <ListChecks className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">All Caught Up!</h2>
                            <p className="text-gray-600 text-lg mb-4">
                                You have no pending actions. Great work!
                            </p>
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-full font-bold shadow-md">
                                <Sparkles className="w-5 h-5" />
                                <span>You're crushing it!</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Your Queue</h2>
                            <div className="text-sm text-gray-600 font-medium">
                                {actions.length} action{actions.length !== 1 ? 's' : ''} remaining
                            </div>
                        </div>
                        <div className="space-y-4">
                            {actions.map((action, index) => (
                                <div
                                    key={action.id}
                                    className="animate-in fade-in slide-in-from-bottom duration-500"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <ActionCard action={action} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
