import type { Product } from '../types/product.ts'
import type { SortOption } from '../types/filters.ts'

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products]

  switch (sortBy) {
    case 'popularity':
      return sorted.sort((a, b) => b.popularity - a.popularity)
    case 'price':
      return sorted.sort((a, b) => a.price - b.price)
    case 'capacity':
      return sorted.sort((a, b) => b.capacity - a.capacity)
  }
}
