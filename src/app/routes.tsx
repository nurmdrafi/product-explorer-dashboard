import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '@app/App'
import { ROUTE } from '@config/app.config'
import { ErrorBoundary } from '@components/common/errors'

const ProductsPage = lazy(() => import('@pages/ProductsPage').then(m => ({ default: m.ProductsPage })))
const ProductDetailsPage = lazy(() => import('@pages/ProductDetailsPage').then(m => ({ default: m.ProductDetailsPage })))
const CategoriesPage = lazy(() => import('@pages/CategoriesPage').then(m => ({ default: m.CategoriesPage })))
const SearchPage = lazy(() => import('@pages/SearchPage').then(m => ({ default: m.SearchPage })))
const SettingsPage = lazy(() => import('@pages/SettingsPage').then(m => ({ default: m.SettingsPage })))
const NotFoundPage = lazy(() => import('@pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

function PageLoader() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-12 h-12 border-4 border-[#14b8a6] border-t-transparent rounded-full animate-spin' />
        <p className='text-gray-500 text-sm'>Loading page...</p>
      </div>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: ROUTE.HOME,
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        path: ROUTE.HOME,
        element: <Navigate to={ROUTE.PRODUCTS} replace />,
      },
      {
        path: ROUTE.PRODUCTS,
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductsPage />
          </Suspense>
        ),
      },
      {
        path: `${ROUTE.PRODUCTS}/:id`,
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductDetailsPage />
          </Suspense>
        ),
      },
      {
        path: ROUTE.CATEGORIES,
        element: (
          <Suspense fallback={<PageLoader />}>
            <CategoriesPage />
          </Suspense>
        ),
      },
      {
        path: ROUTE.SEARCH,
        element: (
          <Suspense fallback={<PageLoader />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: ROUTE.SETTINGS,
        element: (
          <Suspense fallback={<PageLoader />}>
            <SettingsPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
])
