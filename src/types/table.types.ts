export type Column<T> = {
  key: string
  header: string
  render?: (value: unknown, row: T) => React.ReactNode
}

export type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T) => string | number
}
