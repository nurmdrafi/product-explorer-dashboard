import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '@config/app.config'
import { SearchIcon } from '@components/common/icons'
import { XIcon } from '@components/common/icons'

interface SearchBarProps {
  className?: string
}

export function SearchBar({ className = '' }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      navigate(`${ROUTE.SEARCH}?q=${encodeURIComponent(searchInput.trim())}`)
      setSearchInput('')
    }
  }

  const handleClear = () => {
    setSearchInput('')
  }

  return (
    <form onSubmit={handleSearchSubmit} className={`w-full max-w-sm md:max-w-2xl ${className}`}>
      <div className={`relative transition-all duration-200 ${isFocused ? 'scale-[1.01]' : ''}`}>
        <SearchIcon
          className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
            isFocused ? 'text-[#14b8a6]' : 'text-gray-400'
          }`}
        />
        <input
          type='text'
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder='Search products...'
          className={`w-full pl-12 pr-12 py-3 bg-[#f8f9fa] border rounded-lg text-sm text-gray-900 placeholder-gray-400 transition-all ${
            isFocused
              ? 'border-[#14b8a6] ring-2 ring-[#14b8a6]/20 shadow-md'
              : 'border-gray-200 hover:border-gray-300 shadow-sm'
          }`}
        />
        {searchInput && (
          <button
            type='button'
            onClick={handleClear}
            className='absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400
             hover:text-gray-600 hover:bg-gray-200 rounded-md transition-all'
            aria-label='Clear search'
          >
            <XIcon className='h-4 w-4' />
          </button>
        )}
      </div>
    </form>
  )
}
