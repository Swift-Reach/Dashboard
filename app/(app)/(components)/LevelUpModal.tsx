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

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
        <div className={`relative bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden ${showContent ? 'animate-in zoom-in duration-500' : 'opacity-0'}`}>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-8 pt-10 pb-8 border-b border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-500 rounded-full p-3">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">
              Level Up!
            </h2>
            <p className="text-sm text-gray-600 text-center">
              You've reached level {newLevel}
            </p>
          </div>

          <div className="px-8 py-6">
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 font-medium mb-1.5">Previous</div>
                  <div className="flex items-center gap-2">
                    <div className={`inline-flex items-center gap-1 bg-gradient-to-br ${oldRank.color} text-white px-3 py-1.5 rounded-md text-sm font-medium`}>
                      {Array.from({ length: oldRank.stars }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-gray-900">{oldRank.name}</span>
                      <span className="text-xs text-gray-500">Level {oldLevel}</span>
                    </div>
                  </div>
                </div>

                <TrendingUp className="w-5 h-5 text-blue-500 mx-3" />

                <div className="flex-1">
                  <div className="text-xs text-blue-600 font-medium mb-1.5">New Rank</div>
                  <div className="flex items-center gap-2">
                    <div className={`inline-flex items-center gap-1 bg-gradient-to-br ${newRank.color} text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-md`}>
                      {Array.from({ length: newRank.stars }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">{newRank.name}</span>
                      <span className="text-xs text-gray-500">Level {newLevel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
              <p className="text-sm text-gray-700 text-center">
                You've unlocked the <span className="font-semibold text-blue-700">{newRank.name}</span> rank. Keep going to reach even higher levels!
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
