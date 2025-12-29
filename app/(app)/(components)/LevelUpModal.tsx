'use client';

import { useEffect, useState } from 'react';
import { Star, TrendingUp, Award } from 'lucide-react';
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
      setTimeout(() => setShowContent(true), 300);
    } else {
      setShowContent(false);
      setShowConfetti(false);
    }
  }, [show]);

  if (!show) return null;

  return (
    <>
      <Confetti active={showConfetti} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
        <div className={`relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg w-full ${showContent ? 'animate-in zoom-in duration-500' : 'opacity-0'}`}>
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="bg-emerald-500 rounded-full p-4 shadow-xl">
              <Award className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="text-center pt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Level Up!
            </h2>
            <p className="text-gray-600 mb-8">You reached a new level</p>

            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-sm text-gray-500 font-medium mb-2">Level {oldLevel}</div>
                <div className={`inline-flex items-center gap-1.5 bg-gradient-to-br ${oldRank.color} text-white px-4 py-2 rounded-lg shadow-md`}>
                  {Array.from({ length: oldRank.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <div className="text-xs text-gray-700 font-semibold mt-2">{oldRank.name}</div>
              </div>

              <TrendingUp className="w-6 h-6 text-emerald-500" />

              <div className="text-center">
                <div className="text-sm text-gray-500 font-medium mb-2">Level {newLevel}</div>
                <div className={`inline-flex items-center gap-1.5 bg-gradient-to-br ${newRank.color} text-white px-5 py-2.5 rounded-lg shadow-lg ring-2 ring-emerald-500 ring-offset-2`}>
                  {Array.from({ length: newRank.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-sm text-gray-900 font-bold mt-2">{newRank.name}</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">
                Congratulations on reaching <span className="font-semibold text-gray-900">{newRank.name}</span>. Keep completing actions to advance further.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
