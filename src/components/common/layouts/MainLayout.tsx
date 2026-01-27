import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopHeader } from './TopHeader'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  return (
    <div className='min-h-screen bg-[#f1f5f9]'>
      {/* Sidebar - desktop only */}
      <Sidebar />

      {/* Top Header */}
      <TopHeader
        onMenuToggle={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main Content */}
      <main className='pt-16 md:pl-64'>
        <div className='p-6'>
          {children}
        </div>
      </main>
    </div>
  )
}
