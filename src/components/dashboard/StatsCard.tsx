import React from 'react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  icon?: React.ReactNode
  className?: string
}

export function StatsCard({ title, value, change, icon, className }: StatsCardProps) {
  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mt-1">
            {value}
          </p>
          {change && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  'text-sm font-medium',
                  change.type === 'increase'
                    ? 'text-success-600 dark:text-success-400'
                    : 'text-error-600 dark:text-error-400'
                )}
              >
                {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
              </span>
              <span className="text-sm text-secondary-500 dark:text-secondary-400 ml-1">
                vs. letzter Monat
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 ml-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}