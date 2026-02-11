'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { fetchCryptoData } from '@/lib/api'
import { Search, TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency, formatCompactNumber } from '@/lib/utils'

const FILTER_TABS = ['All', 'DeFi', 'Metaverse', 'Gaming']

export default function MarketsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const { data: cryptoData, isLoading } = useQuery({
    queryKey: ['crypto-markets'],
    queryFn: fetchCryptoData,
    staleTime: 60000,
  })

  return (
    <main className="min-h-screen lg:ml-64">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Market Overview</h1>
          <p className="text-gray-400">Real-time cryptocurrency market data</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue"
            />
          </div>
          <div className="flex gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeFilter === tab
                    ? 'bg-gradient-neon text-white shadow-lg shadow-neon-blue/30'
                    : 'glass text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Market Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-0">
              <p className="text-sm text-gray-400 mb-1">Market Cap</p>
              <p className="text-2xl font-bold text-white">$2.8T</p>
              <p className="text-sm text-green-400 mt-1">+2.34%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <p className="text-sm text-gray-400 mb-1">24h Volume</p>
              <p className="text-2xl font-bold text-white">$124B</p>
              <p className="text-sm text-red-400 mt-1">-1.12%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <p className="text-sm text-gray-400 mb-1">BTC Dominance</p>
              <p className="text-2xl font-bold text-white">54.2%</p>
              <p className="text-sm text-gray-400 mt-1">Bitcoin</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <p className="text-sm text-gray-400 mb-1">Active Coins</p>
              <p className="text-2xl font-bold text-white">10,247</p>
              <p className="text-sm text-gray-400 mt-1">Listed</p>
            </CardContent>
          </Card>
        </div>

        {/* Market Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Cryptocurrencies</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">#</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Name</th>
                      <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">Price</th>
                      <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">1h</th>
                      <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">24h</th>
                      <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">7d</th>
                      <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">Market Cap</th>
                      <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">Volume (24h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptoData?.map((crypto, idx) => {
                      const change24h = crypto.price_change_percentage_24h
                      const isPositive = change24h > 0
                      
                      return (
                        <tr 
                          key={crypto.id} 
                          className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <td className="py-4 px-4 text-sm text-gray-400">{idx + 1}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                              <div>
                                <p className="font-medium text-white">{crypto.name}</p>
                                <p className="text-xs text-gray-400">{crypto.symbol.toUpperCase()}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right font-medium text-white">
                            {formatCurrency(crypto.current_price)}
                          </td>
                          <td className={`py-4 px-4 text-right font-medium ${
                            Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {Math.random() > 0.5 ? '+' : '-'}{(Math.random() * 2).toFixed(2)}%
                          </td>
                          <td className={`py-4 px-4 text-right font-medium ${
                            isPositive ? 'text-green-400' : 'text-red-400'
                          }`}>
                            <div className="flex items-center justify-end gap-1">
                              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                              {isPositive ? '+' : ''}{change24h.toFixed(2)}%
                            </div>
                          </td>
                          <td className={`py-4 px-4 text-right font-medium ${
                            Math.random() > 0.4 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {Math.random() > 0.4 ? '+' : '-'}{(Math.random() * 10).toFixed(2)}%
                          </td>
                          <td className="py-4 px-4 text-right text-gray-300">
                            ${formatCompactNumber(crypto.market_cap)}
                          </td>
                          <td className="py-4 px-4 text-right text-gray-300">
                            ${formatCompactNumber(crypto.total_volume)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
