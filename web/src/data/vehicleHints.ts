/**
 * Подсказки гаража: марки и модели из `vehicleCatalog.ts`
 * (генератор `scripts/gen-vehicle-catalog.mjs` — легковые, LCV, фуры, автобусы, прицепы).
 */

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
  return brandKeys.filter((k) => k.toLowerCase().startsWith(raw))
}

/** Определяет каноническую марку по строке из поля «Марка». */
export function resolveVehicleBrand(input: string): string | undefined {
  const raw = input.trim().toLowerCase()
  if (!raw) return undefined

  const alias = BRAND_ALIASES[raw]
  if (alias) return alias

  const exact = brandKeys.find((k) => k.toLowerCase() === raw)
  if (exact) return exact

  if (raw.length >= 2) {
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

/** Модели для подсказки: по распознанной марке или общий список (усечённый при необходимости). */
export function vehicleModelHintsForBrand(brandInput: string): readonly string[] {
  const key = resolveVehicleBrand(brandInput) as BrandKey | undefined
  if (key && VEHICLE_MODELS_BY_BRAND[key]) return VEHICLE_MODELS_BY_BRAND[key]
  return ALL_VEHICLE_MODEL_HINTS
}

/** Типовые варианты двигателей для поля «Двигатель» в гараже. */
export const ENGINE_HINTS: readonly string[] = [
  // ── Бензин / МТ ──
  '1.0 MT (65 л.с.)',
  '1.2 MT (75 л.с.)',
  '1.2 MT (82 л.с.)',
  '1.4 MT (90 л.с.)',
  '1.4 MT (100 л.с.)',
  '1.4 TSI MT (125 л.с.)',
  '1.4 TSI AT (125 л.с.)',
  '1.4 TSI AT (140 л.с.)',
  '1.5 MT (106 л.с.)',
  '1.5 MT (113 л.с.)',
  '1.5 AT (113 л.с.)',
  '1.6 MT (90 л.с.)',
  '1.6 MT (98 л.с.)',
  '1.6 MT (105 л.с.)',
  '1.6 MT (110 л.с.)',
  '1.6 MT (117 л.с.)',
  '1.6 AT (110 л.с.)',
  '1.6 AT (117 л.с.)',
  '1.6 AT (122 л.с.)',
  '1.8 MT (120 л.с.)',
  '1.8 MT (140 л.с.)',
  '1.8 AT (140 л.с.)',
  '1.8 MT (152 л.с.)',
  '2.0 MT (130 л.с.)',
  '2.0 MT (150 л.с.)',
  '2.0 AT (150 л.с.)',
  '2.0 AT (167 л.с.)',
  '2.0 TSI MT (200 л.с.)',
  '2.0 TSI AT (200 л.с.)',
  '2.0 TSI AT (220 л.с.)',
  '2.0 AT (150 л.с.) Toyota',
  '2.0 CVT (150 л.с.)',
  '2.4 AT (167 л.с.)',
  '2.4 AT (180 л.с.)',
  '2.5 AT (182 л.с.)',
  '2.5 AT (205 л.с.)',
  '3.0 AT (230 л.с.)',
  '3.5 V6 AT (249 л.с.)',
  '3.5 V6 AT (272 л.с.)',
  // ── Турбо / GDI ──
  '1.0 T-GDI AT (100 л.с.)',
  '1.4 T-GDI AT (140 л.с.)',
  '1.5 T-GDI AT (150 л.с.)',
  '2.0 T-GDI AT (180 л.с.)',
  // ── Дизель ──
  '1.5 dCi MT (86 л.с.)',
  '1.5 dCi AT (110 л.с.)',
  '1.6 HDi MT (90 л.с.)',
  '1.6 HDi MT (114 л.с.)',
  '1.9 TDI MT (100 л.с.)',
  '1.9 TDI MT (105 л.с.)',
  '2.0 TDI MT (136 л.с.)',
  '2.0 TDI MT (140 л.с.)',
  '2.0 TDI AT (150 л.с.)',
  '2.0 TDI AT (163 л.с.)',
  '2.0 CDi AT (136 л.с.)',
  '2.2 D AT (150 л.с.)',
  '2.4 D5 AT (175 л.с.)',
  '3.0 TDI AT (211 л.с.)',
  '3.0 TDI AT (240 л.с.)',
  '3.0 TDI AT (272 л.с.)',
  // ── Гибрид ──
  '1.8 Hybrid AT (122 л.с.)',
  '2.0 Hybrid AT (218 л.с.)',
  '2.5 Hybrid AT (218 л.с.)',
  '2.5 Hybrid AT (245 л.с.)',
  // ── Электро ──
  'Электродвигатель (150 кВт)',
  'Электродвигатель (220 кВт)',
  'Электродвигатель (360 кВт)',
]
