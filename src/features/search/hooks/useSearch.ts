import { useInfiniteQuery } from '@tanstack/react-query'
import { getProducts } from '@features/products/services/products.api'
import { API } from '@config/app.config'
import { useProductFilters } from '@store/features/products'

import { useEffect } from 'react'

export function useSearch() {
  const filters = useProductFilters()

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['search', filters.searchQuery, filters.sortBy, filters.order],
    queryFn: ({ pageParam = 0 }) =>
      getProducts({
        limit: API.DEFAULT_LIMIT,
        skip: pageParam,
        q: filters.searchQuery || undefined,
        sortBy: filters.sortBy ?? undefined,
        order: filters.order ?? undefined,
      }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const totalFetched = lastPage.skip + lastPage.limit
      return totalFetched < lastPage.total ? totalFetched : undefined
    },
    enabled: !!filters.searchQuery,
  })

  useEffect(() => {
    if (filters.searchQuery) {
      refetch()
    }
  }, [filters.searchQuery, filters.sortBy, filters.order, refetch])

  const products = data?.pages.flatMap(page => page.products) ?? []
  const total = data?.pages[0]?.total ?? 0

  return {
    products,
    total,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    hasQuery: !!filters.searchQuery,
  }
}
