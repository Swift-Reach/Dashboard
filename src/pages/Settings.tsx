import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useAuth } from '@/hooks/useAuth'
import { Moon, Sun, User, Bell, Shield, Database } from 'lucide-react'

export function Settings() {
  const { isDark, toggle } = useDarkMode()
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
          Einstellungen
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Verwalten Sie Ihre Kontoeinstellungen und Präferenzen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Profil</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="E-Mail"
              value={user?.email || ''}
              disabled
            />
            
            <Input
              label="Name"
              placeholder="Ihr vollständiger Name"
            />
            
            <Input
              label="Unternehmen"
              placeholder="SwiftReach GbR"
            />
            
            <Button>Profil aktualisieren</Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Moon className="w-5 h-5" />
              <span>Darstellung</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-secondary-900 dark:text-secondary-100">
                  Dark Mode
                </p>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  Wechseln Sie zwischen hellem und dunklem Design
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggle}
                className="flex items-center space-x-2"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4" />
                    <span>Hell</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" />
                    <span>Dunkel</span>
                  </>
                )}
              </Button>
            </div>
            
            <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700">
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Aktuelles Theme: <Badge variant="info" size="sm">
                  {isDark ? 'Dunkel' : 'Hell'}
                </Badge>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Benachrichtigungen</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-secondary-900 dark:text-secondary-100">
                    E-Mail Benachrichtigungen
                  </p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Erhalten Sie Updates per E-Mail
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-primary-600 bg-secondary-100 border-secondary-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-secondary-800 focus:ring-2 dark:bg-secondary-700 dark:border-secondary-600"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-secondary-900 dark:text-secondary-100">
                    Termin-Erinnerungen
                  </p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Erinnerungen für anstehende Termine
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-primary-600 bg-secondary-100 border-secondary-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-secondary-800 focus:ring-2 dark:bg-secondary-700 dark:border-secondary-600"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-secondary-900 dark:text-secondary-100">
                    Performance-Alerts
                  </p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    Benachrichtigungen bei Kampagnen-Änderungen
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 bg-secondary-100 border-secondary-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-secondary-800 focus:ring-2 dark:bg-secondary-700 dark:border-secondary-600"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Sicherheit</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Passwort ändern
            </Button>
            
            <Button variant="outline" className="w-full">
              Zwei-Faktor-Authentifizierung
            </Button>
            
            <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700">
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Letzter Login: {new Date().toLocaleDateString('de-DE')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <span>System-Informationen</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-secondary-900 dark:text-secondary-100">Version</p>
              <p className="text-secondary-600 dark:text-secondary-400">1.0.0</p>
            </div>
            <div>
              <p className="font-medium text-secondary-900 dark:text-secondary-100">Datenbank</p>
              <p className="text-secondary-600 dark:text-secondary-400">Supabase</p>
            </div>
            <div>
              <p className="font-medium text-secondary-900 dark:text-secondary-100">Status</p>
              <Badge variant="success" size="sm">Online</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}