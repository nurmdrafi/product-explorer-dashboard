import { API } from '@config/app.config'
import type { Product } from '@typings/product'

export async function getProductById(id: number): Promise<Product> {
  const url = `${API.BASE_URL}${API.ENDPOINTS.PRODUCTS}/${id}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`)
  }

  return response.json()
}