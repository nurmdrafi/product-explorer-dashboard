import { lazy, Suspense } from 'react'
import { MenuIcon } from '@components/common/icons'
import { SearchBar } from '@components/common/search/SearchBar'

const MobileNav = lazy(() => import('./MobileNav').then(m => ({ default: m.MobileNav })))

interface TopHeaderProps {
  onMenuToggle: () => void
  isMobileMenuOpen: boolean
}

function MobileNavFallback() {
  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center md:hidden'>
      <div className='w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin' />
    </div>
  )
}

export function TopHeader({ onMenuToggle, isMobileMenuOpen }: TopHeaderProps) {
  return (
    <>
      <header className='fixed top-0 left-0 right-0 h-16 bg-[#f8f9fa] border-b border-gray-200 z-40 md:left-64'>
        <div className='flex items-center h-full px-4 md:px-6'>
          {/* Hamburger menu button - mobile only */}
          <button
            onClick={onMenuToggle}
            className='md:hidden p-2 mr-3 rounded-lg hover:bg-gray-200 transition-colors'
            aria-label='Toggle menu'
          >
            <MenuIcon className='h-6 w-6 text-gray-700' />
          </button>

          {/* Search bar - takes remaining space */}
          <div className='flex-1 flex justify-center'>
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay - lazy loaded */}
      {isMobileMenuOpen && (
        <Suspense fallback={<MobileNavFallback />}>
          <MobileNav isOpen={isMobileMenuOpen} onClose={() => onMenuToggle()} />
        </Suspense>
      )}
    </>
  )
}
