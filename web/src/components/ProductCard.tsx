import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { formatPrice } from '../lib/format'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'
import { IconHeart } from './icons'

export function ProductCard({ product, compact }: { product: Product; compact?: boolean }) {
  const { add } = useCart()
  const { toggle, has } = useFavorites()
  const toast = useToast()
  const fav = has(product.id)

  return (
    <article className={`product-card${compact ? ' product-card--compact' : ''}`}>
      <Link
        to={`/product/${product.slug}`}
        className="product-card__media"
        tabIndex={-1}
        aria-label={`${product.name} — открыть карточку`}
      >
        <span className="product-card__placeholder" aria-hidden />
      </Link>
      <div className="product-card__body">
        <div className="product-card__top">
          <span className="pill">{product.tag}</span>
          <button
            type="button"
            className={`icon-btn${fav ? ' icon-btn--active' : ''}`}
            aria-label={fav ? 'Убрать из избранного' : 'В избранное'}
            onClick={(e) => {
              e.preventDefault()
              toggle(product.id)
              toast.show(fav ? 'Удалено из избранного' : 'Добавлено в избранное')
            }}
          >
            <IconHeart filled={fav} />
          </button>
        </div>
        <h3 className="product-card__title">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="product-card__mfr">{product.manufacturer}</p>
        <p className="product-card__sku">
          Артикул {product.sku} · № {product.oem}
        </p>
        <p className={`product-card__stock ${product.inStock ? 'product-card__stock--ok' : 'product-card__stock--no'}`}>
          {product.inStock ? `В наличии на складе: ${product.stock} шт.` : 'Нет в наличии — под заказ'}
        </p>
        {!compact ? <p className="product-card__note">{product.shortNote}</p> : null}
        <div className="product-card__row">
          <div className="product-card__prices">
            <span className="product-card__price">{formatPrice(product.price)}</span>
            {product.oldPrice ? (
              <span className="product-card__old">{formatPrice(product.oldPrice)}</span>
            ) : null}
          </div>
          <button
            type="button"
            className="btn btn--mini"
            disabled={!product.inStock}
            onClick={() => {
              add(product.id, 1)
              toast.show('Товар добавлен в корзину')
            }}
          >
            {product.inStock ? 'В корзину' : 'Нет'}
          </button>
        </div>
      </div>
    </article>
  )
}
