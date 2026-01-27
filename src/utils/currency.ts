import type { Currency } from '@typings/currency.types'

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
}

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  GBP: '£',
  EUR: '€',
}

const CURRENCY_LOCALES: Record<Currency, string> = {
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'de-DE',
}

export function formatPrice(
  priceInUsd: number,
  currency: Currency
): string {
  const convertedPrice = priceInUsd * EXCHANGE_RATES[currency]
  return new Intl.NumberFormat(CURRENCY_LOCALES[currency], {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedPrice)
}

export function convertPrice(priceInUsd: number, currency: Currency): number {
  return priceInUsd * EXCHANGE_RATES[currency]
}

export function getCurrencySymbol(currency: Currency): string {
  return CURRENCY_SYMBOLS[currency]
}
