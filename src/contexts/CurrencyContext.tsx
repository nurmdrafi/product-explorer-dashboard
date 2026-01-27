import { createContext, useContext, useState } from 'react'
import type { Currency } from '@typings/currency.types'
import { CURRENCY } from '@config/app.config'

interface CurrencyContextValue {
  currency: Currency
  setCurrency: (currency: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

interface CurrencyProviderProps {
  children: React.ReactNode
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrency] = useState<Currency>(CURRENCY.DEFAULT)
  return <CurrencyContext value={{ currency, setCurrency }}>{children}</CurrencyContext>
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) throw new Error('useCurrency must be used within a CurrencyProvider')
  return context
}
