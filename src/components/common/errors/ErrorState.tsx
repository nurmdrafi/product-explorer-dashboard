import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '@config/app.config'
import { CenteredCard } from '@components/common/CenteredCard'

const ErrorActions = lazy(() =>
  import('./ErrorActions').then(m => ({ default: m.ErrorActions }))
)

interface Props {
  title?: string
  message?: string
  showBackButton?: boolean
  onRetry?: () => void
}

export function ErrorState({
  title = 'Error Loading Data',
  message,
  showBackButton = true,
  onRetry,
}: Props) {
  const navigate = useNavigate()

  return (
    <CenteredCard>
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
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667
              1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77
              1.333.192 3 1.732 3z'
          />
        </svg>
      </div>

      <h1 className='text-2xl font-bold text-gray-900 mb-2'>
        {title}
      </h1>

      <p className='text-gray-600 mb-6'>
        {message || 'Unable to load data. Please try again later.'}
      </p>

      <Suspense fallback={<div className='h-11' />}>
        <ErrorActions onRetry={onRetry} showBackButton={showBackButton} onBack={() => navigate(ROUTE.PRODUCTS)} />
      </Suspense>
    </CenteredCard>
  )
}
