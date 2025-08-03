import React from 'react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { OnboardingProgress } from '@/components/dashboard/OnboardingProgress'
import { NextAppointment } from '@/components/dashboard/NextAppointment'
import { Users, TrendingUp, DollarSign, Calendar } from 'lucide-react'
import { 
  mockDashboardStats, 
  mockOnboardingSteps, 
  mockAppointments, 
  mockCustomers 
} from '@/data/mockData'
import { formatCurrency, formatNumber } from '@/lib/utils'

export function Overview() {
  const nextAppointment = mockAppointments
    .filter(apt => apt.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] || null

  const onboardingCustomer = mockCustomers.find(customer => customer.status === 'onboarding')
  const customerOnboardingSteps = mockOnboardingSteps.filter(
    step => step.customer_id === onboardingCustomer?.id
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
          Übersicht
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Willkommen zurück! Hier ist ein Überblick über Ihre aktuellen Aktivitäten.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Aktive Kunden"
          value={mockDashboardStats.activeCustomers}
          change={{ value: 12.5, type: 'increase' }}
          icon={<Users className="w-6 h-6 text-primary-600" />}
        />
        
        <StatsCard
          title="Aktive Kampagnen"
          value={mockDashboardStats.activeCampaigns}
          change={{ value: 8.2, type: 'increase' }}
          icon={<TrendingUp className="w-6 h-6 text-primary-600" />}
        />
        
        <StatsCard
          title="Durchschnittlicher ROAS"
          value={`${mockDashboardStats.averageRoas.toFixed(1)}x`}
          change={{ value: 15.3, type: 'increase' }}
          icon={<DollarSign className="w-6 h-6 text-primary-600" />}
        />
        
        <StatsCard
          title="Anstehende Termine"
          value={mockDashboardStats.upcomingAppointments}
          icon={<Calendar className="w-6 h-6 text-primary-600" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Appointment */}
        <NextAppointment appointment={nextAppointment} />

        {/* Onboarding Progress */}
        {onboardingCustomer && customerOnboardingSteps.length > 0 && (
          <OnboardingProgress
            steps={customerOnboardingSteps}
            customerName={onboardingCustomer.name}
          />
        )}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title="Gesamtausgaben (Monat)"
          value={formatCurrency(mockDashboardStats.totalSpent)}
          change={{ value: 5.7, type: 'increase' }}
        />
        
        <StatsCard
          title="Gesamtumsatz (Monat)"
          value={formatCurrency(mockDashboardStats.totalRevenue)}
          change={{ value: 18.9, type: 'increase' }}
        />
      </div>
    </div>
  )
}