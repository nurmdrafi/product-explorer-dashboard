import type { Product } from '@typings/product.types'

interface ProductTagsProps {
  product: Product
}

export function ProductTags({ product }: ProductTagsProps) {
  if (product?.tags?.length === 0) return null

  return (
    <div className='space-y-2'>
      <span className='text-sm font-medium text-gray-700'>Tags</span>
      <div className='flex flex-wrap gap-1.5 md:gap-2'>
        {product?.tags?.map(tag => (
          <span
            key={tag}
            className='px-2 md:px-3 py-1 bg-indigo-100 text-indigo-700 text-xs md:text-sm font-medium rounded-md'
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
