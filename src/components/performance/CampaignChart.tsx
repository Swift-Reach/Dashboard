import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import { ChartData } from '@/types'
import { formatCurrency, formatNumber } from '@/lib/utils'

interface CampaignChartProps {
  data: ChartData[]
  type: 'line' | 'bar'
  metric: 'impressions' | 'clicks' | 'conversions' | 'spent' | 'revenue'
}

export function CampaignChart({ data, type = 'line', metric }: CampaignChartProps) {
  const formatValue = (value: number) => {
    switch (metric) {
      case 'spent':
      case 'revenue':
        return formatCurrency(value)
      default:
        return formatNumber(value)
    }
  }

  const getMetricLabel = () => {
    switch (metric) {
      case 'impressions':
        return 'Impressionen'
      case 'clicks':
        return 'Klicks'
      case 'conversions':
        return 'Conversions'
      case 'spent':
        return 'Ausgaben'
      case 'revenue':
        return 'Umsatz'
      default:
        return metric
    }
  }

  const getMetricColor = () => {
    switch (metric) {
      case 'impressions':
        return '#3b82f6'
      case 'clicks':
        return '#10b981'
      case 'conversions':
        return '#f59e0b'
      case 'spent':
        return '#ef4444'
      case 'revenue':
        return '#8b5cf6'
      default:
        return '#6b7280'
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-secondary-800 p-3 border border-secondary-200 dark:border-secondary-700 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
            {new Date(label).toLocaleDateString('de-DE')}
          </p>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            {getMetricLabel()}: {formatValue(payload[0].value)}
          </p>
        </div>
      )
    }
    return null
  }

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => new Date(value).toLocaleDateString('de-DE', { month: 'short', day: 'numeric' })}
            className="text-xs"
          />
          <YAxis
            tickFormatter={formatValue}
            className="text-xs"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey={metric}
            fill={getMetricColor()}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => new Date(value).toLocaleDateString('de-DE', { month: 'short', day: 'numeric' })}
          className="text-xs"
        />
        <YAxis
          tickFormatter={formatValue}
          className="text-xs"
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey={metric}
          stroke={getMetricColor()}
          strokeWidth={2}
          dot={{ fill: getMetricColor(), strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: getMetricColor(), strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}