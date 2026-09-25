import type { Product } from '../types/product.ts'
import type { FilterState } from '../types/filters.ts'

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  let filtered = products

  if (filters.search !== '') {
    const query = filters.search.toLowerCase()
    filtered = filtered.filter((product) => product.name.toLowerCase().includes(query))
  }

  if (filters.feature !== 'all') {
    const feature = filters.feature
    filtered = filtered.filter((product) => product.features.includes(feature))
  }

  if (filters.energyClass !== 'all') {
    const energyClass = filters.energyClass
    filtered = filtered.filter((product) => product.energyClass === energyClass)
  }

  if (filters.capacity !== 'all') {
    const capacity = filters.capacity
    filtered = filtered.filter((product) => product.capacity === capacity)
  }

  return filtered
}
