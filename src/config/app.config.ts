import type { Currency } from '@typings/currency'

export const API = {
  BASE_URL: 'https://dummyjson.com',
  TIMEOUT: 10000,
  DEFAULT_LIMIT: 20,
}

export const ROUTE = {
  HOME: '/',
  PRODUCTS: '/products',
  CATEGORIES: '/products/categories',
  SEARCH: '/products/search',
  SETTINGS: '/settings',
}

export const CURRENCY = {
  DEFAULT: 'USD' as Currency,
  SUPPORTED: ['USD', 'GBP', 'EUR'] as const,
}

export const QUERY = {
  STALE_TIME: 5 * 60 * 1000,
  GC_TIME: 10 * 60 * 1000,
  RETRY: 3,
}

export const SEARCH_DEBOUNCE_MS = 300
export const INFINITE_SCROLL_THRESHOLD = 200
