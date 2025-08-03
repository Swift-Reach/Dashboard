import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'
  
  const variants = {
    default: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-200',
    success: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200',
    warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200',
    error: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200',
    info: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
  }
  
  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span className={cn(baseClasses, variants[variant], sizes[size], className)}>
      {children}
    </span>
  )
}