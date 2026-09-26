import { useMemo, useState } from 'react'
import type { Product } from '../types/product.ts'
import type { FilterState } from '../types/filters.ts'
import { filterProducts } from '../utils/filterProducts.ts'
import { sortProducts } from '../utils/sortProducts.ts'

const PAGE_SIZE = 6

export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    feature: 'all',
    energyClass: 'all',
    capacity: 'all',
    sortBy: 'popularity',
  })
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  function updateFilter<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setFilters((previous) => ({ ...previous, [key]: value }))
    setVisibleCount(PAGE_SIZE)
  }

  function showMore() {
    setVisibleCount((count) => count + PAGE_SIZE)
  }

  const matchingProducts = useMemo(
    () => sortProducts(filterProducts(products, filters), filters.sortBy),
    [products, filters],
  )

  return {
    filters,
    updateFilter,
    visibleProducts: matchingProducts.slice(0, visibleCount),
    totalCount: matchingProducts.length,
    hasMore: visibleCount < matchingProducts.length,
    showMore,
  }
}
