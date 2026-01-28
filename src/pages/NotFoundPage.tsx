import { useNavigate } from 'react-router-dom'
import { ROUTE } from '@config/app.config'
import { CenteredCard } from '@components/common/CenteredCard'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <CenteredCard>
      <div className='text-blue-500 mb-4'>
        <svg
          className='mx-auto h-16 w-16'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
            d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      </div>

      <h1 className='text-2xl font-bold text-gray-900 mb-2'>
        404 - Page Not Found
      </h1>

      <p className='text-gray-600 mb-6'>
        The page you are looking for does not exist or has been moved.
      </p>

      <button
        onClick={() => navigate(ROUTE.PRODUCTS)}
        className='inline-flex items-center justify-center px-4 py-2
          border border-transparent rounded-md shadow-sm text-sm font-medium
          text-white bg-blue-600 hover:bg-blue-700 focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 min-h-11'
      >
        Back to Products
      </button>
    </CenteredCard>
  )
}
