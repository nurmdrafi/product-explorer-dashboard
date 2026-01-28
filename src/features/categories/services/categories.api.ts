import { API } from '@config/app.config'
import type { CategoriesResponse } from '@typings/categories.types'

export async function getCategories(): Promise<CategoriesResponse> {
  const url = `${API.BASE_URL}${API.ENDPOINTS.CATEGORIES}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Network error: Unable to connect to the server. Please check your internet connection.')
  }
}
