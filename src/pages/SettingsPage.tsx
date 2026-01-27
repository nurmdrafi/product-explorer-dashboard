import { CurrencySelector } from '@features/settings'

export function SettingsPage() {
  return (
    <div className='container'>
      <h1 className='text-3xl font-bold mb-8'>Settings</h1>
      <div className='grid md:grid-cols-1 gap-8'>
      <div className='max-w-2xl mx-auto'>
          <CurrencySelector />
      </div>
      </div>
    </div>
  )
}
