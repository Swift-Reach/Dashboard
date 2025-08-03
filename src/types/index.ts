export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at: string
}

export interface Customer {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  status: 'active' | 'inactive' | 'onboarding'
  created_at: string
  updated_at: string
}

export interface Campaign {
  id: string
  name: string
  platform: 'google' | 'meta' | 'tiktok'
  customer_id: string
  status: 'active' | 'paused' | 'ended'
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  cpc: number
  cpm: number
  roas: number
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  title: string
  description?: string
  customer_id: string
  customer?: Customer
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface OnboardingStep {
  id: string
  customer_id: string
  step_name: string
  step_order: number
  status: 'pending' | 'in_progress' | 'completed'
  completed_at?: string
  created_at: string
  updated_at: string
}

export interface DashboardStats {
  totalCustomers: number
  activeCustomers: number
  totalCampaigns: number
  activeCampaigns: number
  totalSpent: number
  totalRevenue: number
  averageRoas: number
  upcomingAppointments: number
}

export interface ChartData {
  date: string
  impressions: number
  clicks: number
  conversions: number
  spent: number
  revenue: number
}