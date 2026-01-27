import { useInfiniteScroll } from '@hooks/useInfiniteScroll'
import { useInfiniteProducts, ProductCategoryFilter } from '@features/products'
import { ProductsTable } from '@features/products'

export function ProductsPage() {
  const {
    products,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteProducts()

  const scrollTriggerRef = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasMore: !!hasNextPage,
    isLoading: isFetchingNextPage,
  })

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <p className='text-gray-600'>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <p className='text-red-500'>
          Error loading products: {error.message}
        </p>
      </div>
    )
  }

  const hasProducts = products.length > 0
  const showEndMessage = !isFetchingNextPage && !hasNextPage && hasProducts

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Products</h1>

      <ProductCategoryFilter />

      <ProductsTable products={products} />

      {/* Infinite scroll trigger */}
      <div
        ref={scrollTriggerRef}
        className='h-20 flex items-center justify-center'
        aria-live='polite'
        aria-busy={isFetchingNextPage}
      >
        {isFetchingNextPage && (
          <p className='text-gray-500'>Loading more products...</p>
        )}
        
        {showEndMessage && (
          <p className='text-gray-400 text-sm'>
            You&rsquo;ve reached the end of the list
          </p>
        )}
      </div>
    </div>
  )
}