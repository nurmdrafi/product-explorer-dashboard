import type { CardSkeletonProps, CategoryGroupSkeletonProps } from '@typings/skeleton.types'

function CategoryCardSkeleton() {
  return (
    <div className='rounded-lg border border-gray-200 bg-white p-4'>
      <div className='h-4 bg-gray-200 rounded animate-pulse w-24 mx-auto' />
    </div>
  )
}

export function CardSkeleton({ count = 10 }: CardSkeletonProps) {
  return (
    <div
      className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
      aria-busy='true'
      aria-label='Loading categories'
    >
      {[...Array(count)].map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function CategoryGroupSkeleton({
  groups = 5,
  cardsPerGroup = 3
}: CategoryGroupSkeletonProps) {
  return (
    <div className='flex gap-6' aria-busy='true' aria-label='Loading category groups'>
      <div className='flex-1 space-y-4'>
        {[...Array(groups)].map((_, groupIndex) => {
          return (
            <div key={groupIndex} className='space-y-2'>
              <div className='h-6 bg-gray-200 rounded animate-pulse w-8 px-1' />
              <div className='h-px bg-gray-200' />
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                {[...Array(cardsPerGroup)].map((_, cardIndex) => (
                  <CategoryCardSkeleton key={`${groupIndex}-${cardIndex}`} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
