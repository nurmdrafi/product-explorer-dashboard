import { CurrencySelector } from '@features/settings'

export function SettingsPage() {
  return (
    <div className='container'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8'>Settings</h1>

        <div className='space-y-8'>
          <CurrencySelector />
        </div>
      </div>
    </div>
  )
}
