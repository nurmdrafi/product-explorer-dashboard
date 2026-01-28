import { lazy, Suspense } from 'react'
import { Table } from '@components/common/table/Table'
import { Columns } from '@components/common/table/Columns'
import { useProductFilters } from '@store/features/products'
import { getErrorMessage } from '@utils/error'

import { useGetProductsCategoryListData } from '@features/products/hooks/useGetProductsCategoryListData'
import { useSearchParams } from 'react-router-dom'
import { useInfiniteScroll } from '@hooks/useInfiniteScroll'
import type { Product } from '@typings/product.types'

const TableSkeleton = lazy(() =>
  import('@components/common/skeleton').then(m => ({ default: m.TableSkeleton }))
)
const ErrorState = lazy(() =>
  import('@components/common/errors').then(m => ({ default: m.ErrorState }))
)

interface ProductListProps {
  products: Product[]
  isLoading?: boolean
  error?: unknown
  total?: number
  hasQuery?: boolean
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  fetchNextPage?: () => void
  showFilters?: boolean
  showCategoryFilter?: boolean
}

export function ProductList({
  products,
  isLoading = false,
  error,
  total = 0,
  hasQuery = true,
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage,
  showFilters = true,
  showCategoryFilter = false,
}: ProductListProps) {
  
  // Get data from store
  const { sortBy, order, category, setSortBy, setOrder, setCategory, resetFilters } = useProductFilters()
  
  // Get categories list data
  const { categories } = useGetProductsCategoryListData()
  
  // States
  const [searchParams, setSearchParams] = useSearchParams()
  const currentSortBy = sortBy || ''
  const currentOrder = order || ''
  const currentCategory = category || ''

  // Infinite scroll hook
  const scrollTriggerRef = useInfiniteScroll({
    onLoadMore: fetchNextPage || (() => {}),
    hasMore: !!hasNextPage,
    isLoading: isFetchingNextPage,
  })

  // Sort is disabled when category is selected (API limitation)
  const isSortDisabled = !!currentCategory

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'all' ? null : e.target.value
    setCategory(value)

    // Reset sort when category is selected
    if (value && sortBy) {
      // Remove category filter from URL
      const newParams = new URLSearchParams(searchParams)
      newParams.delete('sortBy')
      newParams.delete('order')
      setSearchParams(newParams)
    }
  }

  const handleSortChange = (sortBy: 'price', order: 'asc' | 'desc') => {
    setSortBy(sortBy)
    setOrder(order)

    // Reset category when sort is selected
    if (currentCategory) {
      setCategory(null)
    }

    // Update URL with sort parameters
    const newParams = new URLSearchParams(searchParams)
    newParams.set('sortBy', sortBy)
    newParams.set('order', order)
    setSearchParams(newParams)
  }

  // Clear all filters
  const clearFilters = () => {
    resetFilters()
    
    // Clear URL parameters
    const newParams = new URLSearchParams(searchParams)
    newParams.delete('sortBy')
    newParams.delete('order')
    setSearchParams(newParams)
  }

  // Show no query state
  if (!hasQuery) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-500 text-lg'>Enter a search term to find products</p>
      </div>
    )
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className='space-y-4'>
        {showFilters && (
          <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
            <div className='space-y-2'>
              <div className='h-7 bg-gray-200 rounded animate-pulse w-40' />
              <div className='h-4 bg-gray-200 rounded animate-pulse w-24' />
            </div>
            {showCategoryFilter && (
              <div className='h-11 bg-gray-200 rounded animate-pulse w-full sm:w-64' />
            )}
          </div>
        )}
        <Suspense fallback={<div className='h-64 animate-pulse bg-gray-100 rounded' />}>
          <TableSkeleton rows={10} columns={6} />
        </Suspense>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <Suspense fallback={<div className='flex items-center justify-center min-h-64'>
        <div className='w-12 h-12 border-4 border-[#14b8a6] border-t-transparent rounded-full animate-spin' />
      </div>}>
        <ErrorState
          title='Error Loading Products'
          message={getErrorMessage(error) || 'Unable to load products. Please try again later.'}
          onRetry={() => window.location.reload()}
        />
      </Suspense>
    )
  }

  // Show no results state
  if (products?.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-500 text-lg'>No products found</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {showFilters && (
        <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900'>All Products</h2>
            <p className='text-sm text-gray-500'>{total} items</p>
          </div>

          <div className='flex justify-start items-center flex-wrap gap-3 w-full sm:w-auto'>
            {/* Category Filter */}
            {showCategoryFilter && (
              <div className='w-full sm:w-auto'>
                <select
                  id='category-filter'
                  value={currentCategory ?? 'all'}
                  onChange={handleCategoryChange}
                  className='w-full sm:w-64 px-3 py-2 border border-gray-300
                   rounded-md shadow-sm focus:outline-none focus:ring-2
                   focus:ring-blue-500 focus:border-blue-500 min-h-11'
                >
                  <option value='all'>All Categories</option>
                  {categories?.map(category => (
                    <option key={category} value={category}>
                      {category?.charAt(0)?.toUpperCase() + category?.slice(1)?.replace(/-/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Sort Buttons */}
            <div className='flex gap-2 w-full sm:w-auto'>
              <button
                onClick={() => handleSortChange('price', 'asc')}
                disabled={isSortDisabled}
                className={`flex-1 sm:flex-none px-3 py-2 text-sm font-medium
                  rounded-md border min-h-11 ${
                  currentSortBy === 'price' && currentOrder === 'asc'
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : isSortDisabled
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Price: Low to High
              </button>
              <button
                onClick={() => handleSortChange('price', 'desc')}
                disabled={isSortDisabled}
                className={`flex-1 sm:flex-none px-3 py-2 text-sm font-medium
                  rounded-md border min-h-11 ${
                  currentSortBy === 'price' && currentOrder === 'desc'
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : isSortDisabled
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Price: High to Low
              </button>
            </div>

          {/* Clear Filters Button */}
          {(currentSortBy || currentOrder || currentCategory) && (
            <button
              onClick={clearFilters}
              className='w-full sm:w-auto px-2 py-0 text-sm font-medium
                text-white bg-red-600 rounded-md hover:bg-red-700 min-h-11'
            >
              Clear Filters
            </button>
          )}
          </div>
        </div>
      )}

      {/* Products Table */}
      <Table columns={Columns} data={products} keyExtractor={product => product.id} />

      {/* Infinite scroll trigger */}
      {fetchNextPage && (
        <div
          ref={scrollTriggerRef}
          className='h-20 flex items-center justify-center'
          aria-live='polite'
          aria-busy={isFetchingNextPage}
        >
          {isFetchingNextPage && (
            <div className='w-full'>
              <Suspense fallback={<div className='h-20 animate-pulse bg-gray-100 rounded' />}>
                <TableSkeleton rows={3} columns={6} />
              </Suspense>
            </div>
          )}
          
          {!isFetchingNextPage && !hasNextPage && products?.length > 0 && (
            <p className='text-gray-400 text-sm'>
              You&rsquo;ve reached the end of the list
            </p>
          )}
        </div>
      )}
    </div>
  )
}