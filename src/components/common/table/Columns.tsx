import type { Column } from '@typings/table.types'
import type { Product } from '@typings/product.types'
import { useCurrency } from '@contexts/CurrencyContext'
import { formatPrice, getCurrencySymbol } from '@utils/currency'
import { StarRating } from '@components/common/StarRating'
import { StockBadge } from '@components/common/StockBadge'
import { Link } from 'react-router-dom'

function PriceCell({ price }: { price: number }) {
  const { currency } = useCurrency()
  return <span className='font-semibold'>{formatPrice(price, currency)}</span>
}

function PriceHeader() {
  const { currency } = useCurrency()
  const symbol = getCurrencySymbol(currency)
  return <span>Price ({symbol})</span>
}

export const Columns: Column<Product>[] = [
  {
    key: 'product',
    header: 'Product',
    render: (_value, product) => (
      <div className='flex items-center gap-3'>
        <img
          src={product.thumbnail}
          alt={product.title}
          loading='lazy'
          className='w-12 h-12 object-cover rounded-md'
        />
        <span className='font-medium text-gray-900'>{product.title}</span>
      </div>
    ),
  },
  {
    key: 'category',
    header: 'Category',
    render: value => {
      const category = value as string
      return <span>{category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')}</span>
    },
  },
  {
    key: 'price',
    header: <PriceHeader />,
    render: value => <PriceCell price={value as number} />,
  },
  {
    key: 'stock',
    header: 'Stock',
    render: (_value, product) => <StockBadge stock={product.stock} />,
  },
  {
    key: 'rating',
    header: 'Rating',
    render: value => <StarRating rating={value as number} />,
  },
  {
    key: 'actions',
    header: 'Actions',
    render: (_value, product) => (
      <Link
        to={`/products/${product.id}`}
        className='inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium
         text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50
         transition-colors duration-200'
      >
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943
             9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
          />
        </svg>
        View
      </Link>
  )
  }
]
