import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProductBySlug, categories } from '../data/catalog'
import { formatPrice } from '../lib/format'
import { Breadcrumbs, PageHeader } from '../components/Breadcrumbs'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'
import { IconHeart } from '../components/icons'
import { productPageCopy, productUiCopy } from '../content/siteCopy'

export function ProductPage() {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : undefined
  const { add, lines, remove } = useCart()
  const { toggle, has } = useFavorites()
  const toast = useToast()
  const [qty, setQtyInput] = useState(1)

  const line = useMemo(() => lines.find((l) => l.productId === product?.id), [lines, product?.id])

  useEffect(() => {
    if (!product) return
    document.title = `${product.name} — АвтоМагазин`
    return () => {
      document.title = 'АвтоМагазин'
    }
  }, [product])

  if (!slug || !product) {
    return <Navigate to="/404" replace />
  }

  const fav = has(product.id)
  const maxOrder = product.inStock ? Math.max(1, product.stock) : 1

  const categoryLabel =
    categories.find((c) => c.id === product.categoryId)?.label ?? productPageCopy.categoryFallback

  return (
    <main>
      <Breadcrumbs
        items={[
          { to: '/', label: 'Главная' },
          { to: '/catalog', label: 'Каталог' },
          { to: `/catalog/${product.categoryId}`, label: categoryLabel },
          { label: product.name },
        ]}
      />
      <div className="shell product-page">
        <div className="product-page__media">
          <span className="product-page__placeholder" aria-hidden />
          <div className="product-page__badges">
            <span className="pill">{product.tag}</span>
            {!product.inStock ? <span className="pill pill--warn">{productPageCopy.pillOut}</span> : null}
          </div>
        </div>

        <div className="product-page__info">
          <PageHeader
            title={product.name}
            subtitle={productPageCopy.subtitle(product.manufacturer, product.sku)}
          />
          <p className="product-page__oem">
            {productPageCopy.oemLead} <span>{product.oem}</span>
          </p>
          <p className="product-page__lead">{product.shortNote}</p>

          <div className="product-page__buy">
            <div className="product-page__prices">
              <span className="product-page__price">{formatPrice(product.price)}</span>
              {product.oldPrice ? (
                <span className="product-page__old">{formatPrice(product.oldPrice)}</span>
              ) : null}
            </div>
            <div className="product-page__actions">
              <button
                type="button"
                className={`icon-btn icon-btn--lg${fav ? ' icon-btn--active' : ''}`}
                aria-label={productPageCopy.favAria}
                onClick={() => {
                  toggle(product.id)
                  toast.show(fav ? productUiCopy.favRemove : productUiCopy.favAdd)
                }}
              >
                <IconHeart filled={fav} />
              </button>
            </div>
          </div>

          <div className="product-page__controls">
            <label className="qty" htmlFor="pqty">
              {productPageCopy.qtyLabel}
              <input
                id="pqty"
                type="number"
                min={1}
                max={maxOrder}
                className="field field--narrow"
                value={qty}
                onChange={(e) => {
                  const v = Number(e.target.value)
                  if (Number.isNaN(v)) return
                  setQtyInput(Math.min(maxOrder, Math.max(1, Math.floor(v))))
                }}
                disabled={!product.inStock}
              />
            </label>
            <button
              type="button"
              className="btn btn--solid btn--wide"
              disabled={!product.inStock}
              onClick={() => {
                add(product.id, qty)
                toast.show(productUiCopy.addedToastQty(qty))
              }}
            >
              {productPageCopy.addWide}
            </button>
            <Link to="/cart" className="btn btn--outline">
              {productPageCopy.toCart}
            </Link>
          </div>

          {line ? (
            <div className="in-cart">
              <p className="in-cart__title">{productPageCopy.inCartTitle(line.qty)}</p>
              <div className="in-cart__row">
                <button type="button" className="btn btn--ghost" onClick={() => setQtyInput(line.qty)}>
                  {productPageCopy.syncQty}
                </button>
                <button type="button" className="btn btn--ghost" onClick={() => remove(product.id)}>
                  {productPageCopy.removeLine}
                </button>
              </div>
            </div>
          ) : null}

          <section className="product-section" aria-labelledby="desc">
            <h2 id="desc" className="product-section__title">
              {productPageCopy.sectionDesc}
            </h2>
            <p className="product-section__text">{product.description}</p>
          </section>

          <section className="product-section" aria-labelledby="compat">
            <h2 id="compat" className="product-section__title">
              {productPageCopy.sectionCompat}
            </h2>
            <ul className="compat-list">
              {product.compatibility.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>

          <table className="spec-table">
            <tbody>
              <tr>
                <th>{productPageCopy.specMfr}</th>
                <td>{product.manufacturer}</td>
              </tr>
              <tr>
                <th>{productPageCopy.specSku}</th>
                <td>{product.sku}</td>
              </tr>
              <tr>
                <th>{productPageCopy.specOem}</th>
                <td>{product.oem}</td>
              </tr>
              <tr>
                <th>{productPageCopy.specStock}</th>
                <td>
                  {product.inStock ? productPageCopy.specStockVal(product.stock) : productPageCopy.specStockOrder}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
