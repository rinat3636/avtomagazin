import { useMemo, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getProductById } from '../data/catalog'
import { formatPrice } from '../lib/format'
import type { CheckoutPayload } from '../types'
import { Breadcrumbs, PageHeader } from '../components/Breadcrumbs'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

const LAST_ORDER_KEY = 'avtmz_last_order'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { lines, clear } = useCart()
  const toast = useToast()

  const rows = useMemo(
    () =>
      lines
        .map((l) => {
          const p = getProductById(l.productId)
          return p ? { line: l, product: p } : null
        })
        .filter((x): x is NonNullable<typeof x> => x !== null),
    [lines],
  )

  const subtotal = rows.reduce((s, r) => s + r.product.price * r.line.qty, 0)
  const delivery = subtotal > 0 && subtotal < 5000 ? 490 : 0

  const [form, setForm] = useState<CheckoutPayload>({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    comment: '',
    payment: 'card',
  })

  if (rows.length === 0) {
    return <Navigate to="/cart" replace />
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.city.trim() || !form.address.trim()) {
      toast.show('Заполните имя, телефон, город и адрес')
      return
    }
    const orderId = `AM-${Date.now().toString(36).toUpperCase()}`
    try {
      sessionStorage.setItem(
        LAST_ORDER_KEY,
        JSON.stringify({ orderId, createdAt: Date.now(), items: rows.length }),
      )
    } catch {
      /* ignore */
    }
    clear()
    toast.show('Заказ принят в обработку')
    navigate('/order/success', { replace: true, state: { orderId } })
  }

  return (
    <main>
      <Breadcrumbs
        items={[{ to: '/', label: 'Главная' }, { to: '/cart', label: 'Корзина' }, { label: 'Оформление' }]}
      />
      <PageHeader
        title="Оформление заказа"
        subtitle="Проверьте контактные данные и адрес доставки. После отправки заявки менеджер подтвердит наличие, стоимость доставки и сроки."
      />

      <div className="shell checkout-grid">
        <form className="card-form" onSubmit={onSubmit}>
          <h2 className="form-section-title">Получатель</h2>
          <div className="form-grid">
            <label className="field-label">
              Имя и фамилия
              <input
                className="field"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
            </label>
            <label className="field-label">
              Телефон
              <input
                className="field"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                inputMode="tel"
                placeholder="+7…"
                required
              />
            </label>
            <label className="field-label field-label--full">
              Email
              <input
                className="field"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="для чека (необязательно)"
              />
            </label>
          </div>

          <h2 className="form-section-title">Доставка</h2>
          <div className="form-grid">
            <label className="field-label">
              Город
              <input
                className="field"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                required
              />
            </label>
            <label className="field-label field-label--full">
              Адрес (улица, дом, подъезд)
              <input
                className="field"
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                required
              />
            </label>
            <label className="field-label field-label--full">
              Комментарий
              <textarea
                className="field field--area"
                rows={3}
                value={form.comment}
                onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                placeholder="Код домофона, время доставки…"
              />
            </label>
          </div>

          <h2 className="form-section-title">Оплата</h2>
          <div className="radio-group">
            <label className="radio">
              <input
                type="radio"
                name="pay"
                checked={form.payment === 'card'}
                onChange={() => setForm((f) => ({ ...f, payment: 'card' }))}
              />
              <span>Картой онлайн</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="pay"
                checked={form.payment === 'cash'}
                onChange={() => setForm((f) => ({ ...f, payment: 'cash' }))}
              />
              <span>Наличными / картой курьеру</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="pay"
                checked={form.payment === 'invoice'}
                onChange={() => setForm((f) => ({ ...f, payment: 'invoice' }))}
              />
              <span>Счёт для юрлица</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn--solid">
              Подтвердить заказ
            </button>
            <Link to="/cart" className="btn btn--outline">
              Назад в корзину
            </Link>
          </div>
        </form>

        <aside className="checkout-aside">
          <h2 className="checkout-aside__title">Ваш заказ</h2>
          <ul className="checkout-lines">
            {rows.map(({ line, product }) => (
              <li key={product.id}>
                <span className="checkout-lines__n">{product.name}</span>
                <span className="checkout-lines__q">
                  {line.qty} × {formatPrice(product.price)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="cart-summary__dl">
            <div>
              <dt>Товары</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div>
              <dt>Доставка</dt>
              <dd>{delivery === 0 ? '0 ₽' : formatPrice(delivery)}</dd>
            </div>
          </dl>
          <p className="cart-summary__total">
            К оплате <span>{formatPrice(subtotal + delivery)}</span>
          </p>
        </aside>
      </div>
    </main>
  )
}
