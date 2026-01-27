import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../services/product-details.api'

export function useProductDetails(id: number) {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  })

  return {
    product,
    isLoading,
    error,
  }
}