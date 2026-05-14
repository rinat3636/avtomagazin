import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { DEMO_CATALOG_TOTAL, searchProductsExtended } from '../data/catalog'
import { Breadcrumbs, PageHeader } from '../components/Breadcrumbs'
import { ProductCard } from '../components/ProductCard'

const POPULAR = [
  { label: 'OEM 34116792227', q: '34116792227' },
  { label: 'Brembo колодки', q: 'brembo' },
  { label: 'MANN фильтр', q: 'mann' },
  { label: 'Артикул BRK-2048', q: 'BRK-2048' },
  { label: 'Амортизатор Sachs', q: 'sachs' },
  { label: 'ГРМ комплект', q: 'грм' },
  { label: 'Антифриз G12', q: 'g12' },
  { label: 'ABS датчик', q: 'abs' },
] as const

export function SearchPage() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''
  const results = useMemo(() => searchProductsExtended(q), [q])

  return (
    <main>
      <Breadcrumbs items={[{ to: '/', label: 'Главная' }, { label: 'Поиск' }]} />
      <PageHeader
        title="Поиск по каталогу"
        subtitle={
          q
            ? `Запрос: «${q}». Найдено: ${results.length} из ${DEMO_CATALOG_TOTAL}. Учитываются название, OEM, SKU, бренд.`
            : `Введите запрос в строке поиска в шапке сайта или выберите пример ниже. В каталоге ${DEMO_CATALOG_TOTAL} наименований.`
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
              Подбор по авто (гараж)
            </Link>
          </div>
        </section>

        {results.length === 0 && q ? (
          <div className="empty-state">
            <p className="empty-state__title">Ничего не найдено</p>
            <p className="empty-state__text">
              Попробуйте другой OEM, артикул без пробелов или перейдите в каталог с фильтрами по бренду.
            </p>
            <Link to="/catalog" className="btn btn--solid">
              Открыть каталог
            </Link>
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
