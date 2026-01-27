import { CategoriesList } from '@features/categories'

export function CategoriesPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Categories</h1>
      <CategoriesList />
    </div>
  )
}
