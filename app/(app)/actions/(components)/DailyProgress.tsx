'use client';

import { Flame, Zap } from 'lucide-react';

interface DailyProgressProps {
  earnedScore: number;
}

export function DailyProgress({ earnedScore }: DailyProgressProps) {

  const todayGoal = 50;

  const progressToGoal = Math.min(100, (earnedScore / todayGoal) * 100);

  return (
    <div className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl shadow-lg border border-yellow-200 p-6 mb-6 opacity-0 animate-fade-in-down" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-md">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Daily Goal</h3>
            <p className="text-gray-600 font-medium">
              Earn {todayGoal} points today
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            {earnedScore}/{todayGoal}
          </div>
          <div className="text-sm text-gray-600 font-semibold">Points</div>
        </div>
      </div>

      <div className="relative">
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
            style={{ width: `${progressToGoal}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-loading"></div>
          </div>
        </div>

        {progressToGoal >= 100 && (
          <div className="absolute -top-1 right-0 flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce-slow">
            <Zap className="w-4 h-4" />
            Goal Reached!
          </div>
        )}
      </div>

      {progressToGoal >= 100 && (
        <div className="mt-4 text-center">
          <p className="text-lg font-bold text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text">
            🎉 Amazing! You've reached your daily goal! 🎉
          </p>
        </div>
      )}

      {progressToGoal < 100 && progressToGoal >= 66 && (
        <div className="mt-4 text-center">
          <p className="text-sm font-semibold text-gray-700">
            🔥 You&apos;re so close! Just {todayGoal - earnedScore} more points to go!
          </p>
        </div>
      )}
    </div>
  );
}
