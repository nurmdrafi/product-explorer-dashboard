import { lazy, Suspense } from 'react'
import { useInfiniteProducts } from '@features/products'
import { ProductList } from '@features/products/components/ProductList'
import { getErrorMessage } from '@utils/error'

const ErrorState = lazy(() =>
  import('@components/common/errors').then(m => ({ default: m.ErrorState }))
)

export function ProductsPage() {
  const {
    products,
    total,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteProducts()

  if (error) {
    return (
      <Suspense fallback={<div className='flex items-center justify-center min-h-screen'>
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

  return (
    <div className='container'>
      <h1 className='text-3xl font-bold mb-6'>Products</h1>

      <ProductList
        products={products}
        isLoading={isLoading}
        error={error}
        total={total}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        showFilters={true}
        showCategoryFilter={true}
      />
    </div>
  )
}
