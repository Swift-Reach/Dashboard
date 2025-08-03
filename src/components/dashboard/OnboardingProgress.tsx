import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Check, Clock, AlertCircle } from 'lucide-react'
import { OnboardingStep } from '@/types'
import { cn } from '@/lib/utils'

interface OnboardingProgressProps {
  steps: OnboardingStep[]
  customerName: string
}

export function OnboardingProgress({ steps, customerName }: OnboardingProgressProps) {
  const sortedSteps = steps.sort((a, b) => a.step_order - b.step_order)
  const completedSteps = steps.filter(step => step.status === 'completed').length
  const totalSteps = steps.length
  const progress = (completedSteps / totalSteps) * 100

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4 text-success-600" />
      case 'in_progress':
        return <Clock className="w-4 h-4 text-warning-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-secondary-400" />
    }
  }

  const getStepBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'in_progress':
        return 'warning'
      default:
        return 'default'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding-Fortschritt</CardTitle>
        <p className="text-sm text-secondary-600 dark:text-secondary-400">
          {customerName} • {completedSteps} von {totalSteps} Schritten abgeschlossen
        </p>
      </CardHeader>
      <CardContent>
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
              Fortschritt
            </span>
            <span className="text-sm text-secondary-500 dark:text-secondary-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2 dark:bg-secondary-700">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {sortedSteps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-4">
              {/* Step Number/Icon */}
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors',
                  step.status === 'completed'
                    ? 'bg-success-100 border-success-500 dark:bg-success-900'
                    : step.status === 'in_progress'
                    ? 'bg-warning-100 border-warning-500 dark:bg-warning-900'
                    : 'bg-secondary-100 border-secondary-300 dark:bg-secondary-800 dark:border-secondary-600'
                )}
              >
                {step.status === 'completed' ? (
                  <Check className="w-4 h-4 text-success-600 dark:text-success-400" />
                ) : (
                  <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                    {step.step_name}
                  </p>
                  <Badge variant={getStepBadgeVariant(step.status)} size="sm">
                    {step.status === 'completed' && 'Abgeschlossen'}
                    {step.status === 'in_progress' && 'In Bearbeitung'}
                    {step.status === 'pending' && 'Ausstehend'}
                  </Badge>
                </div>
                {step.completed_at && (
                  <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                    Abgeschlossen am {new Date(step.completed_at).toLocaleDateString('de-DE')}
                  </p>
                )}
              </div>

              {/* Connector Line */}
              {index < sortedSteps.length - 1 && (
                <div className="absolute left-4 mt-8 w-0.5 h-4 bg-secondary-200 dark:bg-secondary-700" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}