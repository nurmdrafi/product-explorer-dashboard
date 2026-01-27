import { useParams } from 'react-router-dom'
import { useProductDetails } from '@features/products'
import { ProductDetails } from '@features/products'

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)
  const { product, isLoading, error } = useProductDetails(productId)

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <p className='text-gray-600'>Loading product details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <p className='text-red-500'>
          Error loading product: {(error as Error).message}
        </p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <p className='text-gray-500'>Product not found</p>
      </div>
    )
  }

  return <ProductDetails product={product} />
}
