import { createBrowserRouter } from 'react-router-dom'
import App from '@app/App'
import HomePage from '@pages/HomePage'
import { ROUTE } from '@config/app.config'

export const router = createBrowserRouter([
  {
    path: ROUTE.HOME,
    element: <App />,
    children: [
      {
        path: ROUTE.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTE.PRODUCTS,
        element: <div>Products Page</div>,
      },
      {
        path: `${ROUTE.PRODUCTS}/:id`,
        element: <div>Product Detail Page</div>,
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
