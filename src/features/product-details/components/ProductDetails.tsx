import { Link } from 'react-router-dom'
import { ROUTE } from '@config/app.config'
import type { Product } from '@typings/product'

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Link
        to={ROUTE.PRODUCTS}
        className='inline-block mb-6 text-green-600 hover:text-green-800'
      >
        ← Back to Products
      </Link>

      <div className='grid md:grid-cols-2 gap-8'>
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className='w-full h-auto rounded-lg'
          />
          {product.images.length > 1 && (
            <div className='grid grid-cols-4 gap-2 mt-4'>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className='w-full h-20 object-cover rounded'
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className='text-3xl font-bold mb-4'>{product.title}</h1>
          <p className='text-gray-600 mb-6'>{product.description}</p>

          <div className='mb-6'>
            <span className='text-3xl font-bold text-gray-900'>
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <span className='ml-3 text-sm text-green-600'>
                {product.discountPercentage}% off
              </span>
            )}
          </div>

          <div className='grid grid-cols-2 gap-4 mb-6'>
            <div>
              <span className='text-gray-500'>Category</span>
              <p className='font-medium'>{product.category}</p>
            </div>
            <div>
              <span className='text-gray-500'>Brand</span>
              <p className='font-medium'>{product.brand || 'N/A'}</p>
            </div>
            <div>
              <span className='text-gray-500'>Rating</span>
              <p className='font-medium'>{product.rating} / 5</p>
            </div>
            <div>
              <span className='text-gray-500'>Stock</span>
              <p className='font-medium'>{product.stock} units</p>
            </div>
            <div>
              <span className='text-gray-500'>SKU</span>
              <p className='font-medium'>{product.sku || 'N/A'}</p>
            </div>
            <div>
              <span className='text-gray-500'>Availability</span>
              <p className='font-medium'>{product.availabilityStatus || 'N/A'}</p>
            </div>
          </div>

          {product.tags.length > 0 && (
            <div className='mb-6'>
              <span className='text-gray-500'>Tags</span>
              <div className='flex flex-wrap gap-2 mt-2'>
                {product.tags.map(tag => (
                  <span
                    key={tag}
                    className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.weight && (
            <div className='mb-6'>
              <span className='text-gray-500'>Weight</span>
              <p className='font-medium'>{product.weight}g</p>
            </div>
          )}

          {product.warrantyInformation && (
            <div className='mb-6'>
              <span className='text-gray-500'>Warranty</span>
              <p className='font-medium'>{product.warrantyInformation}</p>
            </div>
          )}

          {product.shippingInformation && (
            <div className='mb-6'>
              <span className='text-gray-500'>Shipping</span>
              <p className='font-medium'>{product.shippingInformation}</p>
            </div>
          )}

          {product.returnPolicy && (
            <div className='mb-6'>
              <span className='text-gray-500'>Return Policy</span>
              <p className='font-medium'>{product.returnPolicy}</p>
            </div>
          )}

          {product.minimumOrderQuantity && (
            <div className='mb-6'>
              <span className='text-gray-500'>Min Order Quantity</span>
              <p className='font-medium'>{product.minimumOrderQuantity} units</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}