/** Нормализация строки для поиска по префиксу (без учёта регистра). */
export function normSearch(s: string): string {
  return s.trim().toLowerCase().replace(/ё/g, 'е')
}

/** Совпадение по началу строки или по началу слова (для «Land Rover» при вводе rover). */
export function matchesPrefix(haystack: string, query: string): boolean {
  const q = normSearch(query)
  if (!q) return true
  const h = normSearch(haystack)
  if (h.startsWith(q)) return true
  return h.split(/[\s/-]+/).some((part) => part.startsWith(q))
}

export function filterByPrefix(
  items: readonly string[],
  query: string,
  limit = 14,
): string[] {
  const q = normSearch(query)
  if (!q) return [...items].slice(0, limit)
  const out: string[] = []
  for (const item of items) {
    if (matchesPrefix(item, q)) {
      out.push(item)
      if (out.length >= limit) break
    }
  }
  return out
}
