import { type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { categories, products, DEMO_CATALOG_TOTAL, countProductsByCategory } from '../data/catalog'
import { IconCar } from '../components/icons'
import { ProductCard } from '../components/ProductCard'
import { useGarage } from '../context/GarageContext'

const categoryCounts = countProductsByCategory()

export function HomePage() {
  const navigate = useNavigate()
  const { vehicle, label, setVehicle } = useGarage()

  const onHeroSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const query = String(fd.get('q') ?? '').trim()
    if (!query) return
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <main>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">Запчасти и аксессуары</p>
          <h1 id="hero-title" className="hero__title">
            Автозапчасти
            <br />
            <span className="hero__title-soft">с подбором по автомобилю и OEM</span>
          </h1>
          <p className="hero__lead">
            Каталог с фильтрами по категории и производителю, поиск по артикулу и оригинальному номеру,
            гараж для учёта комплектации и проверки применимости позиций.
          </p>
          <form className="search hero__search" role="search" onSubmit={onHeroSearch}>
            <label className="sr-only" htmlFor="hero-q">
              Поиск запчастей
            </label>
            <span className="search__icon" aria-hidden>
              <svg className="icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M10 2a8 8 0 1 1-4.9 14.3l-3.4 3.4 1.4 1.4 3.4-3.4A8 8 0 0 1 10 2Zm0 2a6 6 0 1 0 6 6 6 6 0 0 0-6-6Z"
                />
              </svg>
            </span>
            <input
              id="hero-q"
              name="q"
              type="search"
              className="search__input"
              placeholder="Артикул, название или OEM…"
              autoComplete="off"
            />
            <button type="submit" className="btn btn--solid">
              Найти
            </button>
          </form>
          <ul className="hero__bullets" aria-label="Преимущества">
            <li>Подбор с учётом автомобиля из гаража</li>
            <li>Оригинал и сертифицированные аналоги</li>
            <li>Доставка и самовывоз, поддержка по заказу</li>
          </ul>
        </div>
        <div className="hero__visual">
          <div className="hero__orb" aria-hidden />
          <div className="hero__card">
            <p className="hero__card-kicker">Ваш гараж</p>
            <p className="hero__card-title">{vehicle ? `${vehicle.brand} ${vehicle.model} · ${vehicle.year}` : 'Авто не выбрано'}</p>
            <p className="hero__card-meta">{vehicle ? vehicle.engine : label}</p>
            <div className="hero__card-actions">
              <Link to="/garage" className="btn btn--soft btn--full">
                <IconCar />
                {vehicle ? 'Изменить автомобиль' : 'Добавить автомобиль'}
              </Link>
              {vehicle ? (
                <button type="button" className="btn btn--ghost btn--full ghost-light" onClick={() => setVehicle(null)}>
                  Сбросить
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section__head">
          <h2 className="section__title">Сначала авто — потом запчасти</h2>
          <p className="section__subtitle">
            После сохранения автомобиля в гараже в каталоге доступна фильтрация по применимости к вашей
            комплектации.
          </p>
        </div>
        <div className="garage-grid">
          <div className="panel">
            <h3 className="panel__title">По марке и модели</h3>
            <p className="panel__text">Пошаговая форма: бренд, модель, год, двигатель.</p>
            <Link to="/garage" className="btn btn--solid">
              Открыть подбор
            </Link>
          </div>
          <div className="panel">
            <h3 className="panel__title">По VIN</h3>
            <p className="panel__text">Укажите VIN в карточке автомобиля для фиксации заводской комплектации.</p>
            <Link to="/garage" className="btn btn--outline">
              Ввести VIN
            </Link>
          </div>
          <div className="panel panel--accent">
            <h3 className="panel__title">Каталог и поиск</h3>
            <p className="panel__text">Фильтры по категории, цене, наличию и сортировка.</p>
            <Link to="/catalog" className="btn btn--ghost-on-dark">
              В каталог
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tint shell">
        <div className="section__head">
          <h2 className="section__title">Категории</h2>
          <p className="section__subtitle">
            В каталоге {DEMO_CATALOG_TOTAL} наименований. Каждая категория открывается отдельным разделом с
            фильтрами по производителю, цене и наличию на складе.
          </p>
        </div>
        <div className="cat-grid">
          {categories.map((c) => (
            <Link key={c.id} className="cat-card" to={`/catalog/${c.id}`}>
              <span className="cat-card__label">{c.label}</span>
              <span className="cat-card__hint">
                {c.hint} · {categoryCounts[c.id]} поз.
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell" aria-labelledby="hits-title">
        <div className="section__head section__head--row">
          <div>
            <h2 id="hits-title" className="section__title">
              Популярное сейчас
            </h2>
            <p className="section__subtitle">Добавление в корзину и в список избранного.</p>
          </div>
          <Link className="link-more" to="/catalog">
            Смотреть всё
          </Link>
        </div>
        <div className="product-grid product-grid--home">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="promo">
          <div>
            <p className="eyebrow eyebrow--on-dark">Доставка и сервис</p>
            <h2 className="promo__title">Заберите сегодня или получите завтра</h2>
            <p className="promo__text">
              При оформлении заказа доступны способы оплаты и поле для комментария к доставке. Сроки и
              стоимость уточняются у менеджера после подтверждения состава заказа.
            </p>
          </div>
          <ul className="promo__list">
            <li>Курьер и ПВЗ</li>
            <li>Оплата при получении</li>
            <li>Поддержка в мессенджере</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
