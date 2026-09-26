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

type ProductCardProps = {
  product: Product
  isSelected: boolean
  onSelect: () => void
}

function ProductCard({ product, isSelected, onSelect }: ProductCardProps) {
  const price = formatPrice(product.price)
  const features = product.features.map((feature) => featureLabels[feature]).join(', ')

  return (
    <article>
      <img src={productImages[product.image]} alt={product.name} width={200} height={200} />

      <h2>{product.name}</h2>

      <dl>
        <dt>Pojemność (kg):</dt>
        <dd>{formatCapacity(product.capacity)}</dd>

        <dt>Wymiary (GxSxW):</dt>
        <dd>{formatDimensions(product.dimensions)}</dd>

        <dt>Funkcje:</dt>
        <dd>{features}</dd>
      </dl>

      <p>
        Klasa energetyczna <span>{product.energyClass}</span>
      </p>

      <p>Cena obowiązuje: {formatDateRange(product.priceStartDate, product.priceEndDate)}</p>

      <p>
        <span>{price.whole}</span>
        <span>{price.cents} zł</span>
      </p>

      <p>{formatInstallment(product.price)}</p>

      <button type="button" onClick={onSelect}>
        {isSelected ? 'Wybrane' : 'Wybierz'}
      </button>
    </article>
  )
}

export default ProductCard
