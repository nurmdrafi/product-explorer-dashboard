import { useInfiniteProducts } from '@features/products'
import { ProductList } from '@features/products/components/ProductList'
import { ErrorState } from '@components/common/errors'

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
      <ErrorState
        title='Error Loading Products'
        message={(error as Error).message || 'Unable to load products. Please try again later.'}
        onRetry={() => window.location.reload()}
      />
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
