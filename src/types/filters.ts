import type { EnergyClass, FeatureId } from './product.ts'

export type SortOption = 'popularity' | 'price' | 'capacity'

// 'all' means the filter is not applied
export type FilterState = {
  search: string
  feature: FeatureId | 'all'
  energyClass: EnergyClass | 'all'
  capacity: number | 'all'
  sortBy: SortOption
}
