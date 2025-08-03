import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { AppointmentForm } from '@/components/appointments/AppointmentForm'
import { AppointmentList } from '@/components/appointments/AppointmentList'
import { Plus } from 'lucide-react'
import { mockAppointments, mockCustomers } from '@/data/mockData'

export function Appointments() {
  const [showForm, setShowForm] = useState(false)

  const upcomingAppointments = mockAppointments.filter(
    apt => apt.status === 'scheduled' && new Date(apt.date) >= new Date()
  )

  const pastAppointments = mockAppointments.filter(
    apt => apt.status === 'completed' || new Date(apt.date) < new Date()
  )

  const handleSubmit = (appointmentData: any) => {
    console.log('New appointment:', appointmentData)
    // Here you would typically save to Supabase
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
            Termine
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Verwalten Sie Ihre Kundentermine und planen Sie neue Meetings.
          </p>
        </div>
        
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Neuer Termin
        </Button>
      </div>

      {showForm && (
        <AppointmentForm
          customers={mockCustomers}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentList
          appointments={upcomingAppointments}
          title="Anstehende Termine"
        />
        
        <AppointmentList
          appointments={pastAppointments}
          title="Vergangene Termine"
        />
      </div>
    </div>
  )
}