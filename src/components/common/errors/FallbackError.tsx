import { useNavigate } from 'react-router-dom'
import { ROUTE } from '@config/app.config'

interface Props {
  error: Error
  resetError: () => void
}

export function FallbackError({ error, resetError }: Props) {
  const navigate = useNavigate()

  const handleGoHome = (): void => {
    navigate(ROUTE.PRODUCTS)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center'>
        <div className='text-red-500 mb-4'>
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
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
        </div>

        <h1 className='text-2xl font-bold text-gray-900 mb-2'>
          Something went wrong
        </h1>

        <p className='text-gray-600 mb-6'>
          {error.message || 'An unexpected error occurred'}
        </p>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <button
            onClick={resetError}
            className='inline-flex items-center justify-center px-4 py-2
              border border-transparent rounded-md shadow-sm text-sm font-medium
              text-white bg-blue-600 hover:bg-blue-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 min-h-11'
          >
            Try Again
          </button>
          <button
            onClick={handleGoHome}
            className='inline-flex items-center justify-center px-4 py-2
              border border-gray-300 rounded-md shadow-sm text-sm font-medium
              text-gray-700 bg-white hover:bg-gray-50 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 min-h-11'
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}
