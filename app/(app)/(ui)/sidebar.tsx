'use client';

import { api } from '@/lib/api';
import { Home, Users, UserPlus, Trophy, Settings, LogOut, Sparkles, CircleAlert } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Sidebar() {

    const router = useRouter();

    const [actions, setActions] = useState(false);

    useEffect(() => {
      (async ()=>{
        const res = await api.get("/self/actions")
        res.status == 200 && setActions(res.data.length > 0);
      })();
    }, []);

  const navItems = [
    { to: '/', icon: Home, label: 'Home', description: 'Overview & Statistics' },
    { to: '/actions', icon: CircleAlert, label: 'Actions', description: 'Raw Action solves all Things', highlight: actions },
    // { to: '/leads/contacted', icon: Users, label: 'Active Leads', description: 'In progress' },
    // { to: '/leaderboard', icon: Trophy, label: 'Leaderboard', description: 'Top performers' },
    // { to: '/settings', icon: Settings, label: 'Settings', description: 'Preferences' },
  ];

  return (
    <div className="w-72 bg-white dark:bg-black border-r-[.5px] border-gray-200 dark:border-neutral-900 h-screen flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-1">
          <img src="/logo.png" alt="Logo" className="h-10 aspect-square dark:invert" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">SwiftReach</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Professional Tax Evasion</p>
          </div>
        </div>
        
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label, description, highlight }) => (
          <Link
            key={to}
            href={to}
            className="group flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 hover:scale-[1.01]"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg transition-colors bg-gray-100 dark:bg-gray-900 group-hover:bg-gray-200 dark:group-hover:bg-gray-800">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{label}</span>
                <span className="text-xs transition-colors text-gray-500 dark:text-gray-400">
                  {description}
                </span>
              </div>
            </div>
            {highlight && (
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            )}
          </Link>
        ))}
      </nav>

      <div className="p-3">
        <button
          onClick={async () => {
            await api.post("/logout")
            localStorage.removeItem('user');
            router.refresh();
          }}
          className="flex items-center space-x-3 px-3 py-3 rounded-xl w-full text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 group"
        >
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 group-hover:bg-red-100 dark:group-hover:bg-red-950/50 transition-colors">
            <LogOut className="h-5 w-5" />
          </div>
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
