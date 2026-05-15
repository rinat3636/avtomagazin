/**
 * Модификации двигателя по паре марка + модель (как в каталоге vehicleCatalog).
 * Ключ: «Марка|Модель» — точное совпадение с подсказкой модели.
 */

const KEY = (brand: string, model: string) => `${brand}|${model}`

const PETROL = {
  small: ['1.6 MT (87 л.с.)', '1.6 MT (106 л.с.)', '1.6 AT (106 л.с.)', '1.8 MT (122 л.с.)'],
  medium: ['1.6 MT (110 л.с.)', '1.6 AT (122 л.с.)', '1.8 MT (140 л.с.)', '2.0 AT (150 л.с.)'],
  turbo: ['1.4 TSI AT (125 л.с.)', '1.4 TSI AT (140 л.с.)', '2.0 TSI AT (200 л.с.)'],
} as const

const DIESEL = ['1.5 dCi MT (86 л.с.)', '1.9 TDI MT (105 л.с.)', '2.0 TDI MT (140 л.с.)', '2.0 TDI AT (150 л.с.)'] as const

const HYBRID = ['1.8 Hybrid AT (122 л.с.)', '2.0 Hybrid AT (218 л.с.)', '2.5 Hybrid AT (245 л.с.)'] as const

const EV = ['Электродвигатель (150 кВт)', 'Электродвигатель (220 кВт)'] as const

const NIVA = ['1.7 MT (83 л.с.)', '1.8 MT (90 л.с.)'] as const

