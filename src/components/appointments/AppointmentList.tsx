import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Calendar, Clock, User, Building } from 'lucide-react'
import { Appointment } from '@/types'
import { formatDate } from '@/lib/utils'

interface AppointmentListProps {
  appointments: Appointment[]
  title: string
}

export function AppointmentList({ appointments, title }: AppointmentListProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'info'
      case 'completed':
        return 'success'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Geplant'
      case 'completed':
        return 'Abgeschlossen'
      case 'cancelled':
        return 'Abgesagt'
      default:
        return status
    }
  }

  if (appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-secondary-600 dark:text-secondary-400">
              Keine Termine gefunden
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-secondary-600 dark:text-secondary-400">
          {appointments.length} Termin{appointments.length !== 1 ? 'e' : ''}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-1">
                    {appointment.title}
                  </h4>
                  {appointment.description && (
                    <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">
                      {appointment.description}
                    </p>
                  )}
                </div>
                <Badge variant={getStatusVariant(appointment.status)} size="sm">
                  {getStatusLabel(appointment.status)}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-secondary-600 dark:text-secondary-400">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(appointment.date)}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{appointment.time} Uhr</span>
                </div>
                
                {appointment.customer && (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <div className="flex items-center space-x-1">
                      <span>{appointment.customer.name}</span>
                      {appointment.customer.company && (
                        <>
                          <Building className="w-3 h-3" />
                          <span className="text-xs">{appointment.customer.company}</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-secondary-200 dark:border-secondary-600">
                <div className="flex justify-between text-xs text-secondary-500 dark:text-secondary-400">
                  <span>Erstellt: {formatDate(appointment.created_at)}</span>
                  {appointment.updated_at !== appointment.created_at && (
                    <span>Aktualisiert: {formatDate(appointment.updated_at)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}