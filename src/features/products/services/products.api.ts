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

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`)
  }

  return response.json()
}

export async function getProductsCategoryList(): Promise<CategoryListResponse> {
  const url = `${API.BASE_URL}${API.ENDPOINTS.CATEGORY_LIST}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch category list: ${response.statusText}`)
  }

  return response.json()
}