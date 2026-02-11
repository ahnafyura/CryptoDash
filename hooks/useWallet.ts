'use client'

import { useState, useEffect } from 'react'
import { BrowserProvider } from 'ethers'
import { useStore } from '@/store/useStore'

export function useWallet() {
  const { address, isConnected, setAddress, disconnect } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check for existing connection on mount (client-side only)
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window === 'undefined' || !window.ethereum) return

      try {
        const provider = new BrowserProvider(window.ethereum)
        const accounts = await provider.listAccounts()
        if (accounts.length > 0) {
          setAddress(accounts[0].address)
        }
      } catch (err) {
        console.error('Failed to check connection:', err)
      }
    }

    checkConnection()
  }, [setAddress])

  const connect = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      setError('MetaMask is not installed')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const provider = new BrowserProvider(window.ethereum)
      const accounts = await provider.send('eth_requestAccounts', [])
      setAddress(accounts[0])
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet'
      setError(errorMessage)
      console.error('Wallet connection error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    setError(null)
  }

  return {
    address,
    isConnected,
    isLoading,
    error,
    connect,
    disconnect: handleDisconnect,
  }
}
