import type { Product } from '../types/product.ts'
import productsData from './products.json'

export const products = productsData as Product[]
