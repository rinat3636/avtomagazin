/**
 * Подсказки гаража: марки и модели из `vehicleCatalog.ts`
 * (генератор `scripts/gen-vehicle-catalog.mjs` — легковые, LCV, фуры, автобусы, прицепы).
 */

import { filterByPrefix, matchesPrefix, normSearch } from '../lib/searchPrefix'
import { ENGINE_BY_MODEL } from './vehicleEngineHints'
import { TRUCK_AND_BUS_BRANDS, VEHICLE_MODELS_BY_BRAND } from './vehicleCatalog'

export { TRUCK_AND_BUS_BRANDS, VEHICLE_MODELS_BY_BRAND }

type BrandKey = keyof typeof VEHICLE_MODELS_BY_BRAND

const brandKeys = Object.keys(VEHICLE_MODELS_BY_BRAND) as BrandKey[]

/** Если марка не выбрана, в подсказке «все модели» — ограничение для производительности datalist в браузере. */
const MAX_ALL_MODEL_HINTS = 1600

export const VEHICLE_BRANDS: readonly string[] = [...brandKeys].sort((a, b) =>
  a.localeCompare(b, 'ru', { sensitivity: 'base' }),
)

const ALL_MODELS_SORTED: readonly string[] = Array.from(
  new Set(brandKeys.flatMap((b) => [...VEHICLE_MODELS_BY_BRAND[b]])),
).sort((a, b) => a.localeCompare(b, 'ru', { sensitivity: 'base' }))

export const ALL_VEHICLE_MODEL_HINTS: readonly string[] =
  ALL_MODELS_SORTED.length > MAX_ALL_MODEL_HINTS
    ? ALL_MODELS_SORTED.slice(0, MAX_ALL_MODEL_HINTS)
    : ALL_MODELS_SORTED

/** Синонимы ввода → каноническое имя марки из каталога */
const BRAND_ALIASES: Readonly<Record<string, BrandKey>> = {
  mercedes: 'Mercedes-Benz',
  мерседес: 'Mercedes-Benz',
  mb: 'Mercedes-Benz',
  vw: 'Volkswagen',
  volks: 'Volkswagen',
  фольксваген: 'Volkswagen',
  mini: 'MINI',
  мини: 'MINI',
  landrover: 'Land Rover',
  lr: 'Land Rover',
  citroen: 'Citroën',
  ситроен: 'Citroën',
  peugeot: 'Peugeot',
  пежо: 'Peugeot',
  renault: 'Renault',
  рено: 'Renault',
  opel: 'Opel',
  опель: 'Opel',
  лада: 'Lada',
  ваз: 'Lada',
  uaz: 'UAZ',
  уаз: 'UAZ',
  газ: 'GAZ',
  москвич: 'Moskvich',
  moskvich: 'Moskvich',
  exeed: 'Exeed',
  эксид: 'Exeed',
  jaecoo: 'Jaecoo',
  джейку: 'Jaecoo',
  jetour: 'Jetour',
  джетур: 'Jetour',
  changan: 'Changan',
  чанган: 'Changan',
  byd: 'BYD',
  бид: 'BYD',
  tank: 'Tank',
  танк: 'Tank',
  zeekr: 'Zeekr',
  зикр: 'Zeekr',
  hongqi: 'Hongqi',
  хончи: 'Hongqi',
  evolute: 'Evolute',
  эволют: 'Evolute',
  belgee: 'Belgee',
  белджи: 'Belgee',
  sollers: 'Sollers',
  соллерс: 'Sollers',
  foton: 'Foton',
  фотон: 'Foton',
  lixiang: 'LiXiang',
  'li auto': 'LiXiang',
  лайка: 'LiXiang',
  omoda: 'Chery',
  омода: 'Chery',
  genesis: 'Genesis',
  генезис: 'Genesis',
  ssangyong: 'SsangYong',
  сангйонг: 'SsangYong',
  gwm: 'Great Wall',
  грейтвол: 'Great Wall',
  камаз: 'KamAZ',
  kamaz: 'KamAZ',
  скания: 'Scania',
  даф: 'DAF',
  ивеко: 'Iveco',
  iveco: 'Iveco',
  шакман: 'Shacman',
  синотruk: 'Sinotruk',
  howo: 'Sinotruk',
  фусо: 'Fuso',
  fuso: 'Fuso',
  хино: 'Hino',
  татра: 'Tatra',
  бмц: 'BMC',
  bmc: 'BMC',
  линк: 'Lynk Co',
  'lynk co': 'Lynk Co',
  'lynk&co': 'Lynk Co',
}

