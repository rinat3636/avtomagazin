import { useEffect, useState, type FormEvent } from 'react'
import { Breadcrumbs, PageHeader } from '../components/Breadcrumbs'
import type { Vehicle } from '../types'
import { useGarage } from '../context/GarageContext'
import { useToast } from '../context/ToastContext'

export function GaragePage() {
  const { vehicle, setVehicle } = useGarage()
  const toast = useToast()
  const [form, setForm] = useState<Vehicle>(
    vehicle ?? { brand: '', model: '', year: new Date().getFullYear(), engine: '', vin: '' },
  )

  useEffect(() => {
    if (vehicle) {
      setForm({
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        engine: vehicle.engine,
        vin: vehicle.vin ?? '',
      })
    }
  }, [vehicle])
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.brand.trim() || !form.model.trim()) {
      toast.show('Укажите марку и модель')
      return
    }
    const v: Vehicle = {
      brand: form.brand.trim(),
      model: form.model.trim(),
      year: Math.min(2026, Math.max(1980, Number(form.year) || new Date().getFullYear())),
      engine: form.engine.trim() || '—',
      vin: form.vin?.trim() || undefined,
    }
    setVehicle(v)
    toast.show('Автомобиль сохранён в гараж')
  }

  return (
    <main>
      <Breadcrumbs items={[{ to: '/', label: 'Главная' }, { label: 'Моё авто' }]} />
      <PageHeader
        title="Моё авто"
        subtitle="Укажите марку, модель, год выпуска, модификацию двигателя и при необходимости VIN — данные используются для отбора применимых позиций в каталоге."
      />

      <div className="shell garage-layout">
        <form className="card-form" onSubmit={onSubmit}>
          <div className="form-grid">
            <label className="field-label">
              Марка
              <input
                className="field"
                value={form.brand}
                onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                placeholder="BMW"
                required
              />
            </label>
            <label className="field-label">
              Модель
              <input
                className="field"
                value={form.model}
                onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
                placeholder="3 G20"
                required
              />
            </label>
            <label className="field-label">
              Год
              <input
                className="field"
                type="number"
                min={1980}
                max={2026}
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: Number(e.target.value) }))}
              />
            </label>
            <label className="field-label">
              Двигатель
              <input
                className="field"
                value={form.engine}
                onChange={(e) => setForm((f) => ({ ...f, engine: e.target.value }))}
                placeholder="320i · 184 л.с."
              />
            </label>
            <label className="field-label field-label--full">
              VIN (необязательно)
              <input
                className="field"
                value={form.vin ?? ''}
                onChange={(e) =>
                  setForm((f) => ({ ...f, vin: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '') }))
                }
                maxLength={17}
                placeholder="17 символов"
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn--solid">
              Сохранить
            </button>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => {
                setVehicle(null)
                setForm({ brand: '', model: '', year: new Date().getFullYear(), engine: '', vin: '' })
                toast.show('Гараж очищен')
              }}
            >
              Очистить
            </button>
          </div>
        </form>

        {vehicle ? (
          <aside className="garage-aside">
            <p className="garage-aside__k">Текущее авто</p>
            <p className="garage-aside__t">
              {vehicle.brand} {vehicle.model} · {vehicle.year}
            </p>
            <p className="garage-aside__m">{vehicle.engine}</p>
            {vehicle.vin ? <p className="garage-aside__m">VIN: {vehicle.vin}</p> : null}
          </aside>
        ) : null}
      </div>
    </main>
  )
}
