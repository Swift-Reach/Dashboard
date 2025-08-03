import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          phone: string | null
          status: 'active' | 'inactive' | 'onboarding'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          phone?: string | null
          status?: 'active' | 'inactive' | 'onboarding'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          phone?: string | null
          status?: 'active' | 'inactive' | 'onboarding'
          created_at?: string
          updated_at?: string
        }
      }
      campaigns: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          platform: 'google' | 'meta' | 'tiktok'
          customer_id: string
          status?: 'active' | 'paused' | 'ended'
          budget?: number
          spent?: number
          impressions?: number
          clicks?: number
          conversions?: number
          cpc?: number
          cpm?: number
          roas?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          platform?: 'google' | 'meta' | 'tiktok'
          customer_id?: string
          status?: 'active' | 'paused' | 'ended'
          budget?: number
          spent?: number
          impressions?: number
          clicks?: number
          conversions?: number
          cpc?: number
          cpm?: number
          roas?: number
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          title: string
          description: string | null
          customer_id: string
          date: string
          time: string
          status: 'scheduled' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          customer_id: string
          date: string
          time: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          customer_id?: string
          date?: string
          time?: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      onboarding_steps: {
        Row: {
          id: string
          customer_id: string
          step_name: string
          step_order: number
          status: 'pending' | 'in_progress' | 'completed'
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          step_name: string
          step_order: number
          status?: 'pending' | 'in_progress' | 'completed'
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          step_name?: string
          step_order?: number
          status?: 'pending' | 'in_progress' | 'completed'
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}