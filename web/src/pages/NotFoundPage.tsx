import { Link } from 'react-router-dom'
import { Breadcrumbs, PageHeader } from '../components/Breadcrumbs'

export function NotFoundPage() {
  return (
    <main>
      <Breadcrumbs items={[{ to: '/', label: 'Главная' }, { label: 'Страница не найдена' }]} />
      <PageHeader title="404" subtitle="Такой страницы нет — проверьте адрес или перейдите в каталог." />
      <div className="shell empty-state empty-state--tight">
        <Link to="/" className="btn btn--solid">
          На главную
        </Link>
        <Link to="/catalog" className="btn btn--outline">
          Каталог
        </Link>
      </div>
    </main>
  )
}
