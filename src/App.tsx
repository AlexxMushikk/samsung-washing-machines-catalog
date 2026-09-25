import { products } from './data/products.ts'
import { useProductFilters } from './hooks/useProductFilters.ts'
import { featureLabels } from './constants/labels.ts'
import type { EnergyClass, FeatureId } from './types/product.ts'
import type { SortOption } from './types/filters.ts'

const energyClasses = [...new Set(products.map((product) => product.energyClass))].sort()
const capacities = [...new Set(products.map((product) => product.capacity))].sort((a, b) => a - b)

function App() {
  const { filters, setFilters, visibleProducts } = useProductFilters(products)

  return (
    <div>
      <h1>Wybierz urządzenie</h1>

      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      <label>
        Sortuj po:
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as SortOption })}
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
          onChange={(e) => setFilters({ ...filters, feature: e.target.value as FeatureId | 'all' })}
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
          onChange={(e) =>
            setFilters({ ...filters, energyClass: e.target.value as EnergyClass | 'all' })
          }
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
            setFilters({ ...filters, capacity: value === 'all' ? 'all' : Number(value) })
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

      <p>Liczba wyników: {visibleProducts.length}</p>

      <ul>
        {visibleProducts.map((product) => (
          <li key={product.id}>
            {product.name} — {product.price} zł — {product.energyClass}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
