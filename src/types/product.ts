export type EnergyClass = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export type FeatureId = 'addWashDoor' | 'aiControlPanel' | 'inverterMotor' | 'electronicDisplay'

export interface Product {
  // identity
  id: string
  name: string
  image: string

  // specifications
  capacity: number
  dimensions: {
    depth: number
    width: number
    height: number
  }
  features: FeatureId[]
  energyClass: EnergyClass

  // pricing
  price: number
  priceStartDate: string
  priceEndDate: string

  // sorting
  popularity: number
}
