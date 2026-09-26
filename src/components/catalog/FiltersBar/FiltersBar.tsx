import type { FilterState, SortOption } from '../../../types/filters.ts'
import type { EnergyClass, FeatureId } from '../../../types/product.ts'
import { featureLabels } from '../../../constants/labels.ts'
import { products } from '../../../data/products.ts'
import Select from '../../ui/Select/Select.tsx'
import type { SelectOption } from '../../ui/Select/Select.tsx'
import styles from './FiltersBar.module.css'

const ALL_LABEL = 'Pokaż wszystkie'

const sortOptions: SelectOption<SortOption>[] = [
  { value: 'popularity', label: 'Popularność' },
  { value: 'price', label: 'Cena' },
  { value: 'capacity', label: 'Pojemność' },
]

const featureOptions: SelectOption<FeatureId | 'all'>[] = [
  { value: 'all', label: ALL_LABEL },
  ...Object.entries(featureLabels).map(([id, label]) => ({
    value: id as FeatureId,
    label,
  })),
]

const energyOptions: SelectOption<EnergyClass | 'all'>[] = [
  { value: 'all', label: ALL_LABEL },
  ...[...new Set(products.map((product) => product.energyClass))]
    .sort()
    .map((energyClass) => ({ value: energyClass, label: energyClass })),
]

const capacityOptions: SelectOption<number | 'all'>[] = [
  { value: 'all', label: ALL_LABEL },
  ...[...new Set(products.map((product) => product.capacity))]
    .sort((a, b) => a - b)
    .map((capacity) => ({ value: capacity, label: `${capacity}kg` })),
]

type FiltersBarProps = {
  filters: FilterState
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
}

function FiltersBar({ filters, updateFilter }: FiltersBarProps) {
  return (
    <div className={styles.filters}>
      <Select
        label="Sortuj po:"
        value={filters.sortBy}
        options={sortOptions}
        onChange={(value) => updateFilter('sortBy', value)}
      />
      <Select
        label="Funkcje:"
        value={filters.feature}
        options={featureOptions}
        onChange={(value) => updateFilter('feature', value)}
      />
      <Select
        label="Klasa energetyczna:"
        value={filters.energyClass}
        options={energyOptions}
        onChange={(value) => updateFilter('energyClass', value)}
      />
      <Select
        label="Pojemność:"
        value={filters.capacity}
        options={capacityOptions}
        onChange={(value) => updateFilter('capacity', value)}
      />
    </div>
  )
}

export default FiltersBar
