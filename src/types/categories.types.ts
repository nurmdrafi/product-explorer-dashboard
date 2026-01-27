export type Category = {
  slug: number
  name: string
  url: string
}

export type CategoriesResponse = Category[]

export type CategoryList = string[]
export type CategoryListResponse = CategoryList

export type CategoryGroup = {
  letter: string
  categories: Category[]
}