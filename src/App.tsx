import { useState } from 'react'
import { products } from './data/products.ts'
import { useProductFilters } from './hooks/useProductFilters.ts'
import FiltersBar from './components/catalog/FiltersBar/FiltersBar.tsx'
import ProductGrid from './components/catalog/ProductGrid/ProductGrid.tsx'
import styles from './App.module.css'
import ShowMoreButton from './components/catalog/ShowMoreButton/ShowMoreButton.tsx'

function App() {
  const { filters, updateFilter, visibleProducts, totalCount, hasMore, showMore } =
    useProductFilters(products)
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

        <FiltersBar filters={filters} updateFilter={updateFilter} />

        <p className={styles.count}>Liczba wyników: {totalCount}</p>

        {totalCount === 0 ? (
          <p className={styles.empty}>Brak wyników</p>
        ) : (
          <>
            <ProductGrid
              products={visibleProducts}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id === selectedId ? null : id)}
            />
            {hasMore && <ShowMoreButton onClick={showMore} />}
          </>
        )}
      </div>
    </div>
  )
}

export default App
