import { type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  categories,
  products,
  DEMO_CATALOG_TOTAL,
  countProductsByCategory,
  catalogManufacturers,
} from '../data/catalog'
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
      <section className="store-hero" aria-labelledby="store-hero-title">
        <div className="shell store-hero__grid">
          <div className="store-hero__main">
            <p className="store-hero__kicker">Интернет-магазин автозапчастей</p>
            <h1 id="store-hero-title" className="store-hero__title">
              Запчасти по OEM, артикулу и каталогу
            </h1>
            <p className="store-hero__lead">
              Сначала найдите деталь — по номеру с коробки, по VIN или по автомобилю из гаража. Потом проверьте
              применимость, наличие на складе и оформите заказ с доставкой или самовывозом.
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
                placeholder="Например 34116792227, BRK-2048 или «колодки передние»"
                autoComplete="off"
              />
              <button type="submit" className="btn btn--solid store-hero__search-btn">
                Найти в каталоге
              </button>
            </form>
            <ul className="store-hero__bullets">
              <li>Оригинал и проверенные бренды</li>
              <li>Фильтры по категории и производителю</li>
              <li>Подбор по марке, году и двигателю</li>
            </ul>
          </div>
          <aside className="store-hero__aside" aria-label="Быстрые действия">
            <div className="store-aside-card">
              <p className="store-aside-card__label">Моё авто</p>
              <p className="store-aside-card__title">
                {vehicle ? `${vehicle.brand} ${vehicle.model}, ${vehicle.year}` : 'Автомобиль не выбран'}
              </p>
              <p className="store-aside-card__meta">{vehicle ? vehicle.engine : label}</p>
              <div className="store-aside-card__actions">
                <Link to="/garage" className="btn btn--solid btn--full">
                  <IconCar />
                  {vehicle ? 'Изменить или VIN' : 'Добавить автомобиль'}
                </Link>
                {vehicle ? (
                  <button type="button" className="btn btn--outline btn--full" onClick={() => setVehicle(null)}>
                    Сбросить авто
                  </button>
                ) : null}
              </div>
            </div>
            <div className="store-aside-card store-aside-card--muted">
              <p className="store-aside-card__label">Консультация</p>
              <p className="store-aside-card__title">Подбор по каталогу</p>
              <p className="store-aside-card__meta">Если не уверены в артикуле — оставьте заявку в поддержке.</p>
              <Link to="/support" className="btn btn--outline btn--full">
                Связаться
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="store-stats shell" aria-label="Каталог в цифрах">
        <div className="store-stats__item">
          <span className="store-stats__value">{DEMO_CATALOG_TOTAL}+</span>
          <span className="store-stats__label">наименований в демо-каталоге</span>
        </div>
        <div className="store-stats__item">
          <span className="store-stats__value">OEM / VIN</span>
          <span className="store-stats__label">поиск по номеру и автомобилю</span>
        </div>
        <div className="store-stats__item">
          <span className="store-stats__value">24–48 ч</span>
          <span className="store-stats__label">типичная отгрузка со склада</span>
        </div>
      </section>

      <section className="store-trust shell" aria-label="Условия покупки">
        <div className="store-trust__item">
          <span className="store-trust__icon" aria-hidden>
            ✓
          </span>
          <div>
            <p className="store-trust__title">Наличие на складе</p>
            <p className="store-trust__text">Позиции с отметкой «в наличии» отгружаем в день заказа при оформлении до отсечки.</p>
          </div>
        </div>
        <div className="store-trust__item">
          <span className="store-trust__icon" aria-hidden>
            ✓
          </span>
          <div>
            <p className="store-trust__title">Самовывоз и доставка</p>
            <p className="store-trust__text">Курьер, транспортные компании и пункт выдачи — согласуем после подтверждения заказа.</p>
          </div>
        </div>
        <div className="store-trust__item">
          <span className="store-trust__icon" aria-hidden>
            ✓
          </span>
          <div>
            <p className="store-trust__title">Возврат по регламенту</p>
            <p className="store-trust__text">Неустановленные детали и брак — оформляем возврат согласно разделу «Возврат».</p>
          </div>
        </div>
      </section>

      <section className="section shell" aria-labelledby="paths-title">
        <div className="section__head">
          <h2 id="paths-title" className="section__title">
            Как купить
          </h2>
          <p className="section__subtitle">Три типичных сценария — выберите удобный.</p>
        </div>
        <div className="store-path-grid">
          <div className="store-path-card">
            <p className="store-path-card__step">1</p>
            <h3 className="store-path-card__title">Уже знаете номер</h3>
            <p className="store-path-card__text">Введите OEM или наш складской артикул в поиске вверху страницы или в каталоге.</p>
            <Link to="/catalog" className="btn btn--solid">
              Открыть каталог
            </Link>
          </div>
          <div className="store-path-card">
            <p className="store-path-card__step">2</p>
            <h3 className="store-path-card__title">Подбираете по автомобилю</h3>
            <p className="store-path-card__text">Сохраните комплектацию в «Моё авто» — в каталоге появится фильтр «подходит к авто».</p>
            <Link to="/garage" className="btn btn--outline">
              Заполнить гараж
            </Link>
          </div>
          <div className="store-path-card store-path-card--accent">
            <p className="store-path-card__step">3</p>
            <h3 className="store-path-card__title">Смотрите по разделам</h3>
            <p className="store-path-card__text">Тормоза, фильтры, подвеска и др. — каждый раздел со своими фильтрами и сортировкой.</p>
            <Link to="/catalog" className="btn btn--ghost-on-dark">
              Все категории
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tint shell" aria-labelledby="cat-title">
        <div className="section__head">
          <h2 id="cat-title" className="section__title">
            Разделы каталога
          </h2>
          <p className="section__subtitle">
            В базе {DEMO_CATALOG_TOTAL} наименований. Зайдите в раздел — слева фильтры по бренду, цене и наличию.
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
            Бренды в каталоге
          </h2>
          <p className="section__subtitle">Быстрый переход в поиск по названию производителя.</p>
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
              Рекомендуем к покупке
            </h2>
            <p className="section__subtitle">Позиции со складским остатком и понятной маркировкой по применимости.</p>
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
      </section>

      <section className="section shell" aria-labelledby="svc-title">
        <h2 id="svc-title" className="sr-only">
          Сервис покупателю
        </h2>
        <div className="store-service-grid">
          <div className="store-service-card">
            <h3 className="store-service-card__title">Доставка</h3>
            <p className="store-service-card__text">Сроки и тарифы согласуем после сборки заказа — в корзине можно оставить комментарий к доставке.</p>
            <Link to="/delivery" className="store-service-card__link">
              Условия доставки →
            </Link>
          </div>
          <div className="store-service-card">
            <h3 className="store-service-card__title">Оплата</h3>
            <p className="store-service-card__text">Способы оплаты доступны на этапе оформления. По запросу — счёт для юрлица.</p>
            <Link to="/delivery" className="store-service-card__link">
              Способы оплаты →
            </Link>
          </div>
          <div className="store-service-card">
            <h3 className="store-service-card__title">Возврат и гарантия</h3>
            <p className="store-service-card__text">Неустановленная деталь и заводской брак — оформляем по регламенту магазина.</p>
            <Link to="/returns" className="store-service-card__link">
              Регламент возврата →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
