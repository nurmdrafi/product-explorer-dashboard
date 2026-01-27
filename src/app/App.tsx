import { Outlet } from 'react-router-dom'
import { MainLayout } from '@components/common/layouts'

function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}

export default App
