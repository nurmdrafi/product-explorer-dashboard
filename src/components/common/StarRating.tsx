interface StarRatingProps {
  rating: number
  max?: number
}

export function StarRating({ rating, max = 5 }: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className='flex items-center gap-0.5'>
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className='w-4 h-4 text-yellow-400 fill-current' viewBox='0 0 20 20'>
          <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className='w-4 h-4 text-yellow-400 fill-current' viewBox='0 0 20 20'>
          <defs>
            <linearGradient id='half'>
              <stop offset='50%' stopColor='currentColor' />
              <stop offset='50%' stopColor='#d1d5db' stopOpacity='1' />
            </linearGradient>
          </defs>
          <path fill='url(#half)' 
          d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className='w-4 h-4 text-gray-300 fill-current' viewBox='0 0 20 20'>
          <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
        </svg>
      ))}
    </div>
  )
}
