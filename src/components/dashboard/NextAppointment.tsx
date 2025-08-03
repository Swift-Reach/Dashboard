import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Calendar, Clock, User } from 'lucide-react'
import { Appointment } from '@/types'
import { formatDate } from '@/lib/utils'

interface NextAppointmentProps {
  appointment: Appointment | null
}

export function NextAppointment({ appointment }: NextAppointmentProps) {
  if (!appointment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary-600" />
            <span>Nächster Termin</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-secondary-600 dark:text-secondary-400">
              Keine anstehenden Termine
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary-600" />
            <span>Nächster Termin</span>
          </div>
          <Badge variant="info" size="sm">
            {appointment.status === 'scheduled' && 'Geplant'}
            {appointment.status === 'completed' && 'Abgeschlossen'}
            {appointment.status === 'cancelled' && 'Abgesagt'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
              {appointment.title}
            </h4>
            {appointment.description && (
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                {appointment.description}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-secondary-600 dark:text-secondary-400">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(appointment.date)}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-secondary-600 dark:text-secondary-400">
              <Clock className="w-4 h-4" />
              <span>{appointment.time} Uhr</span>
            </div>
            
            {appointment.customer && (
              <div className="flex items-center space-x-2 text-sm text-secondary-600 dark:text-secondary-400">
                <User className="w-4 h-4" />
                <span>{appointment.customer.name}</span>
                {appointment.customer.company && (
                  <span className="text-secondary-500">
                    • {appointment.customer.company}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center justify-between text-xs text-secondary-500 dark:text-secondary-400">
              <span>Erstellt am {formatDate(appointment.created_at)}</span>
              {appointment.updated_at !== appointment.created_at && (
                <span>Aktualisiert am {formatDate(appointment.updated_at)}</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}