import type { Category, CategoryId, Product } from '../types'

export const categories: Category[] = [
  { id: 'engine', label: 'Двигатель и ГРМ', hint: 'Ремни, помпы, прокладки' },
  { id: 'brakes', label: 'Тормозная система', hint: 'Колодки, диски, суппорты' },
  { id: 'suspension', label: 'Подвеска и рулевое', hint: 'Амортизаторы, сайлентблоки' },
  { id: 'filters', label: 'Фильтры и расходники', hint: 'Масло, свечи, жидкости' },
  { id: 'electrical', label: 'Электрика и свет', hint: 'Генераторы, лампы, АКБ' },
  { id: 'body', label: 'Кузов и оптика', hint: 'Бамперы, зеркала, стёкла' },
]

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'kolodki-perednie-brembo',
    sku: 'BRK-2048',
    oem: '34116792227',
    name: 'Комплект тормозных колодок передних',
    categoryId: 'brakes',
    price: 4290,
    oldPrice: 4890,
    tag: 'Хит',
    shortNote: 'Сертификация ECE R90, низкая пыль',
    description:
      'Колодки с керамическим наполнителем для комфортной езды в городе. Стабильный коэффициент трения в широком диапазоне температур. Комплект на ось.',
    inStock: true,
    stock: 24,
    manufacturer: 'Brembo',
    compatibility: ['BMW 3 G20', 'BMW 4 G22', 'Toyota Camry XV70'],
  },
  {
    id: 'p2',
    slug: 'maslyanyy-filtr-mann',
    sku: 'FLT-MG12',
    oem: '11427566327',
    name: 'Масляный фильтр',
    categoryId: 'filters',
    price: 690,
    tag: 'В наличии',
    shortNote: 'OEM-качество, высокая удерживающая способность',
    description:
      'Синтетический носитель фильтрующего элемента. Обратный клапан предотвращает стекание масла при остановке двигателя. Рекомендуется менять вместе с маслом.',
    inStock: true,
    stock: 120,
    manufacturer: 'MANN-FILTER',
    compatibility: ['BMW 3 G20', 'BMW X3 G01', 'VW Golf 8'],
  },
  {
    id: 'p3',
    slug: 'amortizator-zadniy-sachs',
    sku: 'SUS-GZ55',
    oem: '33506899902',
    name: 'Амортизатор задний газомасляный',
    categoryId: 'suspension',
    price: 6150,
    tag: 'Новинка',
    shortNote: 'Гарантия 24 месяца, штучно',
    description:
      'Газомасляная технология для плавного гашения колебаний. Подходит для стандартной и умеренно спортивной подвески. Поставляется без опоры (при необходимости заказывается отдельно).',
    inStock: true,
    stock: 8,
    manufacturer: 'Sachs',
    compatibility: ['BMW 3 G20', 'BMW 3 F30'],
  },
  {
    id: 'p4',
    slug: 'komplekt-grm-s-pompoy',
    sku: 'ENG-TB90',
    oem: '11287628665',
    name: 'Комплект ГРМ с помпой',
    categoryId: 'engine',
    price: 12900,
    tag: 'Комплект',
    shortNote: 'Ремень, ролики, помпа в одном наборе',
    description:
      'Полный набор для планового ТО: зубчатый ремень, обводные и натяжной ролики, водяная помпа. Рекомендуется заменить антифриз и термостат при установке.',
    inStock: true,
    stock: 5,
    manufacturer: 'INA',
    compatibility: ['VW Golf 7', 'Audi A3 8V', 'Skoda Octavia III'],
  },
  {
    id: 'p5',
    slug: 'tormoznoy-disk-ventiliruemyy',
    sku: 'BRK-D901',
    oem: '34116886462',
    name: 'Тормозной диск передний вентилируемый',
    categoryId: 'brakes',
    price: 7890,
    tag: 'Оригинал',
    shortNote: 'Штучно, высокий ресурс',
    description:
      'Чугунный вентилируемый диск с антикоррозийным покрытием. Геометрия каналов оптимизирована для отвода тепла. Перед установкой проверьте минимальную толщину старых дисков.',
    inStock: true,
    stock: 14,
    manufacturer: 'BMW',
    compatibility: ['BMW 3 G20', 'BMW 4 G22'],
  },
  {
    id: 'p6',
    slug: 'vozdushnyy-filtr',
    sku: 'FLT-AF44',
    oem: '13718518111',
    name: 'Воздушный фильтр',
    categoryId: 'filters',
    price: 1290,
    tag: 'Аналог',
    shortNote: 'Повышенная пропускная способность',
    description:
      'Многослойный фильтрующий элемент задерживает пыль и пыльцу, сохраняя низкое сопротивление потоку. Рекомендуемый интервал замены — каждые 20–30 тыс. км.',
    inStock: true,
    stock: 40,
    manufacturer: 'Mahle',
    compatibility: ['BMW 3 G20', 'BMW 5 G30'],
  },
  {
    id: 'p7',
    slug: 'svechi-zazhiganiya-ngk',
    sku: 'FLT-SP4',
    oem: '12120037580',
    name: 'Свечи зажигания комплект 4 шт.',
    categoryId: 'filters',
    price: 3200,
    oldPrice: 3590,
    tag: 'Акция',
    shortNote: 'Иридиевый центральный электрод',
    description:
      'Иридиевые свечи для бензиновых двигателей с непосредственным впрыском. Устойчивый зазор на длительный срок. Момент затяжки см. в инструкции производителя авто.',
    inStock: true,
    stock: 18,
    manufacturer: 'NGK',
    compatibility: ['BMW 320i G20', 'Mini Cooper F56'],
  },
  {
    id: 'p8',
    slug: 'rulevoy-nakonechnik',
    sku: 'SUS-TE17',
    oem: '32106874387',
    name: 'Рулевой наконечник левый',
    categoryId: 'suspension',
    price: 2450,
    tag: 'В наличии',
    shortNote: 'С гайкой и шплинтом',
    description:
      'Наконечник рулевой тяги с резьбой под штатные рычаги. После замены обязательна сход-развал устройство и проверка углов установки колёс.',
    inStock: true,
    stock: 11,
    manufacturer: 'Lemförder',
    compatibility: ['BMW 3 G20', 'BMW 3 F30'],
  },
  {
    id: 'p9',
    slug: 'generator-120a',
    sku: 'EL-G120',
    oem: '12317616129',
    name: 'Генератор 120 А',
    categoryId: 'electrical',
    price: 28900,
    tag: 'Под заказ',
    shortNote: 'Срок поставки 3–5 дней',
    description:
      'Восстановленный генератор с заменой подшипников и щёток. Выдаётся с гарантией 12 месяцев. Перед покупкой сверьте маркировку и разъём регулятора.',
    inStock: false,
    stock: 0,
    manufacturer: 'Bosch',
    compatibility: ['BMW 3 F30', 'BMW 5 F10'],
  },
  {
    id: 'p10',
    slug: 'akkumulyator-70ach',
    sku: 'EL-BAT70',
    oem: '61217555719',
    name: 'Аккумулятор 70 А·ч AGM',
    categoryId: 'electrical',
    price: 15490,
    tag: 'AGM',
    shortNote: 'Стартовый ток 760 А',
    description:
      'AGM-технология для авто с системой Start-Stop. Низкий саморазряд, устойчивость к глубоким циклам. Утилизируйте старый АКБ через пункт приёма.',
    inStock: true,
    stock: 9,
    manufacturer: 'Varta',
    compatibility: ['BMW 3 G20', 'Mercedes C W205', 'Audi A4 B9'],
  },
  {
    id: 'p11',
    slug: 'peredniy-stabilizator',
    sku: 'SUS-SB01',
    oem: '31356780847',
    name: 'Стойка стабилизатора передняя',
    categoryId: 'suspension',
    price: 890,
    tag: 'Пара',
    shortNote: 'Комплект левый + правый',
    description:
      'Стойки стабилизатора с полиуретановыми сайлентблоками. Устраняют стук в подвеске на неровностях. Рекомендуется менять парами.',
    inStock: true,
    stock: 32,
    manufacturer: 'Febi',
    compatibility: ['BMW 3 G20', 'BMW 4 G22'],
  },
  {
    id: 'p12',
    slug: 'zapornaya-prokladka-masla',
    sku: 'ENG-PG01',
    oem: '11137584500',
    name: 'Прокладка сливной пробки масла',
    categoryId: 'engine',
    price: 190,
    tag: 'Расходник',
    shortNote: 'Медь/резина, одноразовая',
    description:
      'Одноразовая запорная шайба для сливной пробки картера. Предотвращает просачивание масла. Заменяется при каждой смене масла.',
    inStock: true,
    stock: 200,
    manufacturer: 'Elring',
    compatibility: ['BMW 3 G20', 'BMW X5 G05'],
  },
  {
    id: 'p13',
    slug: 'zerkalo-bokovoe',
    sku: 'BDY-MR01',
    oem: '51167449031',
    name: 'Зеркало боковое с обогревом',
    categoryId: 'body',
    price: 11200,
    tag: 'Левое',
    shortNote: 'Под покраску',
    description:
      'Корпус зеркала с электроприводом и обогревом. Покрытие грунтом под окраску в цвет кузова. Установка рекомендуется в сертифицированном сервисе.',
    inStock: true,
    stock: 3,
    manufacturer: 'TYC',
    compatibility: ['BMW 3 G20'],
  },
  {
    id: 'p14',
    slug: 'lampa-h7-osram',
    sku: 'EL-H701',
    oem: '63217160781',
    name: 'Лампа галогенная H7',
    categoryId: 'electrical',
    price: 590,
    tag: '2 шт.',
    shortNote: 'Набор ближний/дальний по схеме авто',
    description:
      'Галогенные лампы повышенной яркости в сравнении со штатными. Не превышают допустимую мощность для отражателей. Проверьте тип цоколя в инструкции к авто.',
    inStock: true,
    stock: 60,
    manufacturer: 'Osram',
    compatibility: ['VW Polo', 'Skoda Rapid', 'Hyundai Solaris'],
  },
  {
    id: 'p15',
    slug: 'remen-generatora',
    sku: 'ENG-BLT7',
    oem: '11287628653',
    name: 'Ремень приводной поликлиновый',
    categoryId: 'engine',
    price: 2190,
    tag: 'Conti',
    shortNote: '6PK987',
    description:
      'Поликлиновой ремень для привода генератора и насоса ГУР (по схеме). Эластичное покрытие снижает шум. Замените натяжитель при износе.',
    inStock: true,
    stock: 15,
    manufacturer: 'Continental',
    compatibility: ['BMW 320i G20', 'BMW 330i G20'],
  },
  {
    id: 'p16',
    slug: 'salonnyy-filtr-ugolnyy',
    sku: 'FLT-CF22',
    oem: '64119382888',
    name: 'Салонный фильтр угольный',
    categoryId: 'filters',
    price: 1890,
    tag: 'Уголь',
    shortNote: 'Задержка запахов и аллергенов',
    description:
      'Двухслойный фильтр с активированным углём. Рекомендуется для городской эксплуатации. Замена каждые 15 тыс. км или раз в год.',
    inStock: true,
    stock: 28,
    manufacturer: 'MANN-FILTER',
    compatibility: ['BMW 3 G20', 'BMW X3 G01'],
  },
  {
    id: 'p17',
    slug: 'kolesnyy-podshipnik',
    sku: 'SUS-WB88',
    oem: '33416762317',
    name: 'Подшипник ступицы передний',
    categoryId: 'suspension',
    price: 5400,
    tag: 'FAG',
    shortNote: 'С магнитным кольцом ABS',
    description:
      'Интегрированный подшипник ступицы с ABS-кольцом. Прессуется в ступицу на прессе. Работы только в условиях СТО с оборудованием.',
    inStock: true,
    stock: 6,
    manufacturer: 'Schaeffler',
    compatibility: ['BMW 3 G20'],
  },
  {
    id: 'p18',
    slug: 'peredniy-bamper-grunt',
    sku: 'BDY-BP01',
    oem: '51118074112',
    name: 'Бампер передний под окраску',
    categoryId: 'body',
    price: 24600,
    tag: 'Крупногабарит',
    shortNote: 'Доставка по согласованию',
    description:
      'Бампер в грунте без отверстий под парктроники (заглушки в комплекте). Требует окраски и установки кронштейнов с оригинала при необходимости.',
    inStock: true,
    stock: 2,
    manufacturer: 'FPS',
    compatibility: ['BMW 3 G20'],
  },
  {
    id: 'p19',
    slug: 'antifriz-g12-1-5l',
    sku: 'FLT-AF12',
    oem: '83192211191',
    name: 'Антифриз концентрат G12++ 1,5 л',
    categoryId: 'filters',
    price: 890,
    tag: 'Жидкость',
    shortNote: 'Разводка с дистиллированной водой по инструкции',
    description:
      'Карбоксилатный антифриз для систем охлаждения алюминиевых и чугунных двигателей. Не смешивать с силикатными жидкостями. Хранить вдали от детей.',
    inStock: true,
    stock: 44,
    manufacturer: 'FeBi',
    compatibility: ['VW Golf 7', 'Skoda Octavia III', 'BMW 3 G20'],
  },
  {
    id: 'p20',
    slug: 'datchik-abs-zadniy',
    sku: 'EL-ABS02',
    oem: '34526752682',
    name: 'Датчик ABS задний',
    categoryId: 'electrical',
    price: 1750,
    tag: 'Датчик',
    shortNote: 'Левый/правый — уточняйте по каталогу авто',
    description:
      'Активный датчик частоты вращения колеса. После замены может потребоваться адаптация блока ABS (в зависимости от модели). Установка на СТО.',
    inStock: true,
    stock: 17,
    manufacturer: 'ATE',
    compatibility: ['BMW 3 G20', 'BMW X3 G01'],
  },
]

