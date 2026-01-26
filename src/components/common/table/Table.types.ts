export interface Column<T> {
  key: string
  header: string
  render?: (value: unknown, row: T) => React.ReactNode
}

export interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T) => string | number
}
