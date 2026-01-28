interface ErrorActionsProps {
  onRetry?: () => void
  showBackButton?: boolean
  onBack: () => void
}

export function ErrorActions({ onRetry, showBackButton, onBack }: ErrorActionsProps) {
  return (
    <div className='flex flex-col sm:flex-row gap-3 justify-center'>
      {onRetry && (
        <button
          onClick={onRetry}
          className='inline-flex items-center justify-center px-4 py-2
            border border-transparent rounded-md shadow-sm text-sm font-medium
            text-white bg-blue-600 hover:bg-blue-700 focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 min-h-11'
        >
          Try Again
        </button>
      )}
      {showBackButton && (
        <button
          onClick={onBack}
          className='inline-flex items-center justify-center px-4 py-2
            border border-gray-300 rounded-md shadow-sm text-sm font-medium
            text-gray-700 bg-white hover:bg-gray-50 focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 min-h-11'
        >
          Back to Products
        </button>
      )}
    </div>
  )
}
