import { useInfiniteProducts } from '@features/products'
import { ProductList } from '@features/products/components/ProductList'

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

  if (isLoading) {
    return (
      <div className='container'>
        <p className='text-gray-600'>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container'>
        <p className='text-red-500'>
          Error loading products: {error.message}
        </p>
      </div>
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
