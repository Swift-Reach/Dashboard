import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          name: string;
          email: string;
          password: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          email: string;
          password: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          email?: string;
          password?: string;
          created_at?: string;
        };
      };
      leads: {
        Row: {
          id: number;
          name: string | null;
          number: string | null;
          email: string | null;
          company: string | null;
          position: string | null;
          status: string;
          owner_id: number | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          name?: string | null;
          number?: string | null;
          email?: string | null;
          company?: string | null;
          position?: string | null;
          status?: string;
          owner_id?: number | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string | null;
          number?: string | null;
          email?: string | null;
          company?: string | null;
          position?: string | null;
          status?: string;
          owner_id?: number | null;
          created_at?: string;
        };
      };
      actions: {
        Row: {
          id: number;
          done: boolean;
          due: string;
          type: string;
          note: string | null;
          priority: string;
          lead_id: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          done?: boolean;
          due?: string;
          type: string;
          note?: string | null;
          priority?: string;
          lead_id: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          done?: boolean;
          due?: string;
          type?: string;
          note?: string | null;
          priority?: string;
          lead_id?: number;
          created_at?: string;
        };
      };
    };
  };
};
