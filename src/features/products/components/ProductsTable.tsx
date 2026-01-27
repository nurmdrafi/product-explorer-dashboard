import { Table } from '@components/common/table/Table'
import type { Product } from '@typings/product'
import { productsColumns } from './ProductsColumns'
import { useProductFilters } from '@store/index'
import { useSearchParams } from 'react-router-dom'

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { sortBy, order, category, setSortBy, setOrder, setCategory, resetFilters } = useProductFilters()

  const currentSortBy = sortBy || ''
  const currentOrder = order || ''
  const currentCategory = category || ''

  // Sort is disabled when category is selected (API limitation)
  const isSortDisabled = !!currentCategory

  const handleSortChange = (sortBy: 'price', order: 'asc' | 'desc') => {
    setSortBy(sortBy)
    setOrder(order)

    // Reset category when sort is selected (mutual exclusivity - API limitation)
    if (currentCategory) {
      setCategory(null)
    }

    // Update URL with sort parameters
    const newParams = new URLSearchParams(searchParams)
    newParams.set('sortBy', sortBy)
    newParams.set('order', order)
    setSearchParams(newParams)
  }

  const clearFilters = () => {
    resetFilters()
    
    // Clear URL parameters
    const newParams = new URLSearchParams(searchParams)
    // newParams.delete('q')
    newParams.delete('sortBy')
    newParams.delete('order')
    setSearchParams(newParams)
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2'>
            <button
              onClick={() => handleSortChange('price', 'asc')}
              disabled={isSortDisabled}
              className={`px-3 py-2 text-sm font-medium rounded-md border ${
                currentSortBy === 'price' && currentOrder === 'asc'
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : isSortDisabled
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              title={isSortDisabled ? 'Sorting is not available when filtering by category (API limitation)' : 'Sort by price: low to high'}
            >
              Price: Low to High
            </button>
            <button
              onClick={() => handleSortChange('price', 'desc')}
              disabled={isSortDisabled}
              className={`px-3 py-2 text-sm font-medium rounded-md border ${
                currentSortBy === 'price' && currentOrder === 'desc'
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : isSortDisabled
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              title={isSortDisabled ? 'Sorting is not available when filtering by category (API limitation)' : 'Sort by price: high to low'}
            >
              Price: High to Low
            </button>
          </div>

        </div>

        {/* Clear Filters Button */}
        {(currentSortBy || currentOrder) && (
          <button
            onClick={clearFilters}
            className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Products Table */}
      <Table columns={productsColumns} data={products} keyExtractor={product => product.id} />
    </div>
  )
}
