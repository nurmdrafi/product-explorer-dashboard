import type { TableSkeletonProps } from '@typings/skeleton.types'

export function TableSkeleton({ rows = 8, columns = 6 }: TableSkeletonProps) {
  return (
    <div className='overflow-x-auto' aria-busy='true' aria-label='Loading table'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            {[...Array(columns)].map((_, i) => (
              <th
                key={i}
                className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                <div className='h-3 bg-gray-200 rounded animate-pulse w-16' />
              </th>
            ))}
          </tr>
        </thead>

        <tbody className='bg-white divide-y divide-gray-200'>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className='px-4 py-3 whitespace-nowrap'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-gray-200 rounded-md animate-pulse' />
                  <div className='h-4 bg-gray-200 rounded animate-pulse w-32' />
                </div>
              </td>

              <td className='px-4 py-3 whitespace-nowrap'>
                <div className='h-4 bg-gray-200 rounded animate-pulse w-24' />
              </td>

              <td className='px-4 py-3 whitespace-nowrap'>
                <div className='h-4 bg-gray-200 rounded animate-pulse w-16' />
              </td>

              <td className='px-4 py-3 whitespace-nowrap'>
                <div className='h-6 w-20 bg-gray-200 rounded-full animate-pulse' />
              </td>

              <td className='px-4 py-3 whitespace-nowrap'>
                <div className='flex items-center gap-0.5'>
                  {[...Array(5)].map((_, starIndex) => (
                    <div
                      key={starIndex}
                      className='w-4 h-4 bg-gray-200 rounded animate-pulse'
                    />
                  ))}
                </div>
              </td>

              <td className='px-4 py-3 whitespace-nowrap'>
                <div className='h-8 w-16 bg-gray-200 rounded-md animate-pulse' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
