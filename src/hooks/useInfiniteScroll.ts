import { useEffect, useRef } from 'react'
import { INTERSECTION } from '@config/app.config'

interface UseInfiniteScrollOptions {
  onLoadMore: () => void
  hasMore: boolean
  isLoading: boolean
}

export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
}: UseInfiniteScrollOptions) {
  const scrollTriggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollTrigger = scrollTriggerRef.current
    if (!scrollTrigger) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore()
        }
      },
      {
        threshold: INTERSECTION.THRESHOLD,
        rootMargin: `${INTERSECTION.ROOT_MARGIN}px`,
      }
    )

    observer.observe(scrollTrigger)

    return () => {
      observer.disconnect()
    }
  }, [onLoadMore, hasMore, isLoading])

  return scrollTriggerRef
}