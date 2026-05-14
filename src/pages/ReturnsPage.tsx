import { Link } from 'react-router-dom'
import { Breadcrumbs, PageHeader } from '../components/Breadcrumbs'

export function ReturnsPage() {
  return (
    <main>
      <Breadcrumbs items={[{ to: '/', label: 'Главная' }, { label: 'Возврат' }]} />
      <PageHeader
        title="Возврат и обмен"
        subtitle="Общие условия. Подробности по вашему заказу — у менеджера или в договоре оферты."
      />
      <div className="shell prose">
        <h2>Срок возврата</h2>
        <p>14 дней с момента получения заказа — для новых запчастей в неповреждённой упаковке.</p>
        <h2>Как оформить</h2>
        <ol>
          <li>Свяжитесь с поддержкой и назовите номер заказа.</li>
          <li>Получите накладную на возврат у менеджера.</li>
          <li>Отправьте товар на склад или привезите в пункт выдачи.</li>
        </ol>
        <h2>Исключения</h2>
        <ul>
          <li>Электрика и расходники после вскрытия — по согласованию.</li>
          <li>Детали с индивидуальным заказом (покраска, нарезка) — не подлежат возврату.</li>
        </ul>
        <Link to="/support" className="btn btn--solid">
          Связаться с поддержкой
        </Link>
      </div>
    </main>
  )
}
