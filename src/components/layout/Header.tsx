import React from 'react'
import { Menu, Moon, Sun, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useAuth } from '@/hooks/useAuth'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { isDark, toggle } = useDarkMode()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-700">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="hidden lg:block">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
              Dashboard
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggle}
            className="p-2"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {user && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300 hidden sm:block">
                  {user.email}
                </span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="p-2"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}