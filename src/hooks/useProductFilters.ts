import { useMemo, useState } from 'react'
import type { Product } from '../types/product.ts'
import type { FilterState } from '../types/filters.ts'
import { filterProducts } from '../utils/filterProducts.ts'
import { sortProducts } from '../utils/sortProducts.ts'

export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    feature: 'all',
    energyClass: 'all',
    capacity: 'all',
    sortBy: 'popularity',
  })

  const visibleProducts = useMemo(
    () => sortProducts(filterProducts(products, filters), filters.sortBy),
    [products, filters],
  )

  function updateFilter<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setFilters((previous) => ({ ...previous, [key]: value }))
  }

  return { filters, updateFilter, visibleProducts }
}
