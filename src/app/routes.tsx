import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '@app/App'
import { ROUTE } from '@config/app.config'
import { ProductsPage } from '@pages/ProductsPage'
import { ProductDetailsPage } from '@pages/ProductDetailsPage'

export const router = createBrowserRouter([
  {
    path: ROUTE.HOME,
    element: <App />,
    children: [
      {
        path: ROUTE.HOME,
        element: <Navigate to={ROUTE.PRODUCTS} replace />,
      },
      {
        path: ROUTE.PRODUCTS,
        element: <ProductsPage />,
      },
      {
        path: `${ROUTE.PRODUCTS}/:id`,
        element: <ProductDetailsPage />,
      },
      {
        path: ROUTE.CATEGORIES,
        element: <div>Categories Page</div>,
      },
      {
        path: ROUTE.SEARCH,
        element: <div>Search Page</div>,
      },
      {
        path: ROUTE.SETTINGS,
        element: <div>Settings Page</div>,
      },
    ],
  },
])
