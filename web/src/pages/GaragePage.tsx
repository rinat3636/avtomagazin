import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Breadcrumbs, PageHeader } from '../components/Breadcrumbs'
import type { Vehicle } from '../types'
import { useGarage } from '../context/GarageContext'
import { useToast } from '../context/ToastContext'
import { garagePageCopy } from '../content/siteCopy'
import { VEHICLE_BRANDS, vehicleModelHintsForBrand, ENGINE_HINTS } from '../data/vehicleHints'

const BRAND_LIST_ID = 'garage-datalist-brand'
const MODEL_LIST_ID = 'garage-datalist-model'
const ENGINE_LIST_ID = 'garage-datalist-engine'

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
  const modelHints = useMemo(() => [...vehicleModelHintsForBrand(form.brand)], [form.brand])
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.brand.trim() || !form.model.trim()) {
      toast.show(garagePageCopy.toastNeedBrand)
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
    toast.show(garagePageCopy.toastSaved)
  }

  return (
    <main>
      <Breadcrumbs items={[{ to: '/', label: 'Главная' }, { label: garagePageCopy.breadcrumb }]} />
      <PageHeader title={garagePageCopy.title} subtitle={garagePageCopy.subtitle} />

      <div className="shell garage-layout">
        <form className="card-form" onSubmit={onSubmit}>
          <datalist id={BRAND_LIST_ID}>
            {VEHICLE_BRANDS.map((b) => (
              <option key={b} value={b} />
            ))}
          </datalist>
          <datalist id={MODEL_LIST_ID}>
            {modelHints.map((m) => (
              <option key={m} value={m} />
            ))}
          </datalist>
          <datalist id={ENGINE_LIST_ID}>
            {ENGINE_HINTS.map((e) => (
              <option key={e} value={e} />
            ))}
          </datalist>
          <div className="form-grid">
            <label className="field-label">
              {garagePageCopy.labelBrand}
              <input
                className="field"
                value={form.brand}
                onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                placeholder={garagePageCopy.phBrand}
                list={BRAND_LIST_ID}
                autoComplete="off"
                required
              />
            </label>
            <label className="field-label">
              {garagePageCopy.labelModel}
              <input
                className="field"
                value={form.model}
                onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
                placeholder={garagePageCopy.phModel}
                list={MODEL_LIST_ID}
                autoComplete="off"
                required
              />
            </label>
            <p className="form-hint">{garagePageCopy.hintsNote}</p>
            <label className="field-label">
              {garagePageCopy.labelYear}
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
              {garagePageCopy.labelEngine}
              <input
                className="field"
                value={form.engine}
                onChange={(e) => setForm((f) => ({ ...f, engine: e.target.value }))}
                placeholder={garagePageCopy.phEngine}
                list={ENGINE_LIST_ID}
                autoComplete="off"
              />
            </label>
            <label className="field-label field-label--full">
              {garagePageCopy.labelVin}
              <input
                className="field"
                value={form.vin ?? ''}
                onChange={(e) =>
                  setForm((f) => ({ ...f, vin: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '') }))
                }
                maxLength={17}
                placeholder={garagePageCopy.phVin}
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn--solid">
              {garagePageCopy.save}
            </button>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => {
                setVehicle(null)
                setForm({ brand: '', model: '', year: new Date().getFullYear(), engine: '', vin: '' })
                toast.show(garagePageCopy.toastGarageCleared)
              }}
            >
              {garagePageCopy.clear}
            </button>
          </div>
        </form>

        {vehicle ? (
          <aside className="garage-aside">
            <p className="garage-aside__k">{garagePageCopy.asideKicker}</p>
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
