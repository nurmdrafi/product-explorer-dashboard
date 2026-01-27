import { Link, useLocation } from 'react-router-dom'
import type { JSX } from 'react'
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

export function Sidebar() {
  const location = useLocation()
  const { currency } = useCurrency()

  const isActive = (href: string) => {
    return location.pathname === href
  }

  return (
    <aside className='hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-[#1e1b4b] text-white z-50'>
      {/* Logo */}
      <div className='flex items-center space-x-3 p-3 border-b border-white/10'>
        <div className='h-10 w-10 rounded-full bg-[#14b8a6] flex items-center justify-center'>
          <span className='text-white font-bold text-lg'>GO</span>
        </div>
        <span className='text-xl font-bold'>JustGo</span>
      </div>

      {/* Navigation */}
      <nav className='flex-1 space-y-1 p-4'>
        {navItems.map(item => (
          <Link
            key={item.name}
            to={item.href}
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
    </aside>
  )
}
