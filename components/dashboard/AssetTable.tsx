'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { fetchCryptoData } from '@/lib/api'
import { formatCurrency, formatCompactNumber } from '@/lib/utils'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export function AssetTable() {
  const { data: cryptoData, isLoading } = useQuery({
    queryKey: ['crypto-assets'],
    queryFn: fetchCryptoData,
  })

  return (
    <Card className="col-span-12 border-white/5 bg-[#1A1D26]/60 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white">Top Assets by Market Cap</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase text-gray-500">
                  <th className="py-4 px-4 font-medium">#</th>
                  <th className="py-4 px-4 font-medium">Asset</th>
                  <th className="py-4 px-4 font-medium text-right">Price</th>
                  <th className="py-4 px-4 font-medium text-right">24h Change</th>
                  <th className="py-4 px-4 font-medium text-right hidden md:table-cell">Mkt Cap</th>
                  <th className="py-4 px-4 font-medium text-right hidden lg:table-cell">Volume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {cryptoData?.map((crypto, idx) => (
                  <tr key={crypto.id} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-sm text-gray-500 font-mono">{idx + 1}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={crypto.image} 
                          alt={crypto.name} 
                          className="w-10 h-10 rounded-full bg-white/10" // Ukuran diperbesar sedikit
                        />
                        {/* PERBAIKAN UTAMA DI SINI (DASHBOARD) */}
                        <div className="flex flex-col justify-center">
                          <span className="font-bold text-white text-base leading-tight block">
                            {crypto.name}
                          </span>
                          <span className="text-xs text-gray-400 font-medium uppercase leading-tight block mt-0.5">
                            {crypto.symbol}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-white">
                      {formatCurrency(crypto.current_price)}
                    </td>
                    <td className={`py-4 px-4 text-right ${
                      crypto.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <div className="flex items-center justify-end gap-1">
                        {crypto.price_change_percentage_24h > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-gray-400 hidden md:table-cell">
                      ${formatCompactNumber(crypto.market_cap)}
                    </td>
                    <td className="py-4 px-4 text-right text-gray-400 hidden lg:table-cell">
                      ${formatCompactNumber(crypto.total_volume)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}