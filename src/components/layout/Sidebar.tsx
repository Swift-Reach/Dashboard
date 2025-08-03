import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  TrendingUp, 
  Calendar, 
  Users, 
  Settings,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Übersicht', href: '/', icon: LayoutDashboard },
  { name: 'Performance', href: '/performance', icon: TrendingUp },
  { name: 'Termine', href: '/appointments', icon: Calendar },
  { name: 'Kunden', href: '/customers', icon: Users },
  { name: 'Einstellungen', href: '/settings', icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-secondary-900 border-r border-secondary-200 dark:border-secondary-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary-600 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-secondary-900 dark:text-secondary-100">
                  SwiftReach
                </h1>
                <p className="text-xs text-secondary-500 dark:text-secondary-400">
                  Marketing Dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-secondary-100'
                  )
                }
                onClick={() => onClose()}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-secondary-200 dark:border-secondary-700">
            <p className="text-xs text-secondary-500 dark:text-secondary-400 text-center">
              © 2024 SwiftReach GbR
            </p>
          </div>
        </div>
      </div>
    </>
  )
}