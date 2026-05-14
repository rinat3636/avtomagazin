import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { IconChevronRight } from './icons'

export type Crumb = { to?: string; label: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs shell" aria-label="Хлебные крошки">
      <ol className="breadcrumbs__list">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="breadcrumbs__item">
              {item.to && !last ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                <span className={last ? 'breadcrumbs__current' : undefined}>{item.label}</span>
              )}
              {!last ? (
                <span className="breadcrumbs__sep" aria-hidden>
                  <IconChevronRight />
                </span>
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: ReactNode
}) {
  return (
    <header className="page-head shell">
      <div>
        <h1 className="page-head__title">{title}</h1>
        {subtitle ? <p className="page-head__subtitle">{subtitle}</p> : null}
      </div>
      {actions ? <div className="page-head__actions">{actions}</div> : null}
    </header>
  )
}
