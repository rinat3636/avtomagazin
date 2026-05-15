import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumbs, PageHeader } from '../components/Breadcrumbs'
import { useToast } from '../context/ToastContext'
import { supportPageCopy } from '../content/siteCopy'

export function SupportPage() {
  const toast = useToast()
  const [msg, setMsg] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!msg.trim()) {
      toast.show(supportPageCopy.toastEmpty)
      return
    }
    toast.show(supportPageCopy.toastSent)
    setMsg('')
  }

  return (
    <main>
      <Breadcrumbs items={[{ to: '/', label: 'Главная' }, { label: 'Поддержка' }]} />
      <PageHeader title={supportPageCopy.title} subtitle={supportPageCopy.subtitle} />
      <div className="shell support-grid">
        <div className="prose">
          <h2>{supportPageCopy.hContacts}</h2>
          <p>
            Телефон: <a href="tel:+78001234567">8 (800) 123-45-67</a> ({supportPageCopy.phoneNote}).
          </p>
          <p>
            Email:{' '}
            <a href={`mailto:${supportPageCopy.email}`}>{supportPageCopy.email}</a>
          </p>
          <h2>{supportPageCopy.hOrder}</h2>
          <p>{supportPageCopy.orderText}</p>
          <Link to="/garage" className="btn btn--outline">
            {supportPageCopy.linkGarage}
          </Link>
        </div>
        <form className="card-form" onSubmit={onSubmit}>
          <h2 className="form-section-title">{supportPageCopy.formTitle}</h2>
          <label className="field-label field-label--full">
            {supportPageCopy.subjectLabel}
            <input className="field" placeholder={supportPageCopy.subjectPh} />
          </label>
          <label className="field-label field-label--full">
            {supportPageCopy.messageLabel}
            <textarea
              className="field field--area"
              rows={5}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder={supportPageCopy.messagePh}
            />
          </label>
            <button type="submit" className="btn btn--solid">
              {supportPageCopy.submit}
            </button>
        </form>
      </div>
    </main>
  )
}
