import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { User, Building, Mail, Phone } from 'lucide-react'
import { mockCustomers, mockOnboardingSteps } from '@/data/mockData'
import { getInitials } from '@/lib/utils'

export function Customers() {
  const getCustomerOnboardingProgress = (customerId: string) => {
    const steps = mockOnboardingSteps.filter(step => step.customer_id === customerId)
    if (steps.length === 0) return 100 // No onboarding steps means fully onboarded
    
    const completedSteps = steps.filter(step => step.status === 'completed').length
    return (completedSteps / steps.length) * 100
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'onboarding':
        return 'warning'
      case 'inactive':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktiv'
      case 'onboarding':
        return 'Onboarding'
      case 'inactive':
        return 'Inaktiv'
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
          Kunden
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Übersicht über alle Ihre Kunden und deren Onboarding-Status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCustomers.map((customer) => {
          const onboardingProgress = getCustomerOnboardingProgress(customer.id)
          
          return (
            <Card key={customer.id} className="hover:shadow-md transition-shadow">
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                        {getInitials(customer.name)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 dark:text-secondary-100">
                        {customer.name}
                      </h3>
                      {customer.company && (
                        <p className="text-sm text-secondary-600 dark:text-secondary-400">
                          {customer.company}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(customer.status)} size="sm">
                    {getStatusLabel(customer.status)}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-secondary-600 dark:text-secondary-400">
                    <Mail className="w-4 h-4" />
                    <span>{customer.email}</span>
                  </div>
                  
                  {customer.phone && (
                    <div className="flex items-center space-x-2 text-sm text-secondary-600 dark:text-secondary-400">
                      <Phone className="w-4 h-4" />
                      <span>{customer.phone}</span>
                    </div>
                  )}

                  {customer.status === 'onboarding' && (
                    <div className="pt-3 border-t border-secondary-200 dark:border-secondary-700">
                      <ProgressBar
                        value={onboardingProgress}
                        label="Onboarding-Fortschritt"
                        showLabel
                      />
                    </div>
                  )}

                  <div className="pt-3 border-t border-secondary-200 dark:border-secondary-700">
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      Kunde seit {new Date(customer.created_at).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}