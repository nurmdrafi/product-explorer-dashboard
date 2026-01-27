import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProductFilters } from '@store/index'

// Sync Zustand state with URL parameters on mount and when URL changes
export function useUrlSync() {
  const [searchParams] = useSearchParams()
  const { syncWithURL } = useProductFilters()

  useEffect(() => {
    syncWithURL(searchParams)
  }, [searchParams, syncWithURL])
}