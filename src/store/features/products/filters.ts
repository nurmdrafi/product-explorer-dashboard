import { create } from 'zustand'
import { API } from '@config/app.config'
import type { ProductQueryParams } from '@typings/query.types'

interface ProductFiltersState {
  searchQuery: string
  category: string | null
  sortBy: 'price' | null
  order: 'asc' | 'desc' | null
  limit: number
  skip: number

  setSearchQuery: (query: string) => void
  setCategory: (category: string | null) => void
  setSortBy: (sortBy: 'price' | null) => void
  setOrder: (order: 'asc' | 'desc' | null) => void
  setLimit: (limit: number) => void
  setSkip: (skip: number) => void
  resetFilters: () => void
  syncWithURL: (searchParams: URLSearchParams) => void
  getQueryParams: () => ProductQueryParams
}

export const useProductFilters = create<ProductFiltersState>((set, get) => ({
  searchQuery: '',
  category: null,
  sortBy: null,
  order: null,
  limit: API.DEFAULT_LIMIT,
  skip: 0,

  setSearchQuery: query => {
    set({ searchQuery: query })
  },

  setCategory: category => {
    set({ category })
  },

  setSortBy: sortBy => {
    set({ sortBy })
  },

  setOrder: order => {
    set({ order })
  },

  setLimit: limit => set({ limit }),
  setSkip: skip => set({ skip }),

  resetFilters: () => set({
    searchQuery: '',
    category: null,
    sortBy: null,
    order: null,
    limit: API.DEFAULT_LIMIT,
    skip: 0,
  }),

  syncWithURL: searchParams => {
    const state = get()
    const updates: Partial<typeof state> = {}

    const searchQuery = searchParams.get('q')
    if (searchQuery !== state.searchQuery) {
      updates.searchQuery = searchQuery || ''
    }

    const category = searchParams.get('category')
    if (category !== state.category) {
      updates.category = category
    }

    const sortBy = searchParams.get('sortBy') as 'price' | null
    if (sortBy !== state.sortBy) {
      updates.sortBy = sortBy
    }

    const order = searchParams.get('order') as 'asc' | 'desc' | null
    if (order !== state.order) {
      updates.order = order
    }

    if (Object.keys(updates).length > 0) {
      set(updates)
    }
  },

  getQueryParams: () => {
    const state = get()
    const params: ProductQueryParams = {
      limit: state.limit,
      skip: state.skip,
    }

    if (state.searchQuery) params.q = state.searchQuery
    if (state.category) params.category = state.category
    if (state.sortBy) params.sortBy = state.sortBy
    if (state.order) params.order = state.order

    return params
  },
}))
