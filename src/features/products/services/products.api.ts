import { API } from '@config/app.config'
import type { ProductsResponse, Product } from '@typings/product'

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

export async function getProductById(id: number): Promise<Product> {
  const url = `${API.BASE_URL}${API.ENDPOINTS.PRODUCTS}/${id}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`)
  }

  return response.json()
}