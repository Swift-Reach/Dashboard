import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('de-DE').format(num)
}

export function formatPercentage(num: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(num / 100)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getPlatformColor(platform: string): string {
  switch (platform) {
    case 'google':
      return 'bg-blue-500'
    case 'meta':
      return 'bg-blue-600'
    case 'tiktok':
      return 'bg-black'
    default:
      return 'bg-gray-500'
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
    case 'completed':
      return 'bg-green-500'
    case 'paused':
    case 'scheduled':
      return 'bg-yellow-500'
    case 'ended':
    case 'cancelled':
      return 'bg-red-500'
    case 'onboarding':
    case 'in_progress':
      return 'bg-blue-500'
    case 'inactive':
    case 'pending':
      return 'bg-gray-500'
    default:
      return 'bg-gray-500'
  }
}