import { Link } from 'react-router-dom'
import { ROUTE } from '@config/app.config'

function HomePage() {
  return (
    <div className='text-center'>
      <h1 className='text-4xl font-bold text-gray-900 mb-4'>
        Product Explorer Dashboard
      </h1>
      <p className='text-lg text-gray-600 mb-8'>
        Browse products, search by category, and explore our catalog
      </p>
      <div className='space-y-4'>
        <div className='bg-white rounded-lg p-6 shadow-sm'>
          <h2 className='text-xl font-semibold text-gray-800 mb-2'>Quick Links</h2>
          <div className='space-y-2'>
            <Link to={ROUTE.PRODUCTS} className='block text-blue-600 hover:text-blue-800'>
              /products - View all products
            </Link>
            <Link to={ROUTE.CATEGORIES} className='block text-blue-600 hover:text-blue-800'>
              /products/categories - Browse categories
            </Link>
            <Link to={ROUTE.SETTINGS} className='block text-blue-600 hover:text-blue-800'>
              /settings - Currency settings
            </Link>
          </div>
        </div>
        <div className='bg-gray-100 rounded-lg p-4'></div>
      </div>
    </div>
  )
}

export default HomePage
