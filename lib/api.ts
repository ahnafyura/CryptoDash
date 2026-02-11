// Mock data fallback for resilience
const MOCK_CRYPTO_DATA = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 98234.56,
    price_change_percentage_24h: 2.34,
    market_cap: 1932847562938,
    total_volume: 45628374652,
    sparkline_in_7d: { price: [96000, 97200, 96800, 98100, 97500, 98234] },
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 3842.12,
    price_change_percentage_24h: 1.87,
    market_cap: 461938476293,
    total_volume: 28374652938,
    sparkline_in_7d: { price: [3750, 3800, 3780, 3820, 3810, 3842] },
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    current_price: 234.78,
    price_change_percentage_24h: -0.52,
    market_cap: 112847562938,
    total_volume: 8374652938,
    sparkline_in_7d: { price: [240, 238, 236, 235, 234, 234.78] },
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    current_price: 1.12,
    price_change_percentage_24h: 3.21,
    market_cap: 39847562938,
    total_volume: 1374652938,
    sparkline_in_7d: { price: [1.05, 1.08, 1.10, 1.11, 1.11, 1.12] },
  },
  {
    id: 'ripple',
    symbol: 'xrp',
    name: 'XRP',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    current_price: 2.87,
    price_change_percentage_24h: 1.45,
    market_cap: 162847562938,
    total_volume: 5374652938,
    sparkline_in_7d: { price: [2.75, 2.80, 2.82, 2.85, 2.86, 2.87] },
  },
]

export interface CryptoAsset {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  sparkline_in_7d?: { price: number[] }
}

export async function fetchCryptoData(): Promise<CryptoAsset[]> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h',
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    )

    if (!response.ok) {
      console.warn('CoinGecko API failed, using mock data')
      return MOCK_CRYPTO_DATA
    }

    const data = await response.json()
    return data.length > 0 ? data : MOCK_CRYPTO_DATA
  } catch (error) {
    console.warn('Network error, using mock data:', error)
    return MOCK_CRYPTO_DATA
  }
}

export const MOCK_PORTFOLIO_CHART_DATA = [
  { date: '2024-02-05', value: 125000 },
  { date: '2024-02-06', value: 128000 },
  { date: '2024-02-07', value: 126500 },
  { date: '2024-02-08', value: 132000 },
  { date: '2024-02-09', value: 135000 },
  { date: '2024-02-10', value: 133500 },
  { date: '2024-02-11', value: 142350 },
]

export const MOCK_TRANSACTIONS = [
  {
    id: '1',
    type: 'buy' as const,
    asset: 'Bitcoin',
    amount: 0.5,
    value: 49117.28,
    timestamp: new Date('2024-02-11T10:30:00'),
  },
  {
    id: '2',
    type: 'sell' as const,
    asset: 'Ethereum',
    amount: 2.5,
    value: 9605.30,
    timestamp: new Date('2024-02-10T15:20:00'),
  },
  {
    id: '3',
    type: 'buy' as const,
    asset: 'Solana',
    amount: 50,
    value: 11739.00,
    timestamp: new Date('2024-02-09T09:15:00'),
  },
  {
    id: '4',
    type: 'sell' as const,
    asset: 'Cardano',
    amount: 1000,
    value: 1120.00,
    timestamp: new Date('2024-02-08T14:45:00'),
  },
]
