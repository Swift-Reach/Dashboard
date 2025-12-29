'use client';

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface FloatingPointsProps {
  points: number;
  active: boolean;
  onComplete?: () => void;
}

export function FloatingPoints({ points, active, onComplete }: FloatingPointsProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (active) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        if (onComplete) onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
      <div className="animate-float-up-fade">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-2xl border-4 border-white/30 flex items-center gap-3 transform scale-110">
          <Sparkles className="w-8 h-8 animate-pulse" />
          <span className="text-4xl font-black">+{points}</span>
          <span className="text-2xl font-bold">Points</span>
        </div>
      </div>
    </div>
  );
}
