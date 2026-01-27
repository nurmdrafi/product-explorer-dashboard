import { useQuery } from '@tanstack/react-query'
import { getProductsCategoryList } from '../services/products.api'

export function useGetProductsCategoryListData() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['category-list'],
    queryFn: getProductsCategoryList,
  })

  return {
    categories: data ?? [],
    isLoading,
    error,
  }
}
