import type { Category, CategoryGroup } from '@typings/categories.types'

export function groupCategoriesByLetter(categories: Category[]): CategoryGroup[] {
  const groupsMap = new Map<string, Category[]>()

  categories.forEach(category => {
    if (!category?.name) return

    const firstLetter = category.name.charAt(0).toUpperCase()

    if (!groupsMap.has(firstLetter)) {
      groupsMap.set(firstLetter, [])
    }

    groupsMap.get(firstLetter)!.push(category)
  })

  return Array.from(groupsMap.entries())
    .map(([letter, categories]) => ({ letter, categories }))
    .sort((a, b) => a.letter.localeCompare(b.letter))
}
