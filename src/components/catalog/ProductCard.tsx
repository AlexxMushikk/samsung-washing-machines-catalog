import type { Product } from '../../types/product.ts'
import { featureLabels } from '../../constants/labels.ts'
import { productImages } from '../../constants/images.ts'
import {
  formatCapacity,
  formatDateRange,
  formatDimensions,
  formatInstallment,
  formatPrice,
} from '../../utils/format.ts'
import styles from './ProductCard.module.css'

type ProductCardProps = {
  product: Product
  isSelected: boolean
  onSelect: () => void
}

function ProductCard({ product, isSelected, onSelect }: ProductCardProps) {
  const price = formatPrice(product.price)
  const features = product.features.map((feature) => featureLabels[feature]).join(', ')

  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={productImages[product.image]}
        alt={product.name}
        width={200}
        height={200}
      />

      <h2 className={styles.title}>{product.name}</h2>

      <dl className={styles.specs}>
        <div>
          <dt>Pojemność (kg): </dt>
          <dd>{formatCapacity(product.capacity)}</dd>
        </div>
        <div>
          <dt>Wymiary (GxSxW): </dt>
          <dd>{formatDimensions(product.dimensions)}</dd>
        </div>
        <div>
          <dt>Funkcje: </dt>
          <dd>{features}</dd>
        </div>
      </dl>

      <p className={styles.energy}>
        Klasa energetyczna
        <span className={styles.badge}>{product.energyClass}</span>
      </p>

      <div>
        <p className={styles.validity}>
          Cena obowiązuje: {formatDateRange(product.priceStartDate, product.priceEndDate)}
        </p>

        <p className={styles.price}>
          <span className={styles.priceWhole}>{price.whole}</span>
          <span className={styles.priceCents}>
            <span>{price.cents}</span>
            <span>zł</span>
          </span>
        </p>

        <p className={styles.installment}>{formatInstallment(product.price)}</p>
      </div>

      <button
        type="button"
        className={`${styles.button} ${isSelected ? styles.buttonSelected : ''}`}
        onClick={onSelect}
      >
        {isSelected ? 'Wybrane' : 'Wybierz'}
      </button>
    </article>
  )
}

export default ProductCard
