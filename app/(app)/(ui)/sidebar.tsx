'use client';

import { api } from '@/lib/api';
import { getRankInfo } from '@/lib/ranks';
import { Home, LogOut, CircleAlert, Flame, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Sidebar() {

    const router = useRouter();

    const [actions, setActions] = useState(false);
    const [stats, setStats] = useState<{
      score: number;
    } | null>(null);
    const [levelStats, setLevelStats] = useState<{
      level: number;
      currentLevelPoints: number;
      nextLevelPoints: number;
    } | null>(null);
    const [streak, setStreak] = useState<{
      current: number;
      streakStart: string | null;
      best: number;
    } | null>(null);

    useEffect(() => {
      (async ()=>{
        const res = await api.get("/self/actions")
        res.status == 200 && setActions(res.data.length > 0);
      })();

      (async ()=>{
        const res = await api.get("/self/stats")
        if (res.status == 200) {
          setStats(res.data);
        }
      })();

      (async ()=>{
        const res = await api.get("/self/stats/level")
        if (res.status == 200) {
          setLevelStats(res.data);
        }
      })();

      (async ()=>{
        const res = await api.get("/self/stats/streak")
        if (res.status == 200) {
          setStreak(res.data);
        }
      })();
    }, []);

  const navItems = [
    { to: '/', icon: Home, label: 'Home', description: 'Overview & Statistics', color: 'from-teal-600 to-teal-500' },
    { to: '/actions', icon: CircleAlert, label: 'Actions', description: 'Raw Action solves all Things', highlight: actions, color: 'from-orange-600 to-orange-500' },
    // { to: '/leads/contacted', icon: Users, label: 'Active Leads', description: 'In progress' },
    // { to: '/leaderboard', icon: Trophy, label: 'Leaderboard', description: 'Top performers' },
    // { to: '/settings', icon: Settings, label: 'Settings', description: 'Preferences' },
  ];

  return (
    <div className="w-72 bg-gradient-to-br from-white to-gray-50 border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-4 mb-2">
          <div className="p-2 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl shadow-lg">
            <img src="/logo.png" alt="Logo" className="h-8 aspect-square brightness-0 invert" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">SwiftReach</h1>
            <p className="text-xs text-gray-600 font-medium">Professional Tax Evasion</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map(({ to, icon: Icon, label, description, highlight, color }) => (
          <Link
            key={to}
            href={to}
            className="group relative bg-white hover:bg-gray-50 rounded-2xl shadow-sm hover:shadow-md border border-gray-200 transition-all duration-200 hover:scale-[1.02] flex items-center justify-between px-4 py-3.5 text-gray-800"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${color || 'from-gray-900 to-gray-700'} shadow-md group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">{label}</span>
                <span className="text-xs text-gray-600 font-medium">
                  {description}
                </span>
              </div>
            </div>
            {highlight && (
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500 blur-md opacity-50 rounded-full"></div>
                <div className="relative w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shadow-sm" />
              </div>
            )}
          </Link>
        ))}
      </nav>

      <div className="px-4 pb-6 space-y-3">
        {streak && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">Daily Streak</span>
              <div className="p-1 bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg">
                <Flame className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2 mb-3">
              <span className="text-5xl font-bold text-gray-900">
                {streak.current}
              </span>
              <span className="text-xl text-gray-500 font-medium">days</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 font-medium">
                Best: <span className="font-bold text-gray-900">{streak.best}</span> days
              </span>
              {streak.current > 0 && (
                <span className="text-orange-600 font-bold">
                  Keep going!
                </span>
              )}
            </div>
          </div>
        )}

        {levelStats && stats && (
          <div className={`bg-gradient-to-br ${getRankInfo(levelStats.level).gradient} rounded-2xl shadow-md border ${getRankInfo(levelStats.level).borderColor} p-5 hover:shadow-lg transition-shadow duration-200`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">Rank</span>
              <div className={`p-1 bg-gradient-to-br ${getRankInfo(levelStats.level).color} rounded-lg`}>
                <Star className="h-3 w-3 text-white fill-white" />
              </div>
            </div>
            <div className="mb-3">
              <div className={`inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-br ${getRankInfo(levelStats.level).color} shadow-md mb-2`}>
                <div className="flex items-center space-x-1 mr-2">
                  {Array.from({ length: getRankInfo(levelStats.level).stars }).map((_, i) => (
                    <Star key={i} className="h-2.5 w-2.5 text-white fill-white" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {getRankInfo(levelStats.level).name}
                </span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-5xl font-bold text-gray-900">
                  {stats.score}
                </span>
                <span className="text-xl text-gray-500 font-medium">pts</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${getRankInfo(levelStats.level).color} rounded-full transition-all duration-500 ease-out shadow-sm`}
                  style={{
                    width: `${Math.min(100, ((stats.score - levelStats.currentLevelPoints) / (levelStats.nextLevelPoints - levelStats.currentLevelPoints)) * 100)}%`
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 font-medium">
                  {stats.score - levelStats.currentLevelPoints} / {levelStats.nextLevelPoints - levelStats.currentLevelPoints}
                </span>
                <span className={`font-bold bg-gradient-to-r ${getRankInfo(levelStats.level).color} bg-clip-text text-transparent`}>
                  Level {levelStats.level}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <button
          onClick={async () => {
            await api.post("/logout")
            localStorage.removeItem('user');
            router.refresh();
          }}
          className="group relative bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 w-full overflow-hidden"
        >
          <div className="flex items-center space-x-3 px-4 py-3.5">
            <div className="p-2.5 rounded-xl bg-gray-900 shadow-md group-hover:scale-110 transition-transform duration-200">
              <LogOut className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-sm text-gray-900">Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
}
