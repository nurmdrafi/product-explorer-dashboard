import type { Product } from '@typings/product.types'

interface ProductAdditionalInfoProps {
  product: Product
}

export function ProductAdditionalInfo({ product }: ProductAdditionalInfoProps) {
  const hasInfo =
    product.brand ||
    product.sku ||
    product.weight ||
    product.dimensions ||
    product.warrantyInformation ||
    product.shippingInformation ||
    product.returnPolicy

  if (!hasInfo) return null

  return (
    <div className='mt-8 md:mt-12 border-t border-gray-200 pt-6 md:pt-8'>
      <h2 className='text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6'>
        Additional Information
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
        {product.brand && (
          <div className='space-y-1'>
            <span className='text-xs md:text-sm text-gray-500'>Brand</span>
            <p className='text-sm md:text-base font-medium text-gray-900'>{product.brand}</p>
          </div>
        )}
        {product.sku && (
          <div className='space-y-1'>
            <span className='text-xs md:text-sm text-gray-500'>SKU</span>
            <p className='text-sm md:text-base font-medium text-gray-900'>{product.sku}</p>
          </div>
        )}
        {product.weight && (
          <div className='space-y-1'>
            <span className='text-xs md:text-sm text-gray-500'>Weight</span>
            <p className='text-sm md:text-base font-medium text-gray-900'>{product.weight}g</p>
          </div>
        )}
        {product.dimensions && (
          <div className='space-y-1'>
            <span className='text-xs md:text-sm text-gray-500'>Dimensions</span>
            <p className='text-sm md:text-base font-medium text-gray-900'>
              {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
            </p>
          </div>
        )}
        {product.warrantyInformation && (
          <div className='space-y-1'>
            <span className='text-xs md:text-sm text-gray-500'>Warranty</span>
            <p className='text-sm md:text-base font-medium text-gray-900'>{product.warrantyInformation}</p>
          </div>
        )}
        {product.shippingInformation && (
          <div className='space-y-1'>
            <span className='text-xs md:text-sm text-gray-500'>Shipping</span>
            <p className='text-sm md:text-base font-medium text-gray-900'>{product.shippingInformation}</p>
          </div>
        )}
        {product.returnPolicy && (
          <div className='space-y-1'>
            <span className='text-xs md:text-sm text-gray-500'>Return Policy</span>
            <p className='text-sm md:text-base font-medium text-gray-900'>{product.returnPolicy}</p>
          </div>
        )}
      </div>
    </div>
  )
}
