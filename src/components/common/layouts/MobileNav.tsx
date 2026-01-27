import { useEffect } from 'react'
import type { JSX } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { XIcon } from '@components/common/icons'
import { ROUTE } from '@config/app.config'
import { CubeIcon, GridIcon, GearIcon } from '@components/common/icons'
import { useCurrency } from '@contexts/CurrencyContext'

interface NavItem {
  name: string
  icon: (props: { className?: string }) => JSX.Element
  href: string
}

const navItems: NavItem[] = [
  { name: 'Products', icon: CubeIcon, href: ROUTE.PRODUCTS },
  { name: 'Categories', icon: GridIcon, href: ROUTE.CATEGORIES },
  { name: 'Settings', icon: GearIcon, href: ROUTE.SETTINGS },
]

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const location = useLocation()
  const { currency } = useCurrency()

  const isActive = (href: string) => {
    return location.pathname === href
  }

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      onClose()
    }
  }, [location.pathname, isOpen, onClose])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-200 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Mobile menu */}
      <div
        className={`fixed left-0 top-0 h-screen w-72 bg-[#1e1b4b] text-white z-50 transform transition-transform duration-200 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header with close button */}
        <div className='flex items-center justify-between p-3 border-b border-white/10'>
          <div className='flex items-center space-x-3'>
            <div className='h-10 w-10 rounded-full bg-[#14b8a6] flex items-center justify-center'>
              <span className='text-white font-bold text-lg'>GO</span>
            </div>
            <span className='text-xl font-bold'>JustGo</span>
          </div>
          <button
            onClick={onClose}
            className='p-2 rounded-lg hover:bg-white/10 transition-colors'
            aria-label='Close menu'
          >
            <XIcon className='h-6 w-6' />
          </button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 space-y-1 p-4'>
          {navItems.map(item => (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className='h-5 w-5' />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Currency Display */}
        <div className='border-t border-white/10 p-4'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-white/50'>Currency</span>
            <div className='flex items-center space-x-2'>
              <span className='text-xl'>
                {currency === 'USD' && '🇺🇸'}
                {currency === 'GBP' && '🇬🇧'}
                {currency === 'EUR' && '🇪🇺'}
              </span>
              <span className='text-[#14b8a6] font-medium'>{currency}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
