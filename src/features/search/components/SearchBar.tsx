import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '@config/app.config'

interface SearchBarProps {
  className?: string
}

export function SearchBar({ className = '' }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      navigate(`${ROUTE.SEARCH}?q=${encodeURIComponent(searchInput.trim())}`)
      setSearchInput('')
    }
  }

  return (
    <form onSubmit={handleSearchSubmit} className={`flex items-center ${className}`}>
      <input
        type='text'
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        placeholder='Search...'
        className='px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-48'
      />
    </form>
  )
}