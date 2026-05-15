import { type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { categories, products, countProductsByCategory } from '../data/catalog'
import { IconCar } from '../components/icons'
import { ProductCard } from '../components/ProductCard'
import { useGarage } from '../context/GarageContext'

const categoryCounts = countProductsByCategory()

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
      <section className="store-hero store-hero--tz" aria-labelledby="store-hero-title">
        <div className="shell store-hero__grid">
          <div className="store-hero__main">
            <h1 id="store-hero-title" className="store-hero__title">
              Запчасти: поиск и каталог
            </h1>
            <p className="store-hero__lead">
              Введите номер с наклейки или название детали. Либо откройте раздел ниже — там фильтры по бренду и цене.
            </p>
            <form className="store-hero__search" role="search" onSubmit={onHeroSearch}>
              <label className="sr-only" htmlFor="hero-q">
                Поиск запчастей
              </label>
              <input
                id="hero-q"
                name="q"
                type="search"
                className="store-hero__search-input"
                placeholder="Например: колодки или номер с этикетки"
                autoComplete="off"
              />
              <button type="submit" className="btn btn--solid store-hero__search-btn">
                Найти
              </button>
            </form>
            <div className="store-hero__cta-row">
              <Link to="/catalog" className="btn btn--outline store-hero__cta">
                Все разделы каталога
              </Link>
              <Link to="/garage" className="btn btn--outline store-hero__cta">
                Указать автомобиль
              </Link>
            </div>
          </div>
          <aside className="store-hero__aside" aria-label="Автомобиль">
            <div className="store-aside-card">
              <p className="store-aside-card__label">Моё авто</p>
              <p className="store-aside-card__title">
                {vehicle ? `${vehicle.brand} ${vehicle.model}, ${vehicle.year}` : 'Не указан'}
              </p>
              <p className="store-aside-card__meta">
                {vehicle
                  ? vehicle.engine
                  : 'Укажите марку и модель — в каталоге появится отбор «под ваш авто».'}
              </p>
              <div className="store-aside-card__actions">
                <Link to="/garage" className="btn btn--solid btn--full">
                  <IconCar />
                  {vehicle ? 'Изменить' : 'Указать авто'}
                </Link>
                {vehicle ? (
                  <button type="button" className="btn btn--outline btn--full" onClick={() => setVehicle(null)}>
                    Очистить
                  </button>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="store-trust shell" aria-label="Условия заказа">
        <div className="store-trust__item">
          <span className="store-trust__icon" aria-hidden>
            ✓
          </span>
          <div>
            <p className="store-trust__title">Наличие в карточке</p>
            <p className="store-trust__text">Под ценой: на складе или под заказ.</p>
          </div>
        </div>
        <div className="store-trust__item">
          <span className="store-trust__icon" aria-hidden>
            ✓
          </span>
          <div>
            <p className="store-trust__title">Доставка и самовывоз</p>
            <p className="store-trust__text">Подробности — в разделе «Доставка и оплата».</p>
          </div>
        </div>
        <div className="store-trust__item">
          <span className="store-trust__icon" aria-hidden>
            ✓
          </span>
          <div>
            <p className="store-trust__title">Возврат</p>
            <p className="store-trust__text">Правила — в разделе «Возврат» в подвале сайта.</p>
          </div>
        </div>
      </section>

      <section className="section section--tint shell" aria-labelledby="cat-title">
        <div className="section__head">
          <h2 id="cat-title" className="section__title">
            Разделы каталога
          </h2>
          <p className="section__subtitle">Выберите тип детали — откроется список с фильтрами слева.</p>
        </div>
        <div className="cat-grid cat-grid--store">
          {categories.map((c) => (
            <Link key={c.id} className="cat-card cat-card--store" to={`/catalog/${c.id}`}>
              <span className="cat-card__label">{c.label}</span>
              <span className="cat-card__hint">{c.hint}</span>
              <span className="cat-card__count">{categoryCounts[c.id]} позиций</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell" aria-labelledby="hits-title">
        <div className="section__head section__head--row">
          <div>
            <h2 id="hits-title" className="section__title">
              Примеры товаров
            </h2>
            <p className="section__subtitle">Цена, наличие и кнопка «В корзину».</p>
          </div>
          <Link className="link-more" to="/catalog">
            В каталог
          </Link>
        </div>
        <div className="product-grid product-grid--home">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  )
}
