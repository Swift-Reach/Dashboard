'use client';

import { useEffect, useState } from 'react';
import { Star, TrendingUp, Award, Zap } from 'lucide-react';
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

      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
      setShowConfetti(false);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      <Confetti active={showConfetti} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className={`relative bg-gradient-to-br from-white via-yellow-50 to-orange-50 rounded-3xl shadow-2xl border-4 border-yellow-300 p-8 md:p-12 max-w-2xl w-full ${showContent ? 'animate-in zoom-in duration-500' : 'opacity-0'}`}>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-4 shadow-2xl animate-bounce-slow">
              <Award className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="text-center pt-6">
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 bg-clip-text mb-4 animate-pulse">
              LEVEL UP!
            </h2>

            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="text-center">
                <div className={`inline-block bg-gradient-to-br ${oldRank.color} text-white px-6 py-3 rounded-2xl shadow-lg mb-2 border-2 border-white/20`}>
                  <div className="flex items-center gap-2 justify-center mb-1">
                    {Array.from({ length: oldRank.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="text-2xl font-bold">{oldRank.name}</div>
                </div>
                <div className="text-sm text-gray-600 font-semibold">Level {oldLevel}</div>
              </div>

              <div className="flex flex-col items-center">
                <TrendingUp className="w-10 h-10 text-orange-500 animate-pulse" />
              </div>

              <div className="text-center">
                <div className={`inline-block bg-gradient-to-br ${newRank.color} text-white px-6 py-3 rounded-2xl shadow-2xl mb-2 border-4 border-yellow-400 animate-pulse`}>
                  <div className="flex items-center gap-2 justify-center mb-1">
                    {Array.from({ length: newRank.stars }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <div className="text-3xl font-black">{newRank.name}</div>
                </div>
                <div className="text-sm text-gray-600 font-semibold">Level {newLevel}</div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border-2 border-yellow-200 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-bold text-gray-800">New Rank Unlocked!</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Congratulations on reaching <span className="font-bold text-orange-600">{newRank.name}</span>!
                Keep crushing those actions to level up even further.
              </p>
            </div>

            <button
              onClick={onClose}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
