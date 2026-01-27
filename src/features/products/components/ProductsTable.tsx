import { Table } from '@components/common/table/Table'
import type { Product } from '@typings/product'
import { productsColumns } from './ProductsColumns'

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  return <Table columns={productsColumns} data={products} keyExtractor={product => product.id} />
}
