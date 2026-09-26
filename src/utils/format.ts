import type { Dimensions } from '../types/product.ts'

const INSTALLMENT_MONTHS = 60

const priceFormatter = new Intl.NumberFormat('pl-PL', { useGrouping: 'always' })

const decimalFormatter = new Intl.NumberFormat('pl-PL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const capacityFormatter = new Intl.NumberFormat('pl-PL')

export function formatPrice(price: number): { whole: string; cents: string } {
  const [whole, cents] = price.toFixed(2).split('.')
  return { whole: priceFormatter.format(Number(whole)), cents }
}

export function formatCapacity(capacity: number): string {
  return capacityFormatter.format(capacity)
}

export function formatDimensions(dimensions: Dimensions): string {
  return `${dimensions.depth} x ${dimensions.width} x ${dimensions.height} cm`
}

export function formatInstallment(price: number): string {
  const monthly = Math.floor((price / INSTALLMENT_MONTHS) * 100) / 100
  return `${decimalFormatter.format(monthly)} zł x ${INSTALLMENT_MONTHS} rat`
}

function formatDate(date: string): string {
  return date.split('-').reverse().join('.')
}

export function formatDateRange(start: string, end: string): string {
  return `${formatDate(start)} - ${formatDate(end)}`
}
