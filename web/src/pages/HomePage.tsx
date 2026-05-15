import { type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { categories, products, countProductsByCategory } from '../data/catalog'
import {
  IconCar,
  IconWrench,
  IconBrakeDisk,
  IconShock,
  IconFunnel,
  IconBolt,
  IconTruck,
  IconShield,
  IconRefresh,
  IconSupport,
} from '../components/icons'
import { ProductCard } from '../components/ProductCard'
import { useGarage } from '../context/GarageContext'
import type { CategoryId } from '../types'
import type { ReactElement } from 'react'

const categoryCounts = countProductsByCategory()

const categoryIconMap: Record<CategoryId, ReactElement> = {
  engine: <IconWrench className="cat-icon" />,
  brakes: <IconBrakeDisk className="cat-icon" />,
  suspension: <IconShock className="cat-icon" />,
  filters: <IconFunnel className="cat-icon" />,
  electrical: <IconBolt className="cat-icon" />,
  body: <IconCar className="cat-icon" />,
}

const USP_ITEMS = [
  { icon: <IconTruck className="usp-bar__icon" />, title: 'Доставка 1–3 дня', text: 'По всей России' },
  { icon: <IconShield className="usp-bar__icon" />, title: 'Гарантия качества', text: 'Сертифицированные детали' },
  { icon: <IconRefresh className="usp-bar__icon" />, title: 'Возврат 14 дней', text: 'Без лишних вопросов' },
  { icon: <IconSupport className="usp-bar__icon" />, title: 'Поддержка', text: 'Пн–сб 09:00–20:00' },
]

const BRANDS = ['Bosch', 'MANN-FILTER', 'Brembo', 'NGK', 'SKF', 'Febi', 'Gates', 'Valeo', 'TRW', 'Sachs']

export function HomePage() {
  const navigate = useNavigate()
  const { vehicle, setVehicle } = useGarage()

  const onHeroSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const query = String(fd.get('q') ?? '').trim()
    if (!query) return
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <main>
      {/* ── 1. Герой ── */}
      <section className="pro-hero" aria-labelledby="pro-hero-title">
        <div className="shell pro-hero__shell">
          <p className="pro-hero__eyebrow">Авто Династия — запчасти для вашего автомобиля</p>
          <h1 id="pro-hero-title" className="pro-hero__title">
            Оригиналы и аналоги<br />с доставкой по России
          </h1>
          <p className="pro-hero__lead">
            Поиск по артикулу, OEM-номеру или названию. Более 10 000 позиций в наличии.
          </p>
          <form className="pro-hero__search" role="search" onSubmit={onHeroSearch}>
            <label className="sr-only" htmlFor="hero-q">Поиск запчастей</label>
            <input
              id="hero-q"
              name="q"
              type="search"
              className="pro-hero__input"
              placeholder="Название, артикул или OEM-номер..."
              autoComplete="off"
            />
            <button type="submit" className="btn btn--solid pro-hero__submit">
              Найти
            </button>
          </form>
          <div className="pro-hero__actions">
            <Link to="/garage" className="btn btn--ghost-on-dark">
              <IconCar className="icon" />
              Подбор по автомобилю
            </Link>
            <Link to="/catalog" className="pro-hero__link">
              Весь каталог →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. USP-полоса ── */}
      <section className="usp-bar" aria-label="Наши преимущества">
        <div className="shell usp-bar__grid">
          {USP_ITEMS.map((item) => (
            <div key={item.title} className="usp-bar__item">
              {item.icon}
              <div>
                <p className="usp-bar__title">{item.title}</p>
                <p className="usp-bar__text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Подбор по автомобилю ── */}
      <section className="vehicle-pick shell" aria-label="Подбор по автомобилю">
        <div className="vehicle-pick__wrap">
          <div className="vehicle-pick__text">
            <h2>Подбор запчастей по автомобилю</h2>
            <p>Укажите марку и модель — покажем только подходящие детали</p>
          </div>
          <div className="vehicle-pick__actions">
            {vehicle ? (
              <>
                <span className="vehicle-pick__current">
                  <IconCar className="icon" />
                  {vehicle.brand} {vehicle.model}, {vehicle.year}
                </span>
                <Link to="/catalog" className="btn btn--solid">
                  Смотреть запчасти
                </Link>
                <button type="button" className="btn btn--ghost" onClick={() => setVehicle(null)}>
                  Сменить авто
                </button>
              </>
            ) : (
              <Link to="/garage" className="btn btn--solid">
                <IconCar className="icon" />
                Выбрать автомобиль
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. Товарные группы ── */}
      <section className="section section--tint" aria-labelledby="cat-title">
        <div className="shell">
          <div className="section__head">
            <h2 id="cat-title" className="section__title">Товарные группы</h2>
            <p className="section__subtitle">Перейдите в раздел — откроется витрина с фильтрами по бренду, цене и наличию</p>
          </div>
          <div className="cat-grid cat-grid--icons">
            {categories.map((c) => (
              <Link key={c.id} to={`/catalog/${c.id}`} className="cat-card cat-card--icon" data-cat={c.id}>
                <span className="cat-card__icon-wrap" aria-hidden>
                  {categoryIconMap[c.id]}
                </span>
                <span className="cat-card__label">{c.label}</span>
                <span className="cat-card__hint">{c.hint}</span>
                <span className="cat-card__count">{categoryCounts[c.id]} позиций</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Популярные бренды ── */}
      <section className="section" aria-labelledby="brands-title">
        <div className="shell">
          <div className="section__head">
            <h2 id="brands-title" className="section__title">Популярные бренды</h2>
            <p className="section__subtitle">Работаем напрямую с официальными дистрибьюторами</p>
          </div>
          <div className="brand-row">
            {BRANDS.map((b) => (
              <Link key={b} to={`/catalog?brand=${encodeURIComponent(b)}`} className="brand-chip">
                {b}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Хиты продаж ── */}
      <section className="section section--tint" aria-labelledby="hits-title">
        <div className="shell">
          <div className="section__head section__head--row">
            <div>
              <h2 id="hits-title" className="section__title">Хиты продаж</h2>
              <p className="section__subtitle">Позиции с подтверждённым складским остатком</p>
            </div>
            <Link className="link-more" to="/catalog">
              Весь каталог
            </Link>
          </div>
          <div className="product-grid product-grid--home">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Как сделать заказ ── */}
      <section className="section" aria-labelledby="how-title">
        <div className="shell">
          <div className="section__head">
            <h2 id="how-title" className="section__title">Как сделать заказ</h2>
            <p className="section__subtitle">Три простых шага от поиска до получения</p>
          </div>
          <div className="how-grid">
            <div className="how-card">
              <span className="how-card__num">1</span>
              <h3 className="how-card__title">Найдите деталь</h3>
              <p className="how-card__text">
                Ищите по названию, артикулу или OEM-номеру. Или подберите по марке и модели автомобиля через раздел «Гараж».
              </p>
            </div>
            <div className="how-card">
              <span className="how-card__num">2</span>
              <h3 className="how-card__title">Оформите заказ</h3>
              <p className="how-card__text">
                Добавьте в корзину, выберите способ доставки и оплаты. Оплата картой или при получении.
              </p>
            </div>
            <div className="how-card how-card--accent">
              <span className="how-card__num">3</span>
              <h3 className="how-card__title">Получите быстро</h3>
              <p className="how-card__text">
                Доставляем по России за 1–3 дня. Самовывоз, курьер или транспортная компания.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
