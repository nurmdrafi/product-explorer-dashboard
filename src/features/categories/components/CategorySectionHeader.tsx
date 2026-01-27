interface CategorySectionHeaderProps {
  letter: string
}

export function CategorySectionHeader({ letter }: CategorySectionHeaderProps) {
  return (
    <div className='col-span-full py-2'>
      <h2 className='text-xl font-bold text-gray-900 border-b border-gray-200 pb-1'>
        {letter}
      </h2>
    </div>
  )
}
