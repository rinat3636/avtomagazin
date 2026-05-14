export type CategoryId =
  | 'engine'
  | 'brakes'
  | 'suspension'
  | 'filters'
  | 'electrical'
  | 'body'

export type Category = {
  id: CategoryId
  label: string
  hint: string
}

export type Product = {
  id: string
  slug: string
  sku: string
  oem: string
  name: string
  categoryId: CategoryId
  price: number
  oldPrice?: number
  tag: string
  shortNote: string
  description: string
  inStock: boolean
  stock: number
  manufacturer: string
  compatibility: string[]
}

export type Vehicle = {
  brand: string
  model: string
  year: number
  engine: string
  vin?: string
}

export type CartLine = {
  productId: string
  qty: number
}

export type CheckoutPayload = {
  name: string
  phone: string
  email: string
  city: string
  address: string
  comment: string
  payment: 'card' | 'cash' | 'invoice'
}
