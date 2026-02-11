'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { Eye, EyeOff, TrendingUp } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { formatCurrency } from '@/lib/utils'

export function BalanceCard() {
  const { balanceHidden, toggleBalanceVisibility } = useStore()
  const totalBalance = 142350

  return (
    <Card className="col-span-12 lg:col-span-4">
      <CardContent className="p-0">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400 mb-2">Total Balance</p>
            <h2 className="text-4xl font-bold text-white">
              {balanceHidden ? '••••••' : formatCurrency(totalBalance)}
            </h2>
          </div>
          <button
            onClick={toggleBalanceVisibility}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            {balanceHidden ? (
              <EyeOff size={20} className="text-gray-400" />
            ) : (
              <Eye size={20} className="text-gray-400" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 text-green-400">
          <TrendingUp size={16} />
          <span className="text-sm font-medium">+$15,750 (12.45%)</span>
          <span className="text-xs text-gray-400">Last 7 days</span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Today's PnL</p>
            <p className="text-lg font-semibold text-green-400">+$2,340</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Total Assets</p>
            <p className="text-lg font-semibold text-white">5</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
