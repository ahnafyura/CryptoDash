'use client'

import { useWallet } from '@/hooks/useWallet'
import { Button } from '@/components/ui/Button'
import { formatAddress, generateGradient } from '@/lib/utils'
import { Wallet, LogOut } from 'lucide-react'

export function Header() {
  const { address, isConnected, isLoading, connect, disconnect } = useWallet()

  return (
    <header className="glass border-b border-white/5 sticky top-0 z-50 lg:ml-64">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-white">Dashboard Overview</h2>
        </div>

        <div className="flex items-center gap-4">
          {isConnected && address ? (
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${generateGradient(address)}`} />
              <div className="hidden md:block">
                <p className="text-sm text-gray-400">Connected</p>
                <p className="text-sm font-medium text-white">{formatAddress(address)}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={disconnect}>
                <LogOut size={16} />
              </Button>
            </div>
          ) : (
            <Button onClick={connect} disabled={isLoading}>
              <Wallet size={16} className="mr-2" />
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
