export function ProductDetailSkeleton() {
  return (
    <div className='container max-w-6xl px-4 py-6 md:py-8' aria-busy='true' aria-label='Loading product details'>
      <div className='h-4 bg-gray-200 rounded animate-pulse w-32 mb-4 md:mb-6' />

      <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-6 md:gap-8 lg:gap-12'>
        <div className='space-y-3 md:space-y-4'>
          <div className='w-full aspect-square bg-gray-200 rounded-lg animate-pulse' />
          <div className='grid grid-cols-4 sm:grid-cols-5 gap-1.5 md:gap-2'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='w-full h-16 md:h-20 bg-gray-200 rounded animate-pulse' />
            ))}
          </div>
        </div>

        <div className='space-y-4 md:space-y-6'>
          <div className='space-y-2 md:space-y-3'>
            <div className='flex flex-wrap items-center gap-2 md:gap-3'>
              <div className='h-6 w-20 bg-gray-200 rounded-full animate-pulse' />
              <div className='h-6 w-16 bg-gray-200 rounded-full animate-pulse' />
            </div>
            <div className='h-8 bg-gray-200 rounded animate-pulse w-3/4' />
            <div className='h-8 bg-gray-200 rounded animate-pulse w-1/2' />
            <div className='flex items-center gap-2 md:gap-4'>
              <div className='flex gap-0.5'>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className='w-4 h-4 bg-gray-200 rounded animate-pulse' />
                ))}
              </div>
              <div className='h-4 bg-gray-200 rounded animate-pulse w-24' />
            </div>
          </div>

          <div className='h-10 bg-gray-200 rounded animate-pulse w-32' />

          <div className='space-y-3 md:space-y-4'>
            <div className='h-5 bg-gray-200 rounded animate-pulse w-28' />
            <div className='space-y-2'>
              <div className='h-4 bg-gray-200 rounded animate-pulse w-full' />
              <div className='h-4 bg-gray-200 rounded animate-pulse w-full' />
              <div className='h-4 bg-gray-200 rounded animate-pulse w-2/3' />
            </div>
          </div>

          <div className='space-y-2'>
            <div className='h-4 bg-gray-200 rounded animate-pulse w-16' />
            <div className='flex flex-wrap gap-1.5 md:gap-2'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='h-7 w-16 bg-gray-200 rounded-md animate-pulse' />
              ))}
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-2 md:gap-3 pt-4'>
            <div className='flex-1 h-11 bg-gray-200 rounded-lg animate-pulse' />
            <div className='flex-1 h-11 bg-gray-200 rounded-lg animate-pulse' />
          </div>
        </div>
      </div>

      <div className='mt-8 md:mt-12 border-t border-gray-200 pt-6 md:pt-8'>
        <div className='h-6 bg-gray-200 rounded animate-pulse w-48 mb-4 md:mb-6' />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='space-y-1'>
              <div className='h-4 bg-gray-200 rounded animate-pulse w-16' />
              <div className='h-5 bg-gray-200 rounded animate-pulse w-24' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
