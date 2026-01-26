import { useEffect, useRef, useState } from 'react'

interface ObserverOptions {
  threshold?: number
  rootMargin?: string
}

interface IntersectionResult {
  ref: React.RefObject<HTMLDivElement | null>
  isInView: boolean
  hasEverIntersected: boolean
}

export function useIntersectionObserver(
  options: ObserverOptions = {}
): IntersectionResult {
  const { threshold = 0.2, rootMargin = '200px' } = options
  const [isInView, setIsInView] = useState(false)
  const [hasEverIntersected, setHasEverIntersected] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Clean up existing observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          const isIntersecting = entry.isIntersecting
          setIsInView(isIntersecting)
          
          // Mark as ever intersected
          if (isIntersecting && !hasEverIntersected) {
            setHasEverIntersected(true)
          }
        },
        { 
          threshold, 
          rootMargin,
          root: null
        }
      )

      observerRef.current = observer
      observer.observe(element)

      // Cleanup
      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect()
          observerRef.current = null
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('IntersectionObserver not supported or failed:', error)
      // Fallback: mark as intersected if observer fails
      setHasEverIntersected(true)
      setIsInView(true)
      // Return empty function for type consistency
      return () => {}
    }
  }, [threshold, rootMargin, hasEverIntersected])

  // Reset hasEverIntersected when options change
  useEffect(() => {
    setHasEverIntersected(false)
  }, [threshold, rootMargin])

  return { ref, isInView, hasEverIntersected }
}
