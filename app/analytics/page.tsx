'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ComposedChart, Line } from 'recharts'
import { TrendingUp, TrendingDown, Award, AlertTriangle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const VOLUME_PRICE_DATA = [
  { date: 'Jan 1', volume: 45000, price: 120000 },
  { date: 'Jan 8', volume: 52000, price: 125000 },
  { date: 'Jan 15', volume: 48000, price: 122000 },
  { date: 'Jan 22', volume: 61000, price: 130000 },
  { date: 'Jan 29', volume: 55000, price: 128000 },
  { date: 'Feb 5', volume: 68000, price: 135000 },
  { date: 'Feb 12', volume: 72000, price: 142350 },
]

const PERFORMANCE_DATA = [
  { month: 'Aug', value: 85000 },
  { month: 'Sep', value: 92000 },
  { month: 'Oct', value: 98000 },
  { month: 'Nov', value: 105000 },
  { month: 'Dec', value: 118000 },
  { month: 'Jan', value: 132000 },
  { month: 'Feb', value: 142350 },
]

const METRICS = [
  {
    title: 'All Time High',
    value: '$145,230',
    change: '+2.02%',
    date: 'Feb 9, 2024',
    isPositive: true,
    icon: Award,
  },
  {
    title: 'Best Performer',
    value: 'Solana (SOL)',
    change: '+145.8%',
    date: 'Last 90 days',
    isPositive: true,
    icon: TrendingUp,
  },
  {
    title: 'Worst Performer',
    value: 'Cardano (ADA)',
    change: '-8.2%',
    date: 'Last 30 days',
    isPositive: false,
    icon: TrendingDown,
  },
  {
    title: 'Risk Score',
    value: '6.4 / 10',
    change: 'Medium Risk',
    date: 'Portfolio volatility',
    isPositive: false,
    icon: AlertTriangle,
  },
]

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen lg:ml-64">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">Deep dive into your portfolio performance</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {METRICS.map((metric) => {
            const Icon = metric.icon
            return (
              <Card key={metric.title}>
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm text-gray-400">{metric.title}</p>
                    <div className={`p-2 rounded-lg ${
                      metric.isPositive ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      <Icon size={16} className={metric.isPositive ? 'text-green-400' : 'text-red-400'} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
                  <p className={`text-sm font-medium ${
                    metric.isPositive ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.change}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{metric.date}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Volume vs Price Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Trading Volume vs Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={VOLUME_PRICE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2D36" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6B7280"
                    fontSize={12}
                  />
                  <YAxis 
                    yAxisId="left"
                    stroke="#6B7280"
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="#6B7280"
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A1D26',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#9CA3AF' }}
                    itemStyle={{ color: '#FFFFFF' }}
                  />
                  <Bar yAxisId="left" dataKey="volume" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PERFORMANCE_DATA}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2D36" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6B7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A1D26',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
