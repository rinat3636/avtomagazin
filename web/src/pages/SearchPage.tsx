import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { searchProductsExtended } from '../data/catalog'
import { Breadcrumbs, PageHeader } from '../components/Breadcrumbs'
import { ProductCard } from '../components/ProductCard'

const POPULAR = [
  { label: 'Номер 34116792227', q: '34116792227' },
  { label: 'Колодки Brembo', q: 'brembo' },
  { label: 'Фильтр MANN', q: 'mann' },
  { label: 'Артикул BRK-2048', q: 'BRK-2048' },
  { label: 'Амортизатор Sachs', q: 'sachs' },
  { label: 'Комплект ГРМ', q: 'грм' },
  { label: 'Антифриз G12', q: 'g12' },
  { label: 'Датчик ABS', q: 'abs' },
] as const

export function SearchPage() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''
  const results = useMemo(() => searchProductsExtended(q), [q])

  return (
    <main>
      <Breadcrumbs items={[{ to: '/', label: 'Главная' }, { label: 'Поиск' }]} />
      <PageHeader
        title="Поиск"
        subtitle={
          q
            ? `Запрос «${q}». Найдено позиций: ${results.length}.`
            : 'Введите запрос в строке поиска вверху или выберите пример ниже.'
        }
      />

      <div className="shell search-page">
        <section className="popular-search" aria-label="Частые запросы">
          <p className="popular-search__label">Частые запросы</p>
          <div className="popular-search__chips">
            {POPULAR.map((item) => (
              <Link key={item.q} className="search-chip" to={`/search?q=${encodeURIComponent(item.q)}`}>
                {item.label}
              </Link>
            ))}
            <Link className="search-chip search-chip--accent" to="/garage">
              Моё авто
            </Link>
          </div>
        </section>

        {results.length === 0 && q ? (
          <div className="empty-state">
            <p className="empty-state__title">Ничего не найдено</p>
            <p className="empty-state__text">
              Измените запрос или откройте каталог с фильтрами по разделу и бренду.
            </p>
            <div className="empty-state__actions">
              <Link to="/catalog" className="btn btn--solid">
                Открыть каталог
              </Link>
              <Link to="/" className="btn btn--outline">
                На главную
              </Link>
            </div>
          </div>
        ) : results.length > 0 ? (
          <div className="product-grid product-grid--catalog">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        ) : null}
      </div>
    </main>
  )
}
