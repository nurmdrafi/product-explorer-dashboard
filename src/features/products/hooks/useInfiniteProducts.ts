import { useInfiniteQuery } from '@tanstack/react-query'
import { getProducts } from '../services/products.api'
import { API } from '@config/app.config'
import { useProductFilters } from '@store/index'

export function useInfiniteProducts() {
  const filters = useProductFilters()

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['products', 'infinite', filters.category, filters.sortBy, filters.order, filters.searchQuery],
    queryFn: ({ pageParam = 0 }) =>
      getProducts({
        limit: API.DEFAULT_LIMIT,
        skip: pageParam,
        category: filters.category ?? undefined,
        q: filters.searchQuery || undefined,
        sortBy: filters.sortBy ?? undefined,
        order: filters.order ?? undefined,
      }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const totalFetched = lastPage.skip + lastPage.limit
      return totalFetched < lastPage.total ? totalFetched : undefined
    },
  })

  const products = data?.pages.flatMap(page => page.products) ?? []

  return {
    products,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  }
}