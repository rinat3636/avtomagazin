import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/catalog'
import { Breadcrumbs, PageHeader } from '../components/Breadcrumbs'
import { ProductCard } from '../components/ProductCard'
import { useFavorites } from '../context/FavoritesContext'

export function FavoritesPage() {
  const { ids } = useFavorites()
  const list = useMemo(() => products.filter((p) => ids.has(p.id)), [ids])

  return (
    <main>
      <Breadcrumbs items={[{ to: '/', label: 'Главная' }, { label: 'Избранное' }]} />
      <PageHeader title="Избранное" subtitle="Список избранных товаров для быстрого доступа при следующем визите." />

      <div className="shell">
        {list.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__title">Список избранного пуст</p>
            <p className="empty-state__text">Добавляйте позиции в избранное значком на карточке в каталоге или на странице товара.</p>
            <Link to="/catalog" className="btn btn--solid">
              В каталог
            </Link>
          </div>
        ) : (
          <div className="product-grid product-grid--catalog">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
