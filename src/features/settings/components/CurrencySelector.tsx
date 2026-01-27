import { useCurrency } from '@contexts/CurrencyContext'
import type { Currency } from '@typings/currency.types'

const CURRENCY_OPTIONS: { value: Currency; label: string; symbol: string }[] = [
  { value: 'USD', label: 'US Dollar', symbol: '$' },
  { value: 'GBP', label: 'British Pound', symbol: '£' },
  { value: 'EUR', label: 'Euro', symbol: '€' },
]

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-semibold text-gray-900'>Currency Settings</h2>

      <fieldset className='space-y-3'>
        <legend className='text-sm font-medium text-gray-700'>
          Select your preferred currency
        </legend>

        <div className='space-y-2'>
          {CURRENCY_OPTIONS.map(option => (
            <label
              key={option.value}
              className={`
                flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                ${currency === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
            >
              <input
                type='radio'
                name='currency'
                value={option.value}
                checked={currency === option.value}
                onChange={() => setCurrency(option.value)}
                className='w-4 h-4 text-blue-600 focus:ring-blue-500'
              />
              <span className='ml-3 flex items-center gap-2'>
                <span className='text-lg font-medium'>{option.symbol}</span>
                <span className='text-gray-700'>{option.label}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <p className='text-sm text-gray-500'>
        Prices across the application will be displayed in the selected currency.
      </p>
    </div>
  )
}
