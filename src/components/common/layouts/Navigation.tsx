import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTE } from '@config/app.config'
import { SearchBar } from '@features/search/components/SearchBar'

interface NavigationItem {
  name: string
  path: string
}

interface NavigationProps {
  className?: string
}

export function Navigation({ className = '' }: NavigationProps) {
  // States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === ROUTE.HOME || path === ROUTE.PRODUCTS) {
      return location.pathname === ROUTE.HOME || location.pathname === ROUTE.PRODUCTS
    }
    return location.pathname === path
  }

  const navigationItems: NavigationItem[] = [
    { name: 'Products', path: ROUTE.PRODUCTS },
    { name: 'Categories', path: ROUTE.CATEGORIES },
    { name: 'Settings', path: ROUTE.SETTINGS },
  ]

  return (
    <nav className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          {/* Logo and Brand */}
          <div className='flex items-center'>
            <Link 
              to={ROUTE.PRODUCTS} 
              className='flex items-center space-x-3 text-gray-900
               hover:text-green-600 transition-colors'
            >
              <div className='w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>JG</span>
              </div>
              <span className='text-xl font-bold'>JustGo</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            <SearchBar />
            {navigationItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-green-600 border-b-2 border-green-600 pb-2'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>


          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-700
               hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              {/* Hamburger icon */}
              <svg className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
              {/* Close icon */}
              <svg className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className='pt-2 pb-3 space-y-1 bg-gray-50 border-t border-gray-200'>
          <SearchBar className='px-4 pb-2' />
          {navigationItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`block pl-4 pr-3 py-2 text-base font-medium transition-colors duration-200 ${
                isActive(item.path)
                  ? 'bg-green-50 text-green-600 border-l-4 border-green-600'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'
              }`}
              // onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}