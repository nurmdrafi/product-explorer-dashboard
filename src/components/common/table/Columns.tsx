import type { Column } from '@typings/table.types'
import type { Product } from '@typings/product.types'
import { Link } from 'react-router-dom'

export const Columns: Column<Product>[] = [
  { key: 'id', header: 'ID' },
  {
    key: 'thumbnail',
    header: 'Image',
    render: (_value, product) => (
      <img
        src={product.thumbnail}
        alt={product.title}
        className='w-12 h-12 object-cover rounded'
      />
    ),
  },
  { key: 'title', header: 'Title' },
  { key: 'price', header: 'Price ($)' },
  { key: 'category', header: 'Category' },
  { key: 'rating', header: 'Rating' },
  {
    key: 'actions',
    header: 'Actions',
    render: (_value, product) => (
      <Link
        to={`/products/${product.id}`}
        className='inline-block px-4 py-2 text-sm font-medium text-white bg-green-600
         rounded-md hover:bg-green-800'
      >
        View
      </Link>
    ),
  },
]
