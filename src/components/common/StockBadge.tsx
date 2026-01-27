interface StockBadgeProps {
  stock: number
}

export function StockBadge({ stock }: StockBadgeProps) {
  const getStockStatus = () => {
    if (stock === 0) return { text: 'Out of Stock', className: 'bg-gray-100 text-gray-600' }
    if (stock <= 10) return { text: `Low Stock (${stock})`, className: 'bg-yellow-100 text-yellow-700' }
    return { text: `In Stock (${stock})`, className: 'bg-green-100 text-green-700' }
  }

  const { text, className } = getStockStatus()

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${className}`}>
      {text}
    </span>
  )
}