const bySlug = new Map(products.map((p) => [p.slug, p]))
const byId = new Map(products.map((p) => [p.id, p]))

export function getProductBySlug(slug: string): Product | undefined {
  return bySlug.get(slug)
}

export function getProductById(id: string): Product | undefined {
  return byId.get(id)
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return products
  return products.filter((p) => {
    const hay =
      `${p.name} ${p.sku} ${p.oem} ${p.manufacturer} ${p.shortNote} ${p.description}`.toLowerCase()
    return hay.includes(q)
  })
}

const OEM_TOKEN = /[\s\-]/g

/** Расширенный поиск: OEM/SKU с игнорированием пробелов и дефисов в запросе. */
export function searchProductsExtended(query: string): Product[] {
  const raw = query.trim()
  if (!raw) return products
  const q = raw.toLowerCase()
  const qCompact = q.replace(OEM_TOKEN, '')
  return products.filter((p) => {
    const oem = p.oem.toLowerCase()
    const sku = p.sku.toLowerCase()
    const hay =
      `${p.name} ${p.sku} ${p.oem} ${p.manufacturer} ${p.shortNote} ${p.description}`.toLowerCase()
    if (hay.includes(q)) return true
    if (qCompact.length >= 6 && oem.replace(OEM_TOKEN, '').includes(qCompact)) return true
    if (qCompact.length >= 4 && sku.replace(OEM_TOKEN, '').includes(qCompact)) return true
    return false
  })
}

export function countProductsByCategory(): Record<CategoryId, number> {
  const acc = {} as Record<CategoryId, number>
  for (const c of categories) {
    acc[c.id] = 0
  }
  for (const p of products) {
    acc[p.categoryId] += 1
  }
  return acc
}

export const catalogManufacturers: string[] = [...new Set(products.map((p) => p.manufacturer))].sort((a, b) =>
  a.localeCompare(b, 'ru'),
)

export const DEMO_CATALOG_TOTAL = products.length
