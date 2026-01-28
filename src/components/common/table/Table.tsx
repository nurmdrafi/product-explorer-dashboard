import type { TableProps } from '@typings/table.types'

export function Table<T>({
  columns,
  data,
  keyExtractor,
  responsive = true
}: TableProps<T>) {
  if (data?.length === 0) {
    return <p className='text-center text-gray-500 py-8'>No data available</p>
  }

  return (
    <>
      {responsive && (
        <div className='sm:hidden space-y-4'>
          {data?.map(row => (
            <article
              key={keyExtractor(row)}
              className='bg-white border border-gray-200 rounded-lg p-4'
            >
              {columns?.map(column => (
                <div key={column.key} className='py-2 flex flex-col gap-1'>
                  <span className='text-xs font-medium text-gray-500 uppercase'>
                    {column.header}
                  </span>
                  <span className='text-sm text-gray-900'>
                    {column.render
                      ? column.render((row as Record<string, unknown>)[column.key], row)
                      : String((row as Record<string, unknown>)[column.key] ?? '')}
                  </span>
                </div>
              ))}
            </article>
          ))}
        </div>
      )}

      <div className={responsive ? 'hidden sm:block overflow-x-auto' : 'overflow-x-auto'}>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              {columns?.map(column => (
                <th
                  key={column.key}
                  scope='col'
                  className='px-4 py-2 text-left text-xs font-medium text-gray-500
                    uppercase tracking-wider'
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {data?.map(row => (
              <tr key={keyExtractor(row)}>
                {columns?.map(column => (
                  <td key={column.key} className='px-4 py-3 whitespace-nowrap text-sm text-gray-900'>
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
    </>
  )
}
