import type { Column } from '@components/common/table/Table.types'
import type { Product } from '@typings/product'

export const productsColumns: Column<Product>[] = [
  { key: 'id', header: 'ID' },
  { key: 'title', header: 'Title' },
  { key: 'price', header: 'Price ($)' },
  { key: 'category', header: 'Category' },
  { key: 'rating', header: 'Rating' },
]
