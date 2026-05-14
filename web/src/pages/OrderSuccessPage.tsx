import { Link, useLocation } from 'react-router-dom'
import { Breadcrumbs, PageHeader } from '../components/Breadcrumbs'

const LAST_ORDER_KEY = 'avtmz_last_order'

export function OrderSuccessPage() {
  const location = useLocation() as { state?: { orderId?: string } }
  let orderId = location.state?.orderId
  if (!orderId && typeof sessionStorage !== 'undefined') {
    try {
      const raw = sessionStorage.getItem(LAST_ORDER_KEY)
      if (raw) orderId = (JSON.parse(raw) as { orderId?: string }).orderId
    } catch {
      /* ignore */
    }
  }

  return (
    <main>
      <Breadcrumbs items={[{ to: '/', label: 'Главная' }, { label: 'Заказ' }]} />
      <PageHeader
        title="Заказ оформлен"
        subtitle="Сохраните номер заказа. Менеджер свяжется с вами для подтверждения состава, наличия и условий отгрузки."
      />

      <div className="shell narrow-block">
        {orderId ? (
          <p className="success-id">
            Номер заказа: <strong>{orderId}</strong>
          </p>
        ) : (
          <p className="success-id">
            Номер заказа не отображается. Сообщите дату оформления и телефон в поддержку — оператор найдёт
            заявку.
          </p>
        )}
        <p className="muted">
          На указанный номер телефона может быть направлено SMS с подтверждением. Если вы указали e-mail,
          проверьте входящие и папку «Спам» в течение 15 минут.
        </p>
        <div className="success-actions">
          <Link to="/catalog" className="btn btn--solid">
            В каталог
          </Link>
          <Link to="/" className="btn btn--outline">
            На главную
          </Link>
        </div>
      </div>
    </main>
  )
}
