import type { TableProps } from './Table.types'

export function Table<T>({ columns, data, keyExtractor }: TableProps<T>) {
  if (data.length === 0) {
    return <p className='text-center text-gray-500 py-8'>No data available</p>
  }

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500
                  uppercase tracking-wider'
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {data.map(row => (
            <tr key={keyExtractor(row)}>
              {columns.map(column => (
                <td key={column.key} className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {column.render
                    ? column.render((row as Record<string, unknown>)[column.key], row)
                    : String((row as Record<string, unknown>)[column.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
