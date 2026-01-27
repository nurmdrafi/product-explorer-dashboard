import { useCategories, groupCategoriesByLetter } from '@features/categories'
import type { Category, CategoryGroup } from '@typings/categories.types'

interface CategoriesListProps {
  onCategoryClick?: (category: string) => void
}

export function CategoriesList({ onCategoryClick }: CategoriesListProps) {
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

  const groupedCategories = groupCategoriesByLetter(categories ?? [])

  return (
    <div className='flex gap-6'>
      <div className='flex-1 space-y-4'>
        {groupedCategories.map((group: CategoryGroup) => (
          <div key={group.letter} id={`section-${group.letter}`} className='space-y-2'>
            <h2 className='text-lg font-semibold text-gray-900 px-1'>
              {group.letter}
            </h2>
            <hr className='border-gray-300'/>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
              {group.categories.map((category: Category) => (
                <button
                  key={category?.slug}
                  onClick={() => onCategoryClick?.(String(category?.slug))}
                  className='rounded-lg border border-gray-200 bg-white p-4 text-center transition-colors
                   hover:bg-gray-50 hover:border-gray-300 cursor-pointer'
                >
                  <span className='block text-sm font-medium capitalize text-gray-900'>
                    {category?.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}

        {groupedCategories.length === 0 && (
          <div className='text-center py-12 text-gray-500'>
            No categories available
          </div>
        )}
      </div>
    </div>
  )
}
