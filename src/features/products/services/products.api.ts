import { API } from '@config/app.config'
import type { CategoryListResponse } from '@typings/categories.types'
import type { ProductsResponse } from '@typings/product.types'

interface GetProductsParams {
  limit: number
  skip: number
  category?: string
  q?: string
  sortBy?: 'price'
  order?: 'asc' | 'desc'
}

export async function getProducts(
  params: GetProductsParams
): Promise<ProductsResponse> {
  let url: string
  
  if (params.category) {
    // Use category-specific endpoint: /products/category/{category}
    url = `${API.BASE_URL}${API.ENDPOINTS.PRODUCTS}/category/${params.category}`
  } else {
    const searchParams = new URLSearchParams({
      limit: String(params.limit),
      skip: String(params.skip),
    })

    if (params.sortBy) {
      searchParams.append('sortBy', params.sortBy)
    }

    if (params.order) {
      searchParams.append('order', params.order)
    }

    if (params.q) {
      searchParams.append('q', params.q)
      // Use search endpoint: /products/search?q={query}
      url = `${API.BASE_URL}${API.ENDPOINTS.SEARCH}?${searchParams}`
    } else {
      // Use general products endpoint: /products
      url = `${API.BASE_URL}${API.ENDPOINTS.PRODUCTS}?${searchParams}`
    }
  }

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection and try again.')
    }

    if (error instanceof Error) {
      throw error
    }

    throw new Error('An unexpected error occurred. Please try again.')
  }
}

export async function getProductsCategoryList(): Promise<CategoryListResponse> {
  const url = `${API.BASE_URL}${API.ENDPOINTS.CATEGORY_LIST}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch category list: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection and try again.')
    }

    if (error instanceof Error) {
      throw error
    }

    throw new Error('An unexpected error occurred. Please try again.')
  }
}