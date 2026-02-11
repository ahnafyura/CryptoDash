'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { fetchCryptoData } from '@/lib/api'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function TopMovers() {
  const { data: cryptoData, isLoading } = useQuery({
    queryKey: ['crypto-top-movers'],
    queryFn: fetchCryptoData,
    staleTime: 60000,
  })

  const topMovers = cryptoData?.slice(0, 3) || []

  if (isLoading) {
    return (
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-0">
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4">
      {topMovers.map((crypto) => {
        const isPositive = crypto.price_change_percentage_24h > 0
        const sparklineData = crypto.sparkline_in_7d?.price.map((price, idx) => ({ value: price, idx })) || []

        return (
          <Card key={crypto.id}>
            <CardContent className="p-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
                  <div>
                    <p className="font-semibold text-white">{crypto.symbol.toUpperCase()}</p>
                    <p className="text-xs text-gray-400">{crypto.name}</p>
                  </div>
                </div>
                {isPositive ? (
                  <TrendingUp size={16} className="text-green-400" />
                ) : (
                  <TrendingDown size={16} className="text-red-400" />
                )}
              </div>

              <p className="text-2xl font-bold text-white mb-1">
                ${crypto.current_price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>

              <p className={`text-sm font-medium mb-4 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
              </p>

              {sparklineData.length > 0 && (
                <div className="h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sparklineData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={isPositive ? '#4ADE80' : '#F87171'}
                        strokeWidth={1.5}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
