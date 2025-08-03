import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CampaignChart } from './CampaignChart'
import { Campaign, ChartData } from '@/types'
import { formatCurrency, formatNumber, getPlatformColor } from '@/lib/utils'

interface PlatformTabsProps {
  campaigns: Campaign[]
  chartData: ChartData[]
}

export function PlatformTabs({ campaigns, chartData }: PlatformTabsProps) {
  const [activeTab, setActiveTab] = useState<'google' | 'meta' | 'tiktok'>('google')
  const [activeMetric, setActiveMetric] = useState<'impressions' | 'clicks' | 'conversions' | 'spent' | 'revenue'>('impressions')

  const platforms = [
    { id: 'google', name: 'Google Ads', color: 'bg-blue-500' },
    { id: 'meta', name: 'Meta Ads', color: 'bg-blue-600' },
    { id: 'tiktok', name: 'TikTok Ads', color: 'bg-black' },
  ] as const

  const metrics = [
    { id: 'impressions', name: 'Impressionen' },
    { id: 'clicks', name: 'Klicks' },
    { id: 'conversions', name: 'Conversions' },
    { id: 'spent', name: 'Ausgaben' },
    { id: 'revenue', name: 'Umsatz' },
  ] as const

  const activePlatformCampaigns = campaigns.filter(campaign => campaign.platform === activeTab)

  const getTotalMetric = (metric: string) => {
    return activePlatformCampaigns.reduce((sum, campaign) => {
      switch (metric) {
        case 'impressions':
          return sum + campaign.impressions
        case 'clicks':
          return sum + campaign.clicks
        case 'conversions':
          return sum + campaign.conversions
        case 'spent':
          return sum + campaign.spent
        case 'revenue':
          return sum + (campaign.spent * campaign.roas)
        default:
          return sum
      }
    }, 0)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ad Performance</CardTitle>
        
        {/* Platform Tabs */}
        <div className="flex space-x-1 bg-secondary-100 dark:bg-secondary-800 p-1 rounded-lg">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setActiveTab(platform.id)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === platform.id
                  ? 'bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 shadow-sm'
                  : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-100'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                <span>{platform.name}</span>
              </div>
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {/* Campaign Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                activeMetric === metric.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600'
              }`}
              onClick={() => setActiveMetric(metric.id)}
            >
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                {metric.name}
              </p>
              <p className="text-lg font-bold text-secondary-900 dark:text-secondary-100 mt-1">
                {metric.id === 'spent' || metric.id === 'revenue'
                  ? formatCurrency(getTotalMetric(metric.id))
                  : formatNumber(getTotalMetric(metric.id))
                }
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="mb-6">
          <CampaignChart
            data={chartData}
            type="line"
            metric={activeMetric}
          />
        </div>

        {/* Campaign List */}
        <div className="space-y-4">
          <h4 className="font-semibold text-secondary-900 dark:text-secondary-100">
            Aktive Kampagnen
          </h4>
          {activePlatformCampaigns.length > 0 ? (
            <div className="space-y-3">
              {activePlatformCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h5 className="font-medium text-secondary-900 dark:text-secondary-100">
                        {campaign.name}
                      </h5>
                      <Badge
                        variant={campaign.status === 'active' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {campaign.status === 'active' ? 'Aktiv' : 'Pausiert'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-secondary-600 dark:text-secondary-400">
                      <span>Budget: {formatCurrency(campaign.budget)}</span>
                      <span>Ausgaben: {formatCurrency(campaign.spent)}</span>
                      <span>ROAS: {campaign.roas.toFixed(1)}x</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                      {formatNumber(campaign.conversions)} Conversions
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      CPC: {formatCurrency(campaign.cpc)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-secondary-600 dark:text-secondary-400">
                Keine Kampagnen für {platforms.find(p => p.id === activeTab)?.name} gefunden
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}