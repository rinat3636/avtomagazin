import { type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  categories,
  products,
  countProductsByCategory,
  catalogManufacturers,
} from '../data/catalog'
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
      <section className="store-hero" aria-labelledby="store-hero-title">
        <div className="shell store-hero__grid">
          <div className="store-hero__main">
            <p className="store-hero__kicker">Запчасти для вашего авто</p>
            <h1 id="store-hero-title" className="store-hero__title">
              Найдите деталь по номеру или по разделу
            </h1>
            <p className="store-hero__lead">
              Введите номер с наклейки на детали или напишите, что нужно — покажем подходящие позиции. Категории и
              фильтры — в каталоге слева после перехода в раздел.
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
                placeholder="Например: колодки передние или номер с этикетки"
                autoComplete="off"
              />
              <button type="submit" className="btn btn--solid store-hero__search-btn">
                Найти
              </button>
            </form>
            <div className="store-hero__cta-row">
              <Link to="/catalog" className="btn btn--outline store-hero__cta">
                Открыть каталог
              </Link>
              <Link to="/garage" className="btn btn--outline store-hero__cta">
                Указать автомобиль
              </Link>
            </div>
          </div>
          <aside className="store-hero__aside" aria-label="Ваш автомобиль">
            <div className="store-aside-card">
              <p className="store-aside-card__label">Автомобиль</p>
              <p className="store-aside-card__title">
                {vehicle ? `${vehicle.brand} ${vehicle.model}, ${vehicle.year}` : 'Не выбран'}
              </p>
              <p className="store-aside-card__meta">
                {vehicle ? vehicle.engine : 'Если укажете марку и модель — в каталоге можно отфильтровать «под ваш авто».'}
              </p>
              <div className="store-aside-card__actions">
                <Link to="/garage" className="btn btn--solid btn--full">
                  <IconCar />
                  {vehicle ? 'Изменить' : 'Выбрать авто'}
                </Link>
                {vehicle ? (
                  <button type="button" className="btn btn--outline btn--full" onClick={() => setVehicle(null)}>
                    Очистить
                  </button>
                ) : null}
              </div>
            </div>
            <div className="store-aside-card store-aside-card--muted">
              <p className="store-aside-card__label">Вопрос по подбору</p>
              <p className="store-aside-card__title">Напишите в поддержку</p>
              <p className="store-aside-card__meta">Поможем с артикулом и применимостью.</p>
              <Link to="/support" className="btn btn--outline btn--full">
                Написать
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="store-trust shell" aria-label="Коротко о заказе">
        <div className="store-trust__item">
          <span className="store-trust__icon" aria-hidden>
            ✓
          </span>
          <div>
            <p className="store-trust__title">Наличие в карточке товара</p>
            <p className="store-trust__text">Смотрите под ценой: есть на складе или под заказ.</p>
          </div>
        </div>
        <div className="store-trust__item">
          <span className="store-trust__icon" aria-hidden>
            ✓
          </span>
          <div>
            <p className="store-trust__title">Доставка или самовывоз</p>
            <p className="store-trust__text">Способ уточним после оформления заказа.</p>
          </div>
        </div>
        <div className="store-trust__item">
          <span className="store-trust__icon" aria-hidden>
            ✓
          </span>
          <div>
            <p className="store-trust__title">Возврат по правилам магазина</p>
            <p className="store-trust__text">Условия — в разделе «Возврат» внизу страницы.</p>
          </div>
        </div>
      </section>

      <section className="section section--tint shell" aria-labelledby="cat-title">
        <div className="section__head">
          <h2 id="cat-title" className="section__title">
            Каталог по разделам
          </h2>
          <p className="section__subtitle">
            Выберите раздел — откроется список товаров с фильтрами слева (бренд, цена, наличие).
          </p>
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

      <section className="section shell" aria-labelledby="brands-title">
        <div className="section__head">
          <h2 id="brands-title" className="section__title">
            Поиск по бренду
          </h2>
          <p className="section__subtitle">Нажмите название — откроется поиск по этому производителю.</p>
        </div>
        <div className="store-brand-row" role="list">
          {catalogManufacturers.map((name) => (
            <Link key={name} className="store-brand-chip" role="listitem" to={`/search?q=${encodeURIComponent(name)}`}>
              {name}
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell" aria-labelledby="hits-title">
        <div className="section__head section__head--row">
          <div>
            <h2 id="hits-title" className="section__title">
              Примеры из каталога
            </h2>
            <p className="section__subtitle">Так выглядят карточки: цена, наличие, кнопка в корзину.</p>
          </div>
          <Link className="link-more" to="/catalog">
            Все товары
          </Link>
        </div>
        <div className="product-grid product-grid--home">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="section shell" aria-labelledby="svc-title">
        <h2 id="svc-title" className="sr-only">
          Доставка и оплата
        </h2>
        <div className="store-service-grid">
          <div className="store-service-card">
            <h3 className="store-service-card__title">Доставка</h3>
            <p className="store-service-card__text">Курьер, ТК или самовывоз — обсудим после заказа.</p>
            <Link to="/delivery" className="store-service-card__link">
              Подробнее →
            </Link>
          </div>
          <div className="store-service-card">
            <h3 className="store-service-card__title">Оплата</h3>
            <p className="store-service-card__text">Варианты оплаты — на шаге оформления. Юрлицам — по счёту.</p>
            <Link to="/delivery" className="store-service-card__link">
              Подробнее →
            </Link>
          </div>
          <div className="store-service-card">
            <h3 className="store-service-card__title">Возврат</h3>
            <p className="store-service-card__text">Если деталь не подошла или брак — по регламенту.</p>
            <Link to="/returns" className="store-service-card__link">
              Подробнее →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
