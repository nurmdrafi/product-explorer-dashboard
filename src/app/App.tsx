import { Outlet } from 'react-router-dom'
import { Navigation } from '@components/common/layouts/Navigation'

function App() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navigation />
      <main className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        <Outlet />
      </main>
    </div>
  )
}

export default App
