import { lazy, Suspense } from 'react'
import { ProductDetailSkeleton } from '@components/common/skeleton'
import { useParams } from 'react-router-dom'
import { useProductDetails } from '@features/product-details'
import { ProductDetails } from '@features/product-details'
import { EmptyState } from '@components/common/EmptyState'
import { getErrorMessage } from '@utils/error'

const ErrorState = lazy(() =>
  import('@components/common/errors').then(m => ({ default: m.ErrorState }))
)

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)
  const { product, isLoading, error } = useProductDetails(productId)

  if (isLoading) {
    return <ProductDetailSkeleton />
  }

  if (error) {
    return (
      <Suspense fallback={<div className='flex items-center justify-center min-h-screen'>
        <div className='w-12 h-12 border-4 border-[#14b8a6] border-t-transparent rounded-full animate-spin' />
      </div>}>
        <ErrorState
          title='Error Loading Product'
          message={getErrorMessage(error) || 'Unable to load product details. Please try again later.'}
          onRetry={() => window.location.reload()}
        />
      </Suspense>
    )
  }

  if (!product) {
    return (
      <EmptyState
        title='Product Not Found'
        message='The product you are looking for does not exist or has been removed.'
      />
    )
  }

  return <ProductDetails product={product} />
}
