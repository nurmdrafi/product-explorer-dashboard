
import { useProductFilters } from '@store/index'
import { useGetProductsCategoryListData } from '../hooks/useGetProductsCategoryListData'

export function ProductCategoryFilter() {
  const { categories, isLoading } = useGetProductsCategoryListData()
  const { category, setCategory, sortBy, setSortBy, setOrder } = useProductFilters()

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === 'all' ? null : e.target.value
    setCategory(value)

    // Reset sort when category is selected (mutual exclusivity - API limitation)
    if (value && sortBy) {
      setSortBy(null)
      setOrder(null)
    }
  }

  return (
    <div className='mb-6'>
      <label htmlFor='category-filter' className='block text-sm font-medium text-gray-700 mb-2'>
        Filter by Category
      </label>
      <select
        id='category-filter'
        value={category ?? 'all'}
        onChange={handleCategoryChange}
        disabled={isLoading}
        className='w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed'
      >
        <option value='all'>All Categories</option>
        {categories?.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}
