import { API } from '@config/app.config'
import type { ProductsResponse } from '@typings/product'

// Fetch products with pagination
export async function getProducts(options: {
  limit: number
  skip: number
}): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    limit: String(options.limit),
    skip: String(options.skip),
  })

  const url = `${API.BASE_URL}${API.ENDPOINTS.PRODUCTS}?${params}`
  const response = await fetch(url)

  if (!response.ok) throw new Error('Failed to fetch products')

  return response.json()
}
