import React from 'react'
import { PlatformTabs } from '@/components/performance/PlatformTabs'
import { mockCampaigns, mockChartData } from '@/data/mockData'

export function Performance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
          Performance
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Übersicht über die Performance Ihrer Werbekampagnen auf allen Plattformen.
        </p>
      </div>

      <PlatformTabs campaigns={mockCampaigns} chartData={mockChartData} />
    </div>
  )
}