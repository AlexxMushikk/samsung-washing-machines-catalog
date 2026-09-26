import { products } from '../../../data/products.ts'
import type { FilterState, SortOption } from '../../../types/filters.ts'
import type { EnergyClass, FeatureId } from '../../../types/product.ts'
import { featureLabels } from '../../../constants/labels.ts'
import styles from './FiltersBar.module.css'

const energyClasses = [...new Set(products.map((product) => product.energyClass))].sort()
const capacities = [...new Set(products.map((product) => product.capacity))].sort((a, b) => a - b)

type FiltersBarProps = {
  filters: FilterState
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
}

function FiltersBar({ filters, updateFilter }: FiltersBarProps) {
  return (
    <div className={styles.filters}>
      <label className={styles.field}>
        <span className={styles.label}>Sortuj po:</span>
        <select
          className={styles.select}
          value={filters.sortBy}
          onChange={(e) => updateFilter('sortBy', e.target.value as SortOption)}
        >
          <option value="popularity">Popularność</option>
          <option value="price">Cena</option>
          <option value="capacity">Pojemność</option>
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Funkcje:</span>
        <select
          className={styles.select}
          value={filters.feature}
          onChange={(e) => updateFilter('feature', e.target.value as FeatureId | 'all')}
        >
          <option value="all">Pokaż wszystkie</option>
          {Object.entries(featureLabels).map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Klasa energetyczna:</span>
        <select
          className={styles.select}
          value={filters.energyClass}
          onChange={(e) => updateFilter('energyClass', e.target.value as EnergyClass | 'all')}
        >
          <option value="all">Pokaż wszystkie</option>
          {energyClasses.map((energyClass) => (
            <option key={energyClass} value={energyClass}>
              {energyClass}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Pojemność:</span>
        <select
          className={styles.select}
          value={filters.capacity}
          onChange={(e) => {
            const value = e.target.value
            updateFilter('capacity', value === 'all' ? 'all' : Number(value))
          }}
        >
          <option value="all">Pokaż wszystkie</option>
          {capacities.map((capacity) => (
            <option key={capacity} value={capacity}>
              {capacity}kg
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default FiltersBar
