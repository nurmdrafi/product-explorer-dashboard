import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE } from '@config/app.config'
import type { Product } from '@typings/product.types'
import { useCurrency } from '@contexts/CurrencyContext'
import { formatPrice } from '@utils/currency'
import { StarRating } from '@components/common/StarRating'
import { StockBadge } from '@components/common/StockBadge'

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { currency } = useCurrency()
  const [selectedImage, setSelectedImage] = useState(product.thumbnail)

  return (
    <div className='container max-w-6xl px-4 py-6 md:py-8'>
      <Link
        to={ROUTE.PRODUCTS}
        className='inline-flex items-center gap-1 mb-4 md:mb-6 text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base'
      >
        <svg className='w-4 h-4 md:w-5 md:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
        </svg>
        Back to Products
      </Link>

      <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-6 md:gap-8 lg:gap-12'>
        <div className='space-y-3 md:space-y-4'>
          <img
            src={selectedImage}
            alt={product.title}
            className='w-full h-auto rounded-lg border border-gray-200'
          />
          {product.images.length > 0 && (
            <div className='grid grid-cols-4 sm:grid-cols-5 gap-1.5 md:gap-2'>
              {[product.thumbnail, ...product.images.slice(0, 3)].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  onClick={() => setSelectedImage(image)}
                  className={`w-full h-16 md:h-20 object-cover rounded border cursor-pointer transition-all ${
                    selectedImage === image
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-blue-500'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className='space-y-4 md:space-y-6'>
          <div className='space-y-2 md:space-y-3'>
            <div className='flex flex-wrap items-center gap-2 md:gap-3'>
              <span className='px-2 md:px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full'>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace(/-/g, ' ')}
              </span>
              <StockBadge stock={product.stock} />
            </div>
            <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight'>
              {product.title}
            </h1>
            <div className='flex items-center gap-2 md:gap-4'>
              <StarRating rating={product.rating} />
              <span className='text-xs md:text-sm text-gray-500'>({product.rating} out of 5)</span>
            </div>
          </div>

          <div>
            <p className='text-2xl md:text-3xl font-bold text-gray-900'>
              {formatPrice(product.price, currency)}
            </p>
          </div>

          <div className='space-y-3 md:space-y-4'>
            <h3 className='text-base md:text-lg font-semibold text-gray-900'>Description</h3>
            <p className='text-sm md:text-base text-gray-600 leading-relaxed'>{product.description}</p>
          </div>

          {product.tags.length > 0 && (
            <div className='space-y-2'>
              <span className='text-sm font-medium text-gray-700'>Tags</span>
              <div className='flex flex-wrap gap-1.5 md:gap-2'>
                {product.tags.map(tag => (
                  <span
                    key={tag}
                    className='px-2 md:px-3 py-1 bg-indigo-100 text-indigo-700 text-xs md:text-sm font-medium rounded-md'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className='flex flex-col sm:flex-row gap-2 md:gap-3 pt-4'>
            <button
              className='flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-[#14b8a6] text-white text-sm
               md:text-base font-medium rounded-lg hover:bg-[#0d9488] transition-colors shadow-sm'
            >
              Add to Cart
            </button>
            <button
              className='flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-violet-600 text-white text-sm
               md:text-base font-medium rounded-lg hover:bg-violet-700 transition-colors shadow-sm'
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

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
    </div>
  )
}