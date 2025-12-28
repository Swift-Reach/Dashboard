export interface RankInfo {
  name: string;
  color: string;
  gradient: string;
  borderColor: string;
  stars: number;
}

const RANKS: Record<number, RankInfo> = {
  1: {
    name: 'Private',
    color: 'from-green-800 to-green-700',
    gradient: 'from-white to-green-50',
    borderColor: 'border-green-200',
    stars: 1,
  },
  2: {
    name: 'Corporal',
    color: 'from-green-700 to-green-600',
    gradient: 'from-white to-green-50',
    borderColor: 'border-green-300',
    stars: 2,
  },
  3: {
    name: 'Sergeant',
    color: 'from-green-600 to-green-500',
    gradient: 'from-white to-green-100',
    borderColor: 'border-green-400',
    stars: 3,
  },
  4: {
    name: 'Lieutenant',
    color: 'from-amber-700 to-amber-600',
    gradient: 'from-white to-amber-50',
    borderColor: 'border-amber-300',
    stars: 1,
  },
  5: {
    name: 'Captain',
    color: 'from-amber-600 to-amber-500',
    gradient: 'from-white to-amber-50',
    borderColor: 'border-amber-400',
    stars: 2,
  },
  6: {
    name: 'Major',
    color: 'from-amber-500 to-yellow-500',
    gradient: 'from-white to-amber-100',
    borderColor: 'border-amber-500',
    stars: 3,
  },
  7: {
    name: 'Colonel',
    color: 'from-blue-700 to-blue-600',
    gradient: 'from-white to-blue-50',
    borderColor: 'border-blue-300',
    stars: 1,
  },
  8: {
    name: 'General',
    color: 'from-blue-600 to-blue-500',
    gradient: 'from-white to-blue-100',
    borderColor: 'border-blue-400',
    stars: 4,
  },
  9: {
    name: 'Marshal',
    color: 'from-purple-700 to-purple-600',
    gradient: 'from-white to-purple-50',
    borderColor: 'border-purple-400',
    stars: 5,
  },
  10: {
    name: 'Supreme Commander',
    color: 'from-red-700 to-red-600',
    gradient: 'from-white to-red-50',
    borderColor: 'border-red-400',
    stars: 5,
  },
};

export function getRankInfo(level: number): RankInfo {
  if (level <= 0) {
    return RANKS[1];
  }

  if (level > 10) {
    return RANKS[10];
  }

  return RANKS[level] || RANKS[1];
}
