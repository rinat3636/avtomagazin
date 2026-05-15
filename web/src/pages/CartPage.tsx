import { Link } from 'react-router-dom'
import { getProductById } from '../data/catalog'
import { formatPrice } from '../lib/format'
import { Breadcrumbs, PageHeader } from '../components/Breadcrumbs'
import { useCart } from '../context/CartContext'

export function CartPage() {
  const { lines, setQty, remove, clear } = useCart()

  const rows = lines
    .map((l) => {
      const p = getProductById(l.productId)
      return p ? { line: l, product: p } : null
    })
    .filter(Boolean) as { line: { productId: string; qty: number }; product: NonNullable<ReturnType<typeof getProductById>> }[]

  const subtotal = rows.reduce((s, r) => s + r.product.price * r.line.qty, 0)
  const delivery = subtotal > 0 && subtotal < 5000 ? 490 : 0

  return (
    <main>
      <Breadcrumbs items={[{ to: '/', label: 'Главная' }, { label: 'Корзина' }]} />
      <PageHeader title="Корзина" subtitle="Проверьте состав и количество перед оформлением заказа." />

      <div className="shell cart-layout">
        {rows.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__title">Корзина пуста</p>
            <p className="empty-state__text">Добавьте товары из каталога или через поиск в шапке.</p>
            <div className="empty-state__actions">
              <Link to="/catalog" className="btn btn--solid">
                В каталог
              </Link>
              <Link to="/" className="btn btn--outline">
                На главную
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="cart-table-wrap">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Товар</th>
                    <th>Цена</th>
                    <th>Кол-во</th>
                    <th>Сумма</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ line, product }) => (
                    <tr key={product.id}>
                      <td>
                        <Link to={`/product/${product.slug}`} className="cart-name">
                          {product.name}
                        </Link>
                        <div className="cart-meta">
                          {product.manufacturer} · арт. {product.sku} · № {product.oem}
                        </div>
                      </td>
                      <td>{formatPrice(product.price)}</td>
                      <td>
                        <input
                          className="field field--qty"
                          type="number"
                          min={1}
                          max={99}
                          value={line.qty}
                          onChange={(e) => setQty(product.id, Number(e.target.value))}
                        />
                      </td>
                      <td>{formatPrice(product.price * line.qty)}</td>
                      <td>
                        <button type="button" className="btn btn--ghost" onClick={() => remove(product.id)}>
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" className="btn btn--ghost clear-cart" onClick={() => clear()}>
                Очистить корзину
              </button>
            </div>

            <aside className="cart-summary">
              <h2 className="cart-summary__title">Итого</h2>
              <dl className="cart-summary__dl">
                <div>
                  <dt>Товары</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div>
                  <dt>Доставка</dt>
                  <dd>{delivery === 0 ? 'Бесплатно от 5 000 ₽' : formatPrice(delivery)}</dd>
                </div>
              </dl>
              <p className="cart-summary__total">
                К оплате <span>{formatPrice(subtotal + delivery)}</span>
              </p>
              <Link to="/checkout" className="btn btn--solid btn--wide">
                Оформить заказ
              </Link>
              <Link to="/catalog" className="btn btn--outline btn--wide">
                Продолжить покупки
              </Link>
            </aside>
          </>
        )}
      </div>
    </main>
  )
}