function prefixMatches(raw: string): BrandKey[] {
  const q = normSearch(raw)
  return brandKeys.filter((k) => matchesPrefix(k, q))
}

/** Марки по вводу (префикс + алиасы: «л» → Lada). */
export function brandHintsForInput(query: string, limit = 14): string[] {
  const q = normSearch(query)
  const found = new Set<string>()

  for (const key of brandKeys) {
    if (!q || matchesPrefix(key, q)) found.add(key)
  }
  for (const [alias, brand] of Object.entries(BRAND_ALIASES)) {
    if (!q || alias.startsWith(q) || matchesPrefix(brand, q)) found.add(brand)
  }

  return [...found]
    .sort((a, b) => a.localeCompare(b, 'ru', { sensitivity: 'base' }))
    .slice(0, limit)
}

function brandsForModelPool(brandInput: string): BrandKey[] {
  const resolved = resolveVehicleBrand(brandInput)
  if (resolved) return [resolved as BrandKey]

  const q = normSearch(brandInput)
  if (!q) return []

  return prefixMatches(q).slice(0, 5)
}

/** Определяет каноническую марку по строке из поля «Марка». */
export function resolveVehicleBrand(input: string): string | undefined {
  const raw = input.trim().toLowerCase()
  if (!raw) return undefined

  const alias = BRAND_ALIASES[raw]
  if (alias) return alias

  const exact = brandKeys.find((k) => k.toLowerCase() === raw)
  if (exact) return exact

  if (raw.length >= 1) {
    const matches = prefixMatches(raw)
    if (matches.length === 1) return matches[0]
    if (matches.length > 1) {
      const carFirst = matches.find((k) => !TRUCK_AND_BUS_BRANDS.has(k))
      if (carFirst) return carFirst
      return matches[0]
    }
  }

  return undefined
}

/** Каноническое имя модели из каталога по вводу (точное или единственный префикс). */
export function resolveCatalogModel(brandInput: string, modelInput: string): string | undefined {
  const brand = resolveVehicleBrand(brandInput) as BrandKey | undefined
  if (!brand) return undefined
  const models = VEHICLE_MODELS_BY_BRAND[brand]
  if (!models?.length) return undefined

  const raw = modelInput.trim()
  if (!raw) return undefined

  const exact = models.find((m) => normSearch(m) === normSearch(raw))
  if (exact) return exact

  const q = normSearch(raw)
  const byPrefix = models.filter((m) => matchesPrefix(m, q))
  if (byPrefix.length === 1) return byPrefix[0]
  return undefined
}

/** Полный список моделей марки для автокомплита. */
export function modelsForBrandInput(brandInput: string): readonly string[] {
  const brands = brandsForModelPool(brandInput)
  if (!brands.length) return []
  const pool = brands.flatMap((b) => [...VEHICLE_MODELS_BY_BRAND[b]])
  return [...new Set(pool)]
}

/** Модели с фильтром по префиксу; без марки — пусто. */
export function modelHintsForInput(brandInput: string, modelQuery: string, limit = 14): string[] {
  const pool = modelsForBrandInput(brandInput)
  if (!pool.length) return []
  return filterByPrefix(pool, modelQuery, limit)
}

/** Двигатели только для выбранной пары марка + модель из каталога. */
export function engineHintsForVehicle(brandInput: string, modelInput: string): readonly string[] {
  const brand = resolveVehicleBrand(brandInput)
  const model = resolveCatalogModel(brandInput, modelInput)
  if (!brand || !model) return []
  return ENGINE_BY_MODEL[`${brand}|${model}`] ?? []
}
