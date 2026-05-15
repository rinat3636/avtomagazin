import { type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { categories, products, countProductsByCategory } from '../data/catalog'
import { IconCar } from '../components/icons'
import { ProductCard } from '../components/ProductCard'
import { useGarage } from '../context/GarageContext'
import { homeCopy } from '../content/siteCopy'

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
    <main className="home-pro">
      <section className="pro-hero" aria-labelledby="pro-hero-title">
        <div className="shell pro-hero__shell">
          <div className="pro-hero__content">
            <h1 id="pro-hero-title" className="pro-hero__title">
              {homeCopy.heroTitle}
            </h1>
            <p className="pro-hero__lead">{homeCopy.heroLead}</p>
            <form className="pro-hero__search" role="search" onSubmit={onHeroSearch}>
              <label className="sr-only" htmlFor="hero-q">
                {homeCopy.heroPlaceholder}
              </label>
              <input
                id="hero-q"
                name="q"
                type="search"
                className="pro-hero__input"
                placeholder={homeCopy.heroPlaceholder}
                autoComplete="off"
              />
              <button type="submit" className="btn btn--solid pro-hero__submit">
                {homeCopy.heroSubmit}
              </button>
            </form>
            <div className="pro-hero__actions">
              <Link to="/catalog" className="btn btn--solid pro-hero__btn-secondary">
                {homeCopy.heroCatalog}
              </Link>
              <Link to="/garage" className="btn btn--outline pro-hero__btn-secondary">
                {homeCopy.heroGarage}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pro-garage-bar shell" aria-label={homeCopy.garageLabel}>
        <div className="pro-garage-bar__text">
          <span className="pro-garage-bar__label">{homeCopy.garageLabel}</span>
          <span className="pro-garage-bar__value">
            {vehicle ? `${vehicle.brand} ${vehicle.model}, ${vehicle.year}` : homeCopy.garageUnsetTitle}
          </span>
          {!vehicle ? <span className="pro-garage-bar__hint">{homeCopy.garageUnsetMeta}</span> : null}
        </div>
        <div className="pro-garage-bar__actions">
          <Link to="/garage" className="btn btn--outline">
            <IconCar />
            {vehicle ? homeCopy.garageCtaEdit : homeCopy.garageCtaSet}
          </Link>
          {vehicle ? (
            <button type="button" className="btn btn--ghost" onClick={() => setVehicle(null)}>
              {homeCopy.garageCtaClear}
            </button>
          ) : null}
        </div>
      </section>

      <section className="pro-pillars shell" aria-label="Преимущества">
        <ul className="pro-pillars__list">
          {homeCopy.pillars.map((p) => (
            <li key={p.title} className="pro-pillars__item">
              <p className="pro-pillars__title">{p.title}</p>
              <p className="pro-pillars__text">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section section--tint shell" aria-labelledby="cat-title">
        <div className="section__head">
          <h2 id="cat-title" className="section__title">
            {homeCopy.categoriesTitle}
          </h2>
          <p className="section__subtitle">{homeCopy.categoriesSubtitle}</p>
        </div>
        <div className="cat-grid cat-grid--store">
          {categories.map((c) => (
            <Link key={c.id} className="cat-card cat-card--store" to={`/catalog/${c.id}`}>
              <span className="cat-card__label">{c.label}</span>
              <span className="cat-card__hint">{c.hint}</span>
              <span className="cat-card__count">{categoryCounts[c.id]} наименований</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell" aria-labelledby="hits-title">
        <div className="section__head section__head--row">
          <div>
            <h2 id="hits-title" className="section__title">
              {homeCopy.featuredTitle}
            </h2>
            <p className="section__subtitle">{homeCopy.featuredSubtitle}</p>
          </div>
          <Link className="link-more" to="/catalog">
            {homeCopy.featuredLink}
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
