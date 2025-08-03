import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { AuthForm } from '@/components/auth/AuthForm'
import { useAuth } from '@/hooks/useAuth'
import { Overview } from '@/pages/Overview'
import { Performance } from '@/pages/Performance'
import { Appointments } from '@/pages/Appointments'
import { Customers } from '@/pages/Customers'
import { Settings } from '@/pages/Settings'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App