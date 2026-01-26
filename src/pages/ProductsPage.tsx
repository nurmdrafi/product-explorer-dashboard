import { useEffect, useRef } from 'react'
import { INTERSECTION_THRESHOLD, INFINITE_SCROLL_THRESHOLD } from '@config/app.config'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { useInfiniteProducts, ProductsTable } from '@features/products'
import type { Product } from '@typings/product'

export function ProductsPage() {
  // Set up infinite products fetching
  const {
    loadedData,
    hasMoreToLoad,
    isLoadingMore,
    isLoading,
    error,
    loadMore,
  } = useInfiniteProducts()

  // Set up intersection observer for infinite scrolling
  const { ref, isInView, hasEverIntersected } = useIntersectionObserver({
    threshold: INTERSECTION_THRESHOLD,
    rootMargin: `${INFINITE_SCROLL_THRESHOLD}px`,
  })

  // Keep a ref to loadMore to avoid re-creating effects
  const loadMoreRef = useRef(loadMore)
  useEffect(() => { loadMoreRef.current = loadMore }, [loadMore])

  // MAIN: Trigger loading when intersection observer detects element
  useEffect(() => {
    if (isInView && hasMoreToLoad && !isLoadingMore) {
      loadMoreRef.current()
    }
  }, [isInView, hasMoreToLoad, isLoadingMore])

  // FALLBACK: Trigger when element has ever been intersected
  useEffect(() => {
    if (hasEverIntersected && hasMoreToLoad && !isLoadingMore) {
      loadMoreRef.current()
    }
  }, [hasEverIntersected, hasMoreToLoad, isLoadingMore])

  // Scroll event listener for reliable infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMoreToLoad || isLoadingMore) return
      
      const scrollPosition = window.innerHeight + window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const threshold = 300 // pixels from bottom
      
      if (scrollPosition >= documentHeight - threshold) {
        loadMoreRef.current()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasMoreToLoad, isLoadingMore])

  if (isLoading) {
    return <div className='container mx-auto px-4 py-8'>Loading products...</div>
  }

  if (error) {
    return <div className='container mx-auto px-4 py-8 text-red-500'>Error loading products</div>
  }

  const products: Product[] = loadedData?.flatMap(page => page.products) ?? []

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Products</h1>
      <ProductsTable products={products} />
      <div ref={ref} className='h-24 py-4 flex items-center justify-center'>
        {isLoadingMore && <p className='text-gray-500'>Loading more...</p>}
        {!isLoadingMore && hasMoreToLoad && (
          <p className='text-gray-400 text-sm'>Scroll to load more</p>
        )}
        {!isLoadingMore && !hasMoreToLoad && products.length > 0 && (
          <p className='text-gray-400 text-sm'>No more products to load</p>
        )}
      </div>
    </div>
  )
}
