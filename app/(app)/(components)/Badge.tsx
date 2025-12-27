import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color: string;
  size?: 'sm' | 'md';
}

export function Badge({ children, color , size = 'md' }: BadgeProps) {

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${color} ${sizes[size]}`}>
      {children}
    </span>
  );
}
 