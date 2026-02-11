'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { MOCK_TRANSACTIONS } from '@/lib/api'
import { formatCurrency } from '@/lib/utils'

export function RecentTransactions() {
  return (
    <Card className="col-span-12 lg:col-span-6">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'buy' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {tx.type === 'buy' ? (
                    <ArrowDownLeft size={18} className="text-green-400" />
                  ) : (
                    <ArrowUpRight size={18} className="text-red-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-white">
                    {tx.type === 'buy' ? 'Bought' : 'Sold'} {tx.asset}
                  </p>
                  <p className="text-sm text-gray-400">
                    {tx.amount} {tx.asset.slice(0, 3).toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">{formatCurrency(tx.value)}</p>
                <p className="text-xs text-gray-400">
                  {tx.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
