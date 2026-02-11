'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { TrendingUp, ArrowUpRight, ArrowDownLeft, Wallet } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const PORTFOLIO_DATA = [
  { name: 'Bitcoin', value: 64000, percentage: 45, color: '#F7931A' },
  { name: 'Ethereum', value: 42800, percentage: 30, color: '#627EEA' },
  { name: 'Solana', value: 21400, percentage: 15, color: '#14F195' },
  { name: 'Cardano', value: 10700, percentage: 7.5, color: '#0033AD' },
  { name: 'Others', value: 3450, percentage: 2.5, color: '#8B5CF6' },
]

const HISTORY_DATA = [
  { id: 1, type: 'deposit', asset: 'Bitcoin', amount: 0.5, value: 49117.28, date: '2024-02-11', status: 'completed' },
  { id: 2, type: 'withdrawal', asset: 'Ethereum', amount: 2.5, value: 9605.30, date: '2024-02-10', status: 'completed' },
  { id: 3, type: 'deposit', asset: 'Solana', amount: 50, value: 11739.00, date: '2024-02-09', status: 'completed' },
  { id: 4, type: 'deposit', asset: 'USDC', amount: 5000, value: 5000.00, date: '2024-02-08', status: 'completed' },
  { id: 5, type: 'withdrawal', asset: 'Bitcoin', amount: 0.2, value: 19646.91, date: '2024-02-07', status: 'pending' },
]

export default function PortfolioPage() {
  const totalValue = PORTFOLIO_DATA.reduce((acc, item) => acc + item.value, 0)

  return (
    <main className="min-h-screen lg:ml-64">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
          <p className="text-gray-400">Track your crypto assets and performance</p>
        </div>

        {/* Total Balance Section */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Total Portfolio Value</p>
                <h2 className="text-5xl font-bold text-white mb-4">{formatCurrency(totalValue)}</h2>
                <div className="flex items-center gap-2 text-green-400">
                  <TrendingUp size={20} />
                  <span className="text-lg font-medium">+$18,450 (14.9%)</span>
                  <span className="text-sm text-gray-400">All time</span>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-gradient-neon p-4 rounded-xl mb-3">
                  <Wallet size={32} className="text-white" />
                </div>
                <p className="text-sm text-gray-400">5 Assets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Asset Allocation Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={PORTFOLIO_DATA}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {PORTFOLIO_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1A1D26',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Holdings Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {PORTFOLIO_DATA.map((asset) => (
                  <div key={asset.name} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: asset.color }}
                      />
                      <div>
                        <p className="font-medium text-white">{asset.name}</p>
                        <p className="text-sm text-gray-400">{asset.percentage}% of portfolio</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">{formatCurrency(asset.value)}</p>
                      <p className="text-sm text-green-400">+{(Math.random() * 10 + 5).toFixed(2)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {HISTORY_DATA.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      tx.type === 'deposit' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {tx.type === 'deposit' ? (
                        <ArrowDownLeft size={20} className="text-green-400" />
                      ) : (
                        <ArrowUpRight size={20} className="text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                      </p>
                      <p className="text-sm text-gray-400">
                        {tx.amount} {tx.asset} • {tx.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{formatCurrency(tx.value)}</p>
                    <p className={`text-sm ${
                      tx.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {tx.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
