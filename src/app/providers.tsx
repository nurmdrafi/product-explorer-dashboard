import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { queryClient } from '@lib/react-query/queryClient'
import { router } from '@app/routes'
import { CurrencyProvider } from '@contexts/CurrencyContext'

export function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <RouterProvider router={router} />
      </CurrencyProvider>
    </QueryClientProvider>
  )
}
