import { QueryClient } from '@tanstack/react-query'
import { QUERY } from '@config/app.config'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY.STALE_TIME,
      gcTime: QUERY.GC_TIME,
      retry: QUERY.RETRY,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
})
