import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { FAV_KEY } from '../data/filters'
import { readJson, writeJson } from '../lib/storage'

type FavoritesContextValue = {
  ids: Set<string>
  toggle: (productId: string) => void
  has: (productId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<Set<string>>(() => new Set(readJson<string[]>(FAV_KEY, [])))

  useEffect(() => {
    writeJson(FAV_KEY, [...ids])
  }, [ids])

  const toggle = useCallback((productId: string) => {
    setIds((prev) => {
      const next = new Set(prev)
      if (next.has(productId)) next.delete(productId)
      else next.add(productId)
      return next
    })
  }, [])

  const has = useCallback((productId: string) => ids.has(productId), [ids])

  const value = useMemo(() => ({ ids, toggle, has }), [ids, toggle, has])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
