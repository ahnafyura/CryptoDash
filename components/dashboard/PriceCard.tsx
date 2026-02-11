'use client'

import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts'
import { cn, formatCurrency } from '@/lib/utils'
import { motion } from 'framer-motion'

interface PriceCardProps {
  name: string;
  symbol: string;
  price: number;
  change: number;
  chartData: number[]; // Array harga untuk grafik mini
  icon?: string;
}

export function PriceCard({ name, symbol, price, change, chartData, icon }: PriceCardProps) {
  const isPositive = change >= 0
  
  // Format data agar bisa dibaca Recharts
  const data = chartData.map((val, i) => ({ i, val }))
  const min = Math.min(...chartData)
  const max = Math.max(...chartData)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl border border-white/5 bg-[#1A1D26]/60 backdrop-blur-xl p-6 group"
    >
      {/* Efek Glow di Background */}
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-5 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:opacity-10 transition-opacity",
        isPositive ? "from-green-500 to-emerald-500" : "from-red-500 to-rose-500"
      )} />

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Header Kartu */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
             {/* Ikon Koin */}
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
               {icon ? (
                 <img src={icon} alt={symbol} className="w-full h-full object-cover" />
               ) : (
                 <div className="text-xs font-bold text-white">{symbol[0]}</div>
               )}
            </div>

            {/* Nama & Simbol (Pakai Flex Col biar ga numpuk) */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-white leading-tight">{name}</h3>
              <span className="text-xs text-gray-400 uppercase font-medium">{symbol}</span>
            </div>
          </div>
          
          {/* Badge Persentase */}
          <div className={cn(
            "flex items-center gap-0.5 text-xs font-medium px-2 py-1 rounded-full border",
            isPositive 
              ? "text-green-400 bg-green-400/10 border-green-400/20" 
              : "text-red-400 bg-red-400/10 border-red-400/20"
          )}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(change).toFixed(2)}%
          </div>
        </div>

        {/* Harga Besar */}
        <div className="mb-4">
          <span className="text-2xl font-bold tracking-tight text-white">
            {formatCurrency(price)}
          </span>
        </div>

        {/* Grafik Mini (Sparkline) */}
        <div className="h-14 w-full opacity-50 group-hover:opacity-100 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? "#4ade80" : "#f87171"} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={isPositive ? "#4ade80" : "#f87171"} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <YAxis domain={[min, max]} hide />
              <Area 
                type="monotone" 
                dataKey="val" 
                stroke={isPositive ? "#4ade80" : "#f87171"} 
                strokeWidth={2}
                fill={`url(#gradient-${symbol})`} 
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}