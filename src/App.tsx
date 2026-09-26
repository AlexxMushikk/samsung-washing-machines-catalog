import { products } from './data/products.ts'
import { useProductFilters } from './hooks/useProductFilters.ts'
import { featureLabels } from './constants/labels.ts'
import type { EnergyClass, FeatureId } from './types/product.ts'
import type { SortOption } from './types/filters.ts'
import { useState } from 'react'
import ProductGrid from './components/catalog/ProductGrid.tsx'
import styles from './App.module.css'

const energyClasses = [...new Set(products.map((product) => product.energyClass))].sort()
const capacities = [...new Set(products.map((product) => product.capacity))].sort((a, b) => a - b)

function App() {
  const { filters, updateFilter, visibleProducts } = useProductFilters(products)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Wybierz urządzenie</h1>
      </header>

      <div className={styles.container}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
        />

        <label>
          Sortuj po:
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value as SortOption)}
          >
            <option value="popularity">Popularność</option>
            <option value="price">Cena</option>
            <option value="capacity">Pojemność</option>
          </select>
        </label>

        <label>
          Funkcje:
          <select
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

        <label>
          Klasa energetyczna:
          <select
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

        <label>
          Pojemność:
          <select
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

        <p className={styles.count}>Liczba wyników: {visibleProducts.length}</p>

        {visibleProducts.length === 0 ? (
          <p className={styles.empty}>Brak wyników</p>
        ) : (
          <ProductGrid
            products={visibleProducts}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId(id === selectedId ? null : id)}
          />
        )}
      </div>
    </div>
  )
}

export default App
