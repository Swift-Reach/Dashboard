import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Customer } from '@/types'

interface AppointmentFormProps {
  customers: Customer[]
  onSubmit: (appointment: {
    title: string
    description: string
    customer_id: string
    date: string
    time: string
  }) => void
  onCancel: () => void
}

export function AppointmentForm({ customers, onSubmit, onCancel }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    customer_id: '',
    date: '',
    time: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Neuen Termin erstellen</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Titel"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="z.B. Strategiemeeting Q1"
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Beschreibung
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-secondary-800 dark:border-secondary-600 dark:text-secondary-100 dark:placeholder-secondary-500"
              placeholder="Optionale Beschreibung des Termins"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Kunde
            </label>
            <select
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-secondary-800 dark:border-secondary-600 dark:text-secondary-100"
            >
              <option value="">Kunde auswählen</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} {customer.company && `(${customer.company})`}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Datum"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <Input
              label="Uhrzeit"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              Termin erstellen
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Abbrechen
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}