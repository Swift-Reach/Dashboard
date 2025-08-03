import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Zap } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = isLogin
        ? await signIn(email, password)
        : await signUp(email, password)

      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError('Ein unerwarteter Fehler ist aufgetreten')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-900 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-600 rounded-lg">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                SwiftReach
              </h1>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">
                Marketing Dashboard
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {isLogin ? 'Anmelden' : 'Registrieren'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="E-Mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ihre@email.de"
              />

              <Input
                label="Passwort"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />

              {error && (
                <div className="p-3 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-md">
                  <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Wird verarbeitet...' : (isLogin ? 'Anmelden' : 'Registrieren')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                {isLogin
                  ? 'Noch kein Konto? Jetzt registrieren'
                  : 'Bereits ein Konto? Jetzt anmelden'
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}