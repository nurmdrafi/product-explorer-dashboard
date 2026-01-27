import { CategoriesList } from '@features/categories'
import { useNavigate } from 'react-router-dom'
import { useProductFilters } from '@store/features/products'

import { ROUTE } from '@config/app.config'

export function CategoriesPage() {
  const navigate = useNavigate()
  const { setCategory } = useProductFilters()

  const handleCategoryClick = (category: string) => {
    // Navigate to /products (category is stored in Zustand, not URL)
    navigate(ROUTE.PRODUCTS)
    // Update Zustand state to set the category
    setCategory(category)
  }

  return (
    <div className='container'>
      <h1 className='text-3xl font-bold mb-6'>Categories</h1>
      <CategoriesList onCategoryClick={handleCategoryClick} />
    </div>
  )
}
