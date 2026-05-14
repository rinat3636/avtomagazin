import type { Product, Vehicle } from '../types'

const CART_KEY = 'avtmz_cart_v1'
const GARAGE_KEY = 'avtmz_garage_v1'
const FAV_KEY = 'avtmz_favorites_v1'

export { CART_KEY, FAV_KEY, GARAGE_KEY }

export function productMatchesGarage(product: Product, vehicle: Vehicle | null): boolean {
  if (!vehicle) return true
  const b = vehicle.brand.trim().toLowerCase()
  const m = vehicle.model.trim().toLowerCase()
  if (!b || !m) return true
  return product.compatibility.some((line) => {
    const l = line.toLowerCase()
    return l.includes(b) && l.includes(m)
  })
}
