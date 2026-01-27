import { useInfiniteQuery } from '@tanstack/react-query'
import { getProducts } from '../services/products.api'
import { API } from '@config/app.config'

export function useInfiniteProducts() {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    queryFn: ({ pageParam = 0 }) =>
      getProducts({
        limit: API.DEFAULT_LIMIT,
        skip: pageParam,
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