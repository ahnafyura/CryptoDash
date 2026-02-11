'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchCryptoData } from '@/lib/api'
import { BalanceCard } from '@/components/dashboard/BalanceCard'
import { PortfolioChart } from '@/components/dashboard/PortfolioChart'
import { AssetTable } from '@/components/dashboard/AssetTable'
import { RecentTransactions } from '@/components/dashboard/RecentTransactions'
import { PriceCard } from '@/components/dashboard/PriceCard' 
import { ArrowUpRight, ArrowDownRight, Wallet, ArrowRightLeft, History, Plus } from 'lucide-react'

export default function DashboardPage() {
  const { data: cryptoData } = useQuery({
    queryKey: ['crypto-assets'],
    queryFn: fetchCryptoData,
  })

  // Ambil 3 Koin Teratas untuk ditampilkan di kartu
  const topCoins = cryptoData?.slice(0, 3) || []

  return (
    <main className="min-h-screen lg:ml-64 bg-[#0B0E11] text-white">
      <div className="p-6 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-gray-400 text-sm">Welcome back, here is your portfolio status.</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          
          {/* Row 1: Balance & Chart */}
          <div className="col-span-12 lg:col-span-4">
            <BalanceCard />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <PortfolioChart />
          </div>

          {/* Row 2: Price Cards (Menggunakan PriceCard agar tidak menumpuk) */}
          {topCoins.length > 0 ? (
            topCoins.map((coin) => (
              <div key={coin.id} className="col-span-12 md:col-span-4">
                <PriceCard
                  name={coin.name}
                  symbol={coin.symbol}
                  price={coin.current_price}
                  change={coin.price_change_percentage_24h}
                  icon={coin.image}
                  chartData={[
                    coin.current_price * 0.95,
                    coin.current_price * 1.05,
                    coin.current_price * 0.98,
                    coin.current_price * 1.02,
                    coin.current_price
                  ]}
                />
              </div>
            ))
          ) : (
            // Loading Skeleton
            [1, 2, 3].map((i) => (
              <div key={i} className="col-span-12 md:col-span-4 h-40 bg-white/5 rounded-xl animate-pulse" />
            ))
          )}

          {/* Row 3: Tabel & Sidebar */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <AssetTable />
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="rounded-xl border border-white/5 bg-[#1A1D26]/60 backdrop-blur-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <ActionButton icon={<Plus size={20} />} label="Deposit" sub="Add funds" />
                <ActionButton icon={<ArrowUpRight size={20} />} label="Withdraw" sub="Send crypto" />
                <ActionButton icon={<ArrowRightLeft size={20} />} label="Swap" sub="Trade assets" />
                <ActionButton icon={<History size={20} />} label="History" sub="View all" />
              </div>
            </div>
            <RecentTransactions />
          </div>

        </div>
      </div>
    </main>
  )
}

function ActionButton({ icon, label, sub }: { icon: React.ReactNode, label: string, sub: string }) {
  return (
    <button className="flex flex-col items-start justify-center p-4 bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 rounded-xl transition-all group">
      <div className="mb-3 p-2 rounded-full bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
        {icon}
      </div>
      <p className="text-sm font-semibold text-white">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
    </button>
  )
}