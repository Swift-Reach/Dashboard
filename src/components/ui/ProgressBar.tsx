import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  label?: string
}

export function ProgressBar({ 
  value, 
  max = 100, 
  className, 
  showLabel = false, 
  label 
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="text-sm text-secondary-500 dark:text-secondary-400">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className="w-full bg-secondary-200 rounded-full h-2 dark:bg-secondary-700">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}