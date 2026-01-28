import { ProductDetailSkeleton } from '@components/common/skeleton'
import { ErrorState } from '@components/common/errors'
import { useParams } from 'react-router-dom'
import { useProductDetails } from '@features/product-details'
import { ProductDetails } from '@features/product-details'
import { EmptyState } from '@components/common/EmptyState'

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)
  const { product, isLoading, error } = useProductDetails(productId)

  if (isLoading) {
    return <ProductDetailSkeleton />
  }

  if (error) {
    return (
      <ErrorState
        title='Error Loading Product'
        message={(error as Error).message || 'Unable to load product details. Please try again later.'}
        onRetry={() => window.location.reload()}
      />
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
