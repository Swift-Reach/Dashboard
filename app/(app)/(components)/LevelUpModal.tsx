'use client';

import { useEffect, useState } from 'react';
import { Star, TrendingUp, Trophy } from 'lucide-react';
import { getRankInfo } from '@/lib/ranks';
import { Confetti } from './Confetti';

interface LevelUpModalProps {
  oldLevel: number;
  newLevel: number;
  show: boolean;
  onClose: () => void;
}

export function LevelUpModal({ oldLevel, newLevel, show, onClose }: LevelUpModalProps) {
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const oldRank = getRankInfo(oldLevel);
  const newRank = getRankInfo(newLevel);

  useEffect(() => {
    if (show) {
      setShowConfetti(true);
      setShowContent(false);
      setTimeout(() => setShowContent(true), 100);
    } else {
      setShowContent(false);
      setShowConfetti(false);
    }
  }, [show]);

  if (!show) return null;

  return (
    <>
      <Confetti active={showConfetti} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`relative bg-white rounded-2xl shadow-2xl max-w-lg w-full transition-all duration-500 ${showContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 rounded-t-2xl px-8 py-10 text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4 ring-4 ring-white/30">
                <Trophy className="w-12 h-12 text-white" strokeWidth={2} />
              </div>

              <h2 className="text-3xl font-bold mb-2">
                Level Up!
              </h2>
              <p className="text-blue-100 text-lg">
                Reached Level {newLevel}
              </p>
            </div>
          </div>

          <div className="px-8 py-8">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="text-center flex-1">
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">From</div>
                <div className={`inline-flex items-center justify-center gap-1.5 bg-gradient-to-br ${oldRank.color} text-white px-4 py-2.5 rounded-lg shadow-md`}>
                  {Array.from({ length: oldRank.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" strokeWidth={0} />
                  ))}
                </div>
                <div className="text-sm font-semibold text-gray-900 mt-2">{oldRank.name}</div>
                <div className="text-xs text-gray-500">Level {oldLevel}</div>
              </div>

              <div className="flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-blue-500" strokeWidth={2.5} />
              </div>

              <div className="text-center flex-1">
                <div className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-3">To</div>
                <div className={`inline-flex items-center justify-center gap-1.5 bg-gradient-to-br ${newRank.color} text-white px-5 py-3 rounded-lg shadow-lg ring-2 ring-blue-500 ring-offset-2`}>
                  {Array.from({ length: newRank.stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" strokeWidth={0} />
                  ))}
                </div>
                <div className="text-base font-bold text-gray-900 mt-2">{newRank.name}</div>
                <div className="text-xs text-gray-500">Level {newLevel}</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 mb-6 border border-blue-200">
              <p className="text-sm text-gray-700 text-center leading-relaxed">
                Congratulations! You have reached the <span className="font-bold text-blue-700">{newRank.name}</span> rank. Keep completing actions to advance further!
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
