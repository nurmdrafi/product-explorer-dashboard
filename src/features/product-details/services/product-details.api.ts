import { API } from '@config/app.config'
import type { Product } from '@typings/product.types'

export async function getProductById(id: number): Promise<Product> {
  const url = `${API.BASE_URL}${API.ENDPOINTS.PRODUCTS}/${id}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network error: Unable to connect to the server. Please check your internet connection.')
  }
}