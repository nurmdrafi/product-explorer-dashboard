import { API } from '@config/app.config'
import type { CategoriesResponse } from '@typings/categories'

export async function getCategories(): Promise<CategoriesResponse> {
  const url = `${API.BASE_URL}${API.ENDPOINTS.CATEGORIES}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`)
  }

  return response.json()
}
