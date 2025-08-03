import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
          {label}
        </label>
      )}
      <input
        className={cn(
          'block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-secondary-800 dark:border-secondary-600 dark:text-secondary-100 dark:placeholder-secondary-500',
          error && 'border-error-500 focus:border-error-500 focus:ring-error-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
      )}
    </div>
  )
}