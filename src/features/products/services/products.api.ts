import { API } from '@config/app.config'
import type { ProductsResponse } from '@typings/product'

interface GetProductsParams {
  limit: number
  skip: number
}

export async function getProducts(
  params: GetProductsParams
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams({
    limit: String(params.limit),
    skip: String(params.skip),
  })

  const url = `${API.BASE_URL}${API.ENDPOINTS.PRODUCTS}?${searchParams}`
  
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`)
  }

  return response.json()
}