import { Table } from '@components/common/table/Table'
import { productsColumns } from './ProductsColumns'
import type { Product } from '@typings/product'

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  return <Table columns={productsColumns} data={products} keyExtractor={product => product.id} />
}
