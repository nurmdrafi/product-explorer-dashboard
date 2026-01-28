import { ProductDetailSkeleton } from '@components/common/skeleton'
import { useParams } from 'react-router-dom'
import { useProductDetails } from '@features/product-details'
import { ProductDetails } from '@features/product-details'

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)
  const { product, isLoading, error } = useProductDetails(productId)

  if (isLoading) {
    return <ProductDetailSkeleton />
  }

  if (error) {
    return (
      <div className='container'>
        <p className='text-red-500'>
          Error loading product: {(error as Error).message}
        </p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='container'>
        <p className='text-gray-500'>Product not found</p>
      </div>
    )
  }

  return <ProductDetails product={product} />
}
