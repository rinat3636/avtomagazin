import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartLine } from '../types'
import { CART_KEY } from '../data/filters'
import { readJson, writeJson } from '../lib/storage'

type CartContextValue = {
  lines: CartLine[]
  add: (productId: string, qty?: number) => void
  setQty: (productId: string, qty: number) => void
  remove: (productId: string) => void
  clear: () => void
  totalQty: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => readJson<CartLine[]>(CART_KEY, []))

  useEffect(() => {
    writeJson(CART_KEY, lines)
  }, [lines])

  const add = useCallback((productId: string, qty = 1) => {
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === productId)
      if (idx === -1) return [...prev, { productId, qty }]
      const next = [...prev]
      next[idx] = { productId, qty: next[idx].qty + qty }
      return next
    })
  }, [])

  const setQty = useCallback((productId: string, qty: number) => {
    const safe = Math.max(1, Math.min(99, Math.floor(qty)))
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === productId)
      if (idx === -1) return [...prev, { productId, qty: safe }]
      const next = [...prev]
      next[idx] = { productId, qty: safe }
      return next
    })
  }, [])

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const totalQty = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines])

  const value = useMemo(
    () => ({ lines, add, setQty, remove, clear, totalQty }),
    [lines, add, setQty, remove, clear, totalQty],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
