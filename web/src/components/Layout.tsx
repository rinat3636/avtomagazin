import { useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { IconCar, IconCart, IconClose, IconMenu, IconSearch } from './icons'
import { useCart } from '../context/CartContext'
import { useGarage } from '../context/GarageContext'
import { categories } from '../data/catalog'

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

  return (
    <div className="page">
      <div className="strip">
        <div className="shell strip__inner">
          <span className="strip__item strip__item--muted">Пн–Сб 9:00–20:00 · Вс выходной</span>
          <a className="strip__link" href="tel:+78001234567">
            8 (800) 123-45-67
          </a>
          <Link className="strip__link" to="/delivery">
            Доставка и оплата
          </Link>
          <Link className="strip__link" to="/returns">
            Возврат и обмен
          </Link>
          <Link className="strip__link strip__link--hide-sm" to="/support">
            Поддержка
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
            <span className="brand__mark" aria-hidden />
            <span className="brand__text">АвтоМагазин</span>
            <span className="brand__tag">запчасти</span>
          </Link>

          <form className="topbar-search topbar-search--store" role="search" onSubmit={onSearch}>
            <label className="sr-only" htmlFor="global-q">
              Поиск по каталогу
            </label>
            <span className="topbar-search__icon" aria-hidden>
              <IconSearch />
            </span>
            <input
              id="global-q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="topbar-search__input"
              placeholder="OEM, артикул, название детали…"
              autoComplete="off"
            />
            <button type="submit" className="btn btn--solid topbar-search__btn">
              Найти
            </button>
          </form>

          <div className="topbar__actions">
            <Link to="/garage" className="garage-pill garage-pill--on-dark" title={label}>
              <IconCar className="icon" />
              <span className="garage-pill__text">
                {vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Моё авто'}
              </span>
            </Link>
            <Link to="/cart" className="btn btn--cart cart-btn">
              <IconCart />
              <span>Корзина</span>
              {totalQty > 0 ? <span className="cart-badge">{totalQty > 99 ? '99+' : totalQty}</span> : null}
            </Link>
          </div>
        </div>
      </header>

      <nav className="subnav" aria-label="Разделы каталога">
        <div className="shell subnav__inner">
          <NavLink to="/catalog" className={({ isActive }) => `subnav__link${isActive ? ' subnav__link--active' : ''}`} end>
            Все разделы
          </NavLink>
          {categories.map((c) => (
            <NavLink key={c.id} to={`/catalog/${c.id}`} className={({ isActive }) => `subnav__link${isActive ? ' subnav__link--active' : ''}`}>
              {c.label}
            </NavLink>
          ))}
          <NavLink to="/garage" className={({ isActive }) => `subnav__link subnav__link--accent${isActive ? ' subnav__link--active' : ''}`}>
            Подбор по авто
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => `subnav__link${isActive ? ' subnav__link--active' : ''}`}>
            Избранное
          </NavLink>
        </div>
      </nav>

      {open ? (
        <div className="drawer-backdrop" role="presentation" onClick={() => setOpen(false)} />
      ) : null}
      <aside className={`drawer${open ? ' drawer--open' : ''}`} aria-hidden={!open}>
        <div className="drawer__head">
          <span className="drawer__title">Меню</span>
          <button type="button" className="btn btn--ghost" aria-label="Закрыть" onClick={() => setOpen(false)}>
            <IconClose />
          </button>
        </div>
        <nav className="drawer__nav" aria-label="Мобильное меню">
          <NavLink to="/" end className={navClass} onClick={() => setOpen(false)}>
            Главная
          </NavLink>
          <NavLink to="/catalog" className={navClass} onClick={() => setOpen(false)}>
            Каталог
          </NavLink>
          {categories.map((c) => (
            <NavLink key={c.id} to={`/catalog/${c.id}`} className={navClass} onClick={() => setOpen(false)}>
              {c.label}
            </NavLink>
          ))}
          <NavLink to="/garage" className={navClass} onClick={() => setOpen(false)}>
            Моё авто
          </NavLink>
          <NavLink to="/favorites" className={navClass} onClick={() => setOpen(false)}>
            Избранное
          </NavLink>
          <NavLink to="/cart" className={navClass} onClick={() => setOpen(false)}>
            Корзина
          </NavLink>
          <NavLink to="/delivery" className={navClass} onClick={() => setOpen(false)}>
            Доставка
          </NavLink>
          <NavLink to="/support" className={navClass} onClick={() => setOpen(false)}>
            Поддержка
          </NavLink>
          <NavLink to="/returns" className={navClass} onClick={() => setOpen(false)}>
            Возврат
          </NavLink>
        </nav>
      </aside>

      <Outlet key={location.pathname} />

      <footer className="footer" id="support-footer">
        <div className="shell footer__grid">
          <div>
            <p className="brand brand--footer">
              <span className="brand__mark" aria-hidden />
              <span className="brand__text">АвтоМагазин</span>
            </p>
            <p className="footer__muted">
              Продажа оригинальных и сертифицированных автозапчастей и расходных материалов. Подбор по марке
              автомобиля, VIN и каталожным номерам. Доставка по региону, самовывоз со склада.
            </p>
          </div>
          <div>
            <p className="footer__label">Покупателям</p>
            <ul className="footer__links">
              <li>
                <Link to="/catalog">Каталог</Link>
              </li>
              <li>
                <Link to="/garage">Подбор по авто</Link>
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
            <p className="footer__label">Контакты</p>
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
          <span className="footer__muted">Все права защищены</span>
        </div>
      </footer>
    </div>
  )
}
