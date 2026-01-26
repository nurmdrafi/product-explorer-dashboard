import { useInfiniteQuery } from '@tanstack/react-query'
import { API, QUERY } from '@config/app.config'
import { getProducts } from '../services/products.api'
import type { ProductsResponse } from '@typings/product'

interface UseInfiniteProductsResult {
  loadedData: ProductsResponse[] | undefined
  hasMoreToLoad: boolean
  isLoadingMore: boolean
  isLoading: boolean
  error: Error | null
  loadMore: () => void
}

export function useInfiniteProducts(): UseInfiniteProductsResult {
  const result = useInfiniteQuery({
    queryKey: ['products-infinite'],
    queryFn: async ({ pageParam: offset = 0 }) => {
      return getProducts({
        limit: API.DEFAULT_LIMIT,
        skip: offset,
      })
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      // Calculate if more pages exist based on total count
      const loadedCount = lastPage.skip + lastPage.limit
      const hasMore = loadedCount < lastPage.total
      return hasMore ? loadedCount : undefined
    },
    staleTime: QUERY.STALE_TIME,
    gcTime: QUERY.GC_TIME,
    retry: QUERY.RETRY,
  })

  return {
    loadedData: result.data?.pages,
    hasMoreToLoad: result.hasNextPage && !result.isFetchingNextPage,
    isLoadingMore: result.isFetchingNextPage,
    isLoading: result.isLoading,
    error: result.error as Error | null,
    loadMore: result.fetchNextPage,
  }
}