/** @internal */
export const ENGINE_BY_MODEL: Readonly<Record<string, readonly string[]>> = {
  [KEY('Lada', 'Granta')]: [
    '1.6 MT (87 л.с.)',
    '1.6 MT (106 л.с.)',
    '1.6 AT (106 л.с.)',
    '1.8 MT (122 л.с.)',
    '1.8 AT (122 л.с.)',
  ],
  [KEY('Lada', 'Granta FL')]: [
    '1.6 MT (90 л.с.)',
    '1.6 MT (106 л.с.)',
    '1.6 AT (106 л.с.)',
    '1.8 MT (122 л.с.)',
  ],
  [KEY('Lada', 'Vesta')]: [
    '1.6 MT (106 л.с.)',
    '1.6 AT (106 л.с.)',
    '1.6 AT (113 л.с.)',
    '1.8 MT (122 л.с.)',
    '1.8 AT (122 л.с.)',
    '1.8 MT (140 л.с.)',
  ],
  [KEY('Lada', 'Vesta SW')]: [
    '1.6 MT (106 л.с.)',
    '1.6 AT (106 л.с.)',
    '1.8 MT (122 л.с.)',
    '1.8 AT (122 л.с.)',
  ],
  [KEY('Lada', 'Vesta Cross')]: [
    '1.6 AT (106 л.с.)',
    '1.8 MT (122 л.с.)',
    '1.8 AT (122 л.с.)',
    '1.8 MT (140 л.с.)',
  ],
  [KEY('Lada', 'Vesta NG')]: ['1.6 MT (90 л.с.)', '1.6 MT (106 л.с.)', '1.8 MT (122 л.с.)'],
  [KEY('Lada', 'Largus')]: ['1.6 MT (84 л.с.)', '1.6 MT (106 л.с.)', '1.8 MT (122 л.с.)'],
  [KEY('Lada', 'Largus Cross')]: ['1.6 MT (106 л.с.)', '1.8 MT (122 л.с.)'],
  [KEY('Lada', 'XRAY')]: ['1.6 MT (106 л.с.)', '1.6 AT (106 л.с.)', '1.8 MT (122 л.с.)'],
  [KEY('Lada', 'XRAY Cross')]: ['1.6 MT (110 л.с.)', '1.6 AT (110 л.с.)', '1.8 MT (122 л.с.)'],
  [KEY('Lada', 'Niva Legend')]: [...NIVA],
  [KEY('Lada', 'Niva Travel')]: [...NIVA, '1.8 MT (90 л.с.)'],
  [KEY('Lada', '4x4 Urban')]: [...NIVA],
  [KEY('Lada', '2121 Нива')]: [...NIVA],
  [KEY('Lada', 'Iskra')]: ['1.6 MT (90 л.с.)', '1.6 MT (106 л.с.)'],
  [KEY('Lada', 'e-Largus')]: [...EV],

  [KEY('Hyundai', 'Solaris')]: [
    '1.4 MT (100 л.с.)',
    '1.6 MT (123 л.с.)',
    '1.6 AT (123 л.с.)',
    '1.6 MT (130 л.с.)',
    '1.6 AT (130 л.с.)',
  ],
  [KEY('Hyundai', 'Solaris II')]: [
    '1.4 MT (100 л.с.)',
    '1.6 MT (123 л.с.)',
    '1.6 AT (123 л.с.)',
    '1.6 AT (130 л.с.)',
  ],
  [KEY('Hyundai', 'Creta')]: [
    '1.6 MT (123 л.с.)',
    '1.6 AT (123 л.с.)',
    '2.0 AT (150 л.с.)',
    '2.0 AT (167 л.с.)',
  ],
  [KEY('Hyundai', 'Creta II')]: [
    '1.6 MT (123 л.с.)',
    '1.6 AT (123 л.с.)',
    '2.0 AT (150 л.с.)',
    '2.0 AT (167 л.с.)',
  ],
  [KEY('Hyundai', 'Tucson')]: [
    '2.0 AT (150 л.с.)',
    '2.0 AT (167 л.с.)',
    '2.0 T-GDI AT (180 л.с.)',
    '2.0 T-GDI AT (200 л.с.)',
  ],
  [KEY('Hyundai', 'Tucson NX4')]: [
    '2.0 AT (150 л.с.)',
    '2.0 T-GDI AT (180 л.с.)',
    '2.0 T-GDI AT (200 л.с.)',
    ...HYBRID,
  ],

  [KEY('Kia', 'Rio')]: ['1.4 MT (100 л.с.)', '1.6 MT (123 л.с.)', '1.6 AT (123 л.с.)'],
  [KEY('Kia', 'Rio IV')]: ['1.4 MT (100 л.с.)', '1.6 MT (123 л.с.)', '1.6 AT (123 л.с.)'],
  [KEY('Kia', 'Rio X')]: ['1.6 MT (123 л.с.)', '1.6 AT (123 л.с.)', '1.6 AT (130 л.с.)'],
  [KEY('Kia', 'Sportage')]: [
    '2.0 AT (150 л.с.)',
    '2.0 AT (167 л.с.)',
    '2.0 T-GDI AT (180 л.с.)',
    '2.5 AT (182 л.с.)',
  ],
  [KEY('Kia', 'Sportage NQ5')]: [
    '2.0 AT (150 л.с.)',
    '2.0 T-GDI AT (180 л.с.)',
    '2.5 AT (182 л.с.)',
    ...HYBRID,
  ],
  [KEY('Kia', 'Cerato')]: ['1.6 MT (130 л.с.)', '1.6 AT (130 л.с.)', '2.0 AT (150 л.с.)'],
  [KEY('Kia', 'Cerato IV')]: ['1.6 MT (130 л.с.)', '1.6 AT (130 л.с.)', '2.0 AT (150 л.с.)'],

  [KEY('Toyota', 'Camry')]: [
    '2.0 AT (150 л.с.)',
    '2.5 AT (182 л.с.)',
    '2.5 AT (205 л.с.)',
    '3.5 V6 AT (249 л.с.)',
    ...HYBRID,
  ],
  [KEY('Toyota', 'Camry XV70')]: [
    '2.0 AT (150 л.с.)',
    '2.5 AT (182 л.с.)',
    '2.5 Hybrid AT (218 л.с.)',
    '3.5 V6 AT (249 л.с.)',
  ],
  [KEY('Toyota', 'RAV4')]: [
    '2.0 AT (150 л.с.)',
    '2.0 AT (167 л.с.)',
    '2.5 AT (182 л.с.)',
    '2.5 Hybrid AT (218 л.с.)',
  ],
  [KEY('Toyota', 'RAV4 XA50')]: [
    '2.0 AT (150 л.с.)',
    '2.5 AT (182 л.с.)',
    '2.5 Hybrid AT (218 л.с.)',
  ],
  [KEY('Toyota', 'Corolla')]: [
    '1.6 MT (122 л.с.)',
    '1.6 AT (122 л.с.)',
    '1.8 Hybrid AT (122 л.с.)',
    '2.0 AT (150 л.с.)',
  ],
  [KEY('Toyota', 'Corolla E210')]: [
    '1.6 MT (122 л.с.)',
    '1.8 Hybrid AT (122 л.с.)',
    '2.0 AT (150 л.с.)',
  ],

  [KEY('BMW', '3 G20')]: [
    '320i AT (184 л.с.)',
    '330i AT (258 л.с.)',
    '320d AT (190 л.с.)',
    '330d AT (265 л.с.)',
    'M340i AT (374 л.с.)',
  ],
  [KEY('BMW', '3 F30')]: [
    '320i AT (184 л.с.)',
    '328i AT (245 л.с.)',
    '320d AT (184 л.с.)',
    '335i AT (306 л.с.)',
  ],
  [KEY('BMW', '320i G20')]: ['320i AT (184 л.с.)'],
  [KEY('BMW', '330i G20')]: ['330i AT (258 л.с.)'],
  [KEY('BMW', 'X5 G05')]: [
    'xDrive40i AT (340 л.с.)',
    'xDrive30d AT (265 л.с.)',
    'xDrive45e Hybrid AT (394 л.с.)',
  ],

  [KEY('Volkswagen', 'Polo')]: [...PETROL.small, '1.4 TSI AT (125 л.с.)'],
  [KEY('Volkswagen', 'Golf')]: [...PETROL.medium, ...PETROL.turbo, ...DIESEL],
  [KEY('Volkswagen', 'Golf 7')]: [...PETROL.medium, '1.4 TSI AT (125 л.с.)', '2.0 TDI AT (150 л.с.)'],
  [KEY('Volkswagen', 'Golf 8')]: [
    '1.5 TSI AT (150 л.с.)',
    '2.0 TSI AT (200 л.с.)',
    '2.0 TDI AT (150 л.с.)',
  ],
  [KEY('Volkswagen', 'Tiguan')]: [
    '1.4 TSI AT (125 л.с.)',
    '2.0 TSI AT (180 л.с.)',
    '2.0 TDI AT (150 л.с.)',
    '2.0 TDI AT (163 л.с.)',
  ],
  [KEY('Volkswagen', 'Tiguan II')]: [
    '1.4 TSI AT (125 л.с.)',
    '2.0 TSI AT (180 л.с.)',
    '2.0 TDI AT (150 л.с.)',
  ],

  [KEY('Skoda', 'Octavia')]: [
    '1.4 TSI AT (125 л.с.)',
    '1.4 TSI AT (140 л.с.)',
    '2.0 TSI AT (200 л.с.)',
    '2.0 TDI AT (150 л.с.)',
  ],
  [KEY('Skoda', 'Octavia III')]: [
    '1.4 TSI AT (125 л.с.)',
    '1.4 TSI AT (140 л.с.)',
    '2.0 TDI AT (150 л.с.)',
  ],
  [KEY('Skoda', 'Octavia IV')]: [
    '1.5 TSI AT (150 л.с.)',
    '2.0 TSI AT (200 л.с.)',
    '2.0 TDI AT (150 л.с.)',
  ],
  [KEY('Skoda', 'Rapid')]: ['1.6 MT (110 л.с.)', '1.6 AT (110 л.с.)', '1.4 TSI AT (125 л.с.)'],

  [KEY('Renault', 'Logan')]: ['1.6 MT (82 л.с.)', '1.6 MT (102 л.с.)', '1.6 AT (102 л.с.)'],
  [KEY('Renault', 'Logan II')]: ['1.6 MT (82 л.с.)', '1.6 MT (102 л.с.)', '1.6 AT (102 л.с.)'],
  [KEY('Renault', 'Duster')]: [
    '1.6 MT (114 л.с.)',
    '1.6 MT (117 л.с.)',
    '2.0 MT (143 л.с.)',
    '1.5 dCi MT (86 л.с.)',
    '1.5 dCi AT (110 л.с.)',
  ],
  [KEY('Renault', 'Duster II')]: [
    '1.6 MT (114 л.с.)',
    '2.0 MT (143 л.с.)',
    '1.3 TCE AT (150 л.с.)',
    '1.5 dCi AT (110 л.с.)',
  ],

  [KEY('Mercedes-Benz', 'C W205')]: [
    'C180 AT (156 л.с.)',
    'C200 AT (184 л.с.)',
    'C220d AT (170 л.с.)',
    'C300 AT (258 л.с.)',
  ],
  [KEY('Mercedes-Benz', 'C W206')]: [
    'C200 AT (204 л.с.)',
    'C300 AT (258 л.с.)',
    'C220d AT (200 л.с.)',
  ],

  [KEY('Audi', 'A4 B9')]: [
    '2.0 TFSI AT (190 л.с.)',
    '2.0 TFSI AT (252 л.с.)',
    '2.0 TDI AT (190 л.с.)',
    '3.0 TDI AT (272 л.с.)',
  ],
  [KEY('Audi', 'A6 C8')]: [
    '2.0 TFSI AT (245 л.с.)',
    '3.0 TFSI AT (340 л.с.)',
    '2.0 TDI AT (204 л.с.)',
    '3.0 TDI AT (286 л.с.)',
  ],

  [KEY('Chery', 'Tiggo 7 Pro')]: [
    '1.5 T-GDI AT (147 л.с.)',
    '1.5 T-GDI AT (150 л.с.)',
    '1.6 MT (150 л.с.)',
  ],
  [KEY('Chery', 'Tiggo 8 Pro')]: ['2.0 T-GDI AT (180 л.с.)', '2.0 T-GDI AT (197 л.с.)'],
  [KEY('Haval', 'Jolion')]: ['1.5 T-GDI AT (143 л.с.)', '1.5 T-GDI AT (150 л.с.)', '2.0 T-GDI AT (190 л.с.)'],
  [KEY('Haval', 'F7')]: ['1.5 T-GDI AT (150 л.с.)', '2.0 T-GDI AT (190 л.с.)', '2.0 T-GDI AT (197 л.с.)'],

  [KEY('KamAZ', '5490')]: [
    '6.7 дизель (400 л.с.)',
    '6.7 дизель (450 л.с.)',
    '12.9 дизель (500 л.с.)',
  ],
  [KEY('MAN', 'TGX')]: ['12.4 дизель (440 л.с.)', '12.4 дизель (480 л.с.)', '15.2 дизель (540 л.с.)'],
  [KEY('Scania', 'R-series')]: ['13.0 дизель (450 л.с.)', '13.0 дизель (500 л.с.)', '16.0 дизель (580 л.с.)'],
}
