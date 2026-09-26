import type { Product } from '../../types/product.ts'
import ProductCard from './ProductCard.tsx'
import styles from './ProductGrid.module.css'

type ProductGridProps = {
  products: Product[]
  selectedId: string | null
  onSelect: (id: string) => void
}

function ProductGrid({ products, selectedId, onSelect }: ProductGridProps) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={product.id === selectedId}
          onSelect={() => onSelect(product.id)}
        />
      ))}
    </div>
  )
}

export default ProductGrid
