'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, LineChart, Wallet, Settings, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: TrendingUp, label: 'Markets', href: '/markets' },
  { icon: Wallet, label: 'Portfolio', href: '/portfolio' },
  { icon: LineChart, label: 'Analytics', href: '/analytics' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen glass border-r border-white/5 fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold gradient-text">CryptoDash</h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-gradient-neon text-white shadow-lg shadow-neon-blue/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-6 border-t border-white/5">
        <div className="glass rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-2">Portfolio Value</p>
          <p className="text-2xl font-bold text-white">$142,350</p>
          <p className="text-sm text-green-400 mt-1">+12.5% this week</p>
        </div>
      </div>
    </aside>
  )
}
