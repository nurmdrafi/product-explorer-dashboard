interface CenteredCardProps {
  children: React.ReactNode
  minHeight?: 'screen' | 'half' // half = 60vh
  className?: string
}

export function CenteredCard({ children, minHeight = 'half', className = '' }: CenteredCardProps) {
  const heightClass = minHeight === 'screen' ? 'min-h-screen' : 'min-h-[60vh]'
  
  return (
    <div className={`${heightClass} flex items-center justify-center px-4 ${className}`}>
      <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center'>
        {children}
      </div>
    </div>
  )
}