import { useEffect, useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { IconCar, IconCart, IconClose, IconMenu, IconSearch } from './icons'
import { useCart } from '../context/CartContext'
import { useGarage } from '../context/GarageContext'
import { categories } from '../data/catalog'
import { layoutCopy } from '../content/siteCopy'
import { syncDocumentTitle } from '../lib/syncDocumentTitle'
import brandLogo from '../assets/brand-logo.png'

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav__link nav__link--active' : 'nav__link'

export function Layout() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { totalQty } = useCart()
  const { vehicle, label } = useGarage()

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    const query = q.trim()
    if (!query) return
    navigate(`/search?q=${encodeURIComponent(query)}`)
    setOpen(false)
  }

  useEffect(() => {
    syncDocumentTitle(location.pathname)
  }, [location.pathname])

  return (
    <div className="page">
      <div className="strip">
        <div className="shell strip__inner">
          <span className="strip__item strip__item--muted">{layoutCopy.stripHours}</span>
          <a className="strip__link" href="tel:+78001234567">
            8 (800) 123-45-67
          </a>
          <Link className="strip__link" to="/delivery">
            {layoutCopy.stripDelivery}
          </Link>
          <Link className="strip__link" to="/returns">
            {layoutCopy.stripReturns}
          </Link>
          <Link className="strip__link strip__link--hide-sm" to="/support">
            {layoutCopy.stripSupport}
          </Link>
        </div>
      </div>

      <header className="topbar topbar--store">
        <div className="shell topbar__inner">
          <button
            type="button"
            className="btn btn--ghost menu-btn menu-btn--on-dark"
            aria-label="Открыть меню"
            onClick={() => setOpen(true)}
          >
            <IconMenu />
          </button>

          <Link to="/" className="brand brand--on-dark">
            <img src={brandLogo} alt="Авто Династия" className="brand__logo" width={160} height={56} />
          </Link>

          <form className="topbar-search topbar-search--store" role="search" onSubmit={onSearch}>
            <label className="sr-only" htmlFor="global-q">
              {layoutCopy.searchLabel}
            </label>
            <span className="topbar-search__icon" aria-hidden>
              <IconSearch />
            </span>
            <input
              id="global-q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="topbar-search__input"
              placeholder={layoutCopy.searchPlaceholder}
              autoComplete="off"
            />
            <button type="submit" className="btn btn--solid topbar-search__btn">
              {layoutCopy.searchSubmit}
            </button>
          </form>

          <div className="topbar__actions">
            <Link
              to="/garage"
              className="garage-pill garage-pill--on-dark"
              title={label}
              aria-label={vehicle ? label : layoutCopy.garageDefault}
            >
              <IconCar className="icon" />
              <span className="garage-pill__text">
                {vehicle ? `${vehicle.brand} ${vehicle.model}` : layoutCopy.garageDefault}
              </span>
            </Link>
            <Link to="/cart" className="btn btn--cart cart-btn" aria-label={layoutCopy.cart}>
              <IconCart />
              <span className="cart-btn__label">{layoutCopy.cart}</span>
              {totalQty > 0 ? <span className="cart-badge">{totalQty > 99 ? '99+' : totalQty}</span> : null}
            </Link>
          </div>
        </div>
      </header>

      <nav className="subnav" aria-label="Основные разделы">
        <div className="shell subnav__inner">
          <NavLink
            to="/catalog"
            className={({ isActive }) => `subnav__link${isActive ? ' subnav__link--active' : ''}`}
          >
            {layoutCopy.subnavCatalog}
          </NavLink>
          <NavLink
            to="/garage"
            className={({ isActive }) => `subnav__link subnav__link--accent${isActive ? ' subnav__link--active' : ''}`}
          >
            {layoutCopy.subnavGarage}
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => `subnav__link${isActive ? ' subnav__link--active' : ''}`}>
            {layoutCopy.subnavFavorites}
          </NavLink>
        </div>
      </nav>

      {open ? (
        <div className="drawer-backdrop" role="presentation" onClick={() => setOpen(false)} />
      ) : null}
      <aside className={`drawer${open ? ' drawer--open' : ''}`} aria-hidden={!open}>
        <div className="drawer__head">
          <span className="drawer__title">{layoutCopy.drawerTitle}</span>
          <button type="button" className="btn btn--ghost" aria-label="Закрыть" onClick={() => setOpen(false)}>
            <IconClose />
          </button>
        </div>
        <nav className="drawer__nav" aria-label="Мобильная навигация">
          <NavLink to="/" end className={navClass} onClick={() => setOpen(false)}>
            {layoutCopy.drawerHome}
          </NavLink>
          <NavLink to="/catalog" className={navClass} onClick={() => setOpen(false)}>
            {layoutCopy.drawerCatalog}
          </NavLink>
          <NavLink to="/garage" className={navClass} onClick={() => setOpen(false)}>
            {layoutCopy.drawerGarage}
          </NavLink>
          <NavLink to="/cart" className={navClass} onClick={() => setOpen(false)}>
            {layoutCopy.drawerCart}
          </NavLink>
          <NavLink to="/favorites" className={navClass} onClick={() => setOpen(false)}>
            {layoutCopy.drawerFavorites}
          </NavLink>
          <div className="drawer__group-label">{layoutCopy.drawerGroupCatalog}</div>
          {categories.map((c) => (
            <NavLink key={c.id} to={`/catalog/${c.id}`} className={navClass} onClick={() => setOpen(false)}>
              {c.label}
            </NavLink>
          ))}
          <div className="drawer__group-label">{layoutCopy.drawerGroupService}</div>
          <NavLink to="/delivery" className={navClass} onClick={() => setOpen(false)}>
            {layoutCopy.stripDelivery}
          </NavLink>
          <NavLink to="/returns" className={navClass} onClick={() => setOpen(false)}>
            {layoutCopy.stripReturns}
          </NavLink>
          <NavLink to="/support" className={navClass} onClick={() => setOpen(false)}>
            {layoutCopy.stripSupport}
          </NavLink>
        </nav>
      </aside>

      <Outlet key={location.pathname} />

      <footer className="footer" id="support-footer">
        <div className="shell footer__grid">
          <div>
            <p className="brand brand--footer">
              <img src={brandLogo} alt="Авто Династия" className="brand__logo brand__logo--footer" width={120} height={34} />
            </p>
            <p className="footer__muted">{layoutCopy.footerLead}</p>
          </div>
          <div>
            <p className="footer__label">{layoutCopy.footerBuyers}</p>
            <ul className="footer__links">
              <li>
                <Link to="/catalog">Каталог</Link>
              </li>
              <li>
                <Link to="/garage">{layoutCopy.subnavGarage}</Link>
              </li>
              <li>
                <Link to="/delivery">Доставка и оплата</Link>
              </li>
              <li>
                <Link to="/returns">Возврат</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer__label">{layoutCopy.footerContacts}</p>
            <ul className="footer__links">
              <li>
                <a href="tel:+78001234567">8 (800) 123-45-67</a>
              </li>
              <li>
                <a href="mailto:info@avtomagazin.ru">info@avtomagazin.ru</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="shell footer__bar">
          <span>© {new Date().getFullYear()} АвтоМагазин</span>
          <span className="footer__muted">{layoutCopy.footerRights}</span>
        </div>
      </footer>
    </div>
  )
}
