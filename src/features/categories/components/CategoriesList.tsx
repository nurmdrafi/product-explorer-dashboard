import { useCategories } from '@features/categories'
import { ROUTE } from '@config/app.config'

export function CategoriesList() {
  const { categories, isLoading, error } = useCategories()
  if (isLoading) {
    return (
      <div className='flex justify-center p-8'>
        <div className='h-8 w-8 animate-spin rounded-full border-4
         border-gray-300 border-t-blue-600' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='rounded-lg border border-red-200 bg-red-50 p-4 text-red-800'>
        Failed to load categories: {(error as Error).message}
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
      {categories?.map(category => (
        <a
          key={category?.slug}
          href={`${ROUTE.PRODUCTS}?category=${encodeURIComponent(category?.slug)}`}
          className='rounded-lg border border-gray-200 bg-white p-4 text-center transition-colors
           hover:bg-gray-50 hover:border-gray-300'
        >
          <span className='block text-sm font-medium capitalize text-gray-900'>
            {category?.name}
          </span>
        </a>
      ))}
    </div>
  )
}
