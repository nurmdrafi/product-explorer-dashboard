import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearch } from '@features/search'
import { useProductFilters } from '@store/features/products'

import { ProductList } from '@features/products/components/ProductList'

export function SearchPage() {
  // States
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  // Get data from store
  const { setSearchQuery, setSortBy, setOrder } = useProductFilters()

  const {
    products,
    total,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    hasQuery,
  } = useSearch()

  // Sync with URL on mount and when URL changes (sort/order params)
  useEffect(() => {
    const query = searchParams.get('q') || ''
    setSearchQuery(query)

    const urlSortBy = searchParams.get('sortBy') as 'price' | null
    const urlOrder = searchParams.get('order') as 'asc' | 'desc' | null
    if (urlSortBy) setSortBy(urlSortBy)
    if (urlOrder) setOrder(urlOrder)
      
  }, [searchParams, setSearchQuery, setSortBy, setOrder])

  // Show no query state
  if (!hasQuery) {
    return (
      <div className='container'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold mb-2'>Search Products</h1>
        </div>
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>Enter a search term to find products</p>
        </div>
      </div>
    )
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className='container'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold mb-2'>Search Products</h1>
          {searchQuery && (
            <p className='text-gray-600'>
              Showing results for <span className='font-medium'>{`"${searchQuery}"`}</span>
            </p>
          )}
        </div>
        <div className='text-center py-12'>Loading...</div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className='container'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold mb-2'>Search Products</h1>
          {searchQuery && (
            <p className='text-gray-600'>
              Showing results for <span className='font-medium'>{`"${searchQuery}"`}</span>
            </p>
          )}
        </div>
        <div className='text-center py-12'>
          <p className='text-red-500 text-lg'>Error loading search results</p>
        </div>
      </div>
    )
  }

  // Show no results state
  if (products.length === 0) {
    return (
      <div className='container'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold mb-2'>Search Products</h1>
          {searchQuery && (
            <p className='text-gray-600'>
              Showing results for <span className='font-medium'>{`"${searchQuery}"`}</span>
            </p>
          )}
        </div>
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>No products found for your search</p>
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-2'>Search Products</h1>
        {searchQuery && (
          <p className='text-gray-600'>
            Showing results for <span className='font-medium'>{`"${searchQuery}"`}</span>
          </p>
        )}
      </div>

      <ProductList
        products={products}
        isLoading={isLoading}
        error={error}
        total={total}
        hasQuery={hasQuery}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        showFilters={true}
      />
    </div>
  )
}
