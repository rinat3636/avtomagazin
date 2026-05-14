import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumbs, PageHeader } from '../components/Breadcrumbs'
import { useToast } from '../context/ToastContext'

export function SupportPage() {
  const toast = useToast()
  const [msg, setMsg] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!msg.trim()) {
      toast.show('Напишите текст обращения')
      return
    }
    toast.show('Сообщение принято. Мы ответим в ближайшее рабочее время.')
    setMsg('')
  }

  return (
    <main>
      <Breadcrumbs items={[{ to: '/', label: 'Главная' }, { label: 'Поддержка' }]} />
      <PageHeader
        title="Поддержка"
        subtitle="Телефон, электронная почта и форма обратной связи. Ответ в рабочие часы."
      />
      <div className="shell support-grid">
        <div className="prose">
          <h2>Контакты</h2>
          <p>
            Телефон: <a href="tel:+78001234567">8 (800) 123-45-67</a> (ежедневно 9:00–21:00).
          </p>
          <p>
            Email: <a href="mailto:hello@avtomagazin.demo">hello@avtomagazin.demo</a>
          </p>
          <h2>По заказу</h2>
          <p>Пришлите номер заказа и телефон — мы уточним статус сборки и доставки.</p>
          <Link to="/garage" className="btn btn--outline">
            Настроить авто в гараже
          </Link>
        </div>
        <form className="card-form" onSubmit={onSubmit}>
          <h2 className="form-section-title">Написать нам</h2>
          <label className="field-label field-label--full">
            Тема
            <input className="field" placeholder="Заказ, возврат, подбор запчастей…" />
          </label>
          <label className="field-label field-label--full">
            Сообщение
            <textarea
              className="field field--area"
              rows={5}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Опишите вопрос"
            />
          </label>
            <button type="submit" className="btn btn--solid">
              Отправить
            </button>
        </form>
      </div>
    </main>
  )
}
