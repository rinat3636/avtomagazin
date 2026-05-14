import { useMemo, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import type { CategoryId } from '../types'
import {
  DEMO_CATALOG_TOTAL,
  catalogManufacturers,
  categories,
  countProductsByCategory,
  products,
} from '../data/catalog'
import { productMatchesGarage } from '../data/filters'
import { Breadcrumbs, PageHeader } from '../components/Breadcrumbs'
import { ProductCard } from '../components/ProductCard'
import { useGarage } from '../context/GarageContext'

const IDS = new Set<CategoryId>(categories.map((c) => c.id))
const categoryCounts = countProductsByCategory()

type SortKey = 'popular' | 'price-asc' | 'price-desc' | 'name-asc'

export function CatalogPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { vehicle } = useGarage()
  const [sort, setSort] = useState<SortKey>('popular')
  const [onlyStock, setOnlyStock] = useState(false)
  const [onlyGarage, setOnlyGarage] = useState(false)
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [selectedMfrs, setSelectedMfrs] = useState<string[]>([])
  const [oemQuick, setOemQuick] = useState('')

  const activeCategory =
    categoryId && IDS.has(categoryId as CategoryId) ? (categoryId as CategoryId) : undefined
  const invalidCategory = Boolean(categoryId && !IDS.has(categoryId as CategoryId))

  const toggleMfr = (name: string) => {
    setSelectedMfrs((prev) => (prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]))
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => (activeCategory ? p.categoryId === activeCategory : true))
    if (selectedMfrs.length) {
      list = list.filter((p) => selectedMfrs.includes(p.manufacturer))
    }
    if (onlyStock) list = list.filter((p) => p.inStock)
    if (onlyGarage) list = list.filter((p) => productMatchesGarage(p, vehicle))
    const minV = min === '' ? null : Number(min)
    const maxV = max === '' ? null : Number(max)
    if (minV !== null && !Number.isNaN(minV)) list = list.filter((p) => p.price >= minV)
    if (maxV !== null && !Number.isNaN(maxV)) list = list.filter((p) => p.price <= maxV)
    const next = [...list]
    if (sort === 'price-asc') next.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') next.sort((a, b) => b.price - a.price)
    if (sort === 'name-asc') next.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
    if (sort === 'popular') next.sort((a, b) => Number(b.inStock) - Number(a.inStock) || b.stock - a.stock)
    return next
  }, [activeCategory, selectedMfrs, onlyStock, onlyGarage, min, max, sort, vehicle])

  const catLabel = activeCategory ? categories.find((c) => c.id === activeCategory)?.label : 'Все категории'

  const hasActiveFilters =
    selectedMfrs.length > 0 || onlyStock || onlyGarage || min !== '' || max !== ''

  const resetFilters = () => {
    setSelectedMfrs([])
    setOnlyStock(false)
    setOnlyGarage(false)
    setMin('')
    setMax('')
    setSort('popular')
  }

  const onOemQuick = (e: FormEvent) => {
    e.preventDefault()
    const q = oemQuick.trim()
    if (!q) return
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  if (invalidCategory) {
    return <Navigate to="/catalog" replace />
  }

  return (
    <main className="catalog-main">
      <Breadcrumbs
        items={[
          { to: '/', label: 'Главная' },
          { to: '/catalog', label: 'Каталог' },
          ...(activeCategory
            ? [{ label: categories.find((c) => c.id === activeCategory)?.label ?? '' }]
            : []),
        ]}
      />
      <PageHeader
        title={catLabel ?? 'Каталог'}
        subtitle={`В выборке: ${filtered.length} из ${DEMO_CATALOG_TOTAL} наименований. Слева — категории с количеством позиций, фильтр по производителю, диапазон цены, признак наличия на складе и применимость к автомобилю из гаража.`}
      />

      <div className="catalog-layout shell">
        <aside className="catalog-filters" aria-label="Фильтры">
          <p className="filters__title">Категория</p>
          <ul className="filters__list">
            <li>
              <Link to="/catalog" className={!activeCategory ? 'filters__a filters__a--active' : 'filters__a'}>
                Все <span className="filters__count">({DEMO_CATALOG_TOTAL})</span>
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/catalog/${c.id}`}
                  className={activeCategory === c.id ? 'filters__a filters__a--active' : 'filters__a'}
                >
                  {c.label}{' '}
                  <span className="filters__count">({categoryCounts[c.id]})</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="filters__block">
            <p className="filters__title">Производитель</p>
            <p className="filters__hint filters__hint--tight">Допускается выбор нескольких производителей.</p>
            <div className="brand-chips" role="group" aria-label="Бренды">
              {catalogManufacturers.map((name) => (
                <button
                  key={name}
                  type="button"
                  className={`brand-chip${selectedMfrs.includes(name) ? ' brand-chip--on' : ''}`}
                  onClick={() => toggleMfr(name)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="filters__block">
            <p className="filters__title">Наличие</p>
            <label className="check">
              <input type="checkbox" checked={onlyStock} onChange={(e) => setOnlyStock(e.target.checked)} />
              <span>Только в наличии</span>
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={onlyGarage}
                onChange={(e) => setOnlyGarage(e.target.checked)}
                disabled={!vehicle}
              />
              <span>Подходит к авто из гаража</span>
            </label>
            {!vehicle ? <p className="filters__hint">Добавьте авто в разделе «Моё авто».</p> : null}
          </div>

          <div className="filters__block">
            <p className="filters__title">Цена, ₽</p>
            <div className="filters__row">
              <input
                className="field"
                inputMode="numeric"
                placeholder="от"
                value={min}
                onChange={(e) => setMin(e.target.value.replace(/[^\d]/g, ''))}
              />
              <input
                className="field"
                inputMode="numeric"
                placeholder="до"
                value={max}
                onChange={(e) => setMax(e.target.value.replace(/[^\d]/g, ''))}
              />
            </div>
          </div>

          <div className="filters__block">
            <p className="filters__title">Сортировка</p>
            <select className="select" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              <option value="popular">По популярности / наличию</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
              <option value="name-asc">Название А→Я</option>
            </select>
          </div>

          {hasActiveFilters ? (
            <button type="button" className="btn btn--outline btn--full-width" onClick={resetFilters}>
              Сбросить фильтры
            </button>
          ) : null}
        </aside>

        <section className="catalog-results" aria-label="Товары">
          <div className="oem-quick card-form">
            <p className="oem-quick__title">Быстрый поиск по OEM / артикулу</p>
            <p className="oem-quick__sub">Поиск по каталожному и складскому номеру; в запросе допускается запись без пробелов и дефисов.</p>
            <form className="oem-quick__form" onSubmit={onOemQuick}>
              <input
                className="field"
                placeholder="Например 34116792227 или BRK-2048"
                value={oemQuick}
                onChange={(e) => setOemQuick(e.target.value)}
                aria-label="OEM или артикул"
              />
              <button type="submit" className="btn btn--solid">
                Искать
              </button>
            </form>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state__title">Ничего не нашлось</p>
              <p className="empty-state__text">Смягчите фильтры или сбросьте категорию.</p>
              <Link to="/catalog" className="btn btn--solid">
                Сбросить категорию
              </Link>
            </div>
          ) : (
            <div className="product-grid product-grid--catalog">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
