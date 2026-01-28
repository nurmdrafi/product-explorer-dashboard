import { lazy, Suspense, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearch } from '@features/search'
import { useProductFilters } from '@store/features/products'
import { TableSkeleton } from '@components/common/skeleton'

import { ProductList } from '@features/products/components/ProductList'

const ErrorState = lazy(() =>
  import('@components/common/errors').then(m => ({ default: m.ErrorState }))
)

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
        <TableSkeleton rows={10} columns={6} />
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
        <Suspense fallback={<div className='flex items-center justify-center min-h-64'>
          <div className='w-12 h-12 border-4 border-[#14b8a6] border-t-transparent rounded-full animate-spin' />
        </div>}>
          <ErrorState
            title='Error Loading Search Results'
            message={(error as Error).message || 'Unable to load search results. Please try again later.'}
            showBackButton={false}
            onRetry={() => window.location.reload()}
          />
        </Suspense>
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
