import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Vehicle } from '../types'
import { GARAGE_KEY } from '../data/filters'
import { readJson, writeJson } from '../lib/storage'

type GarageContextValue = {
  vehicle: Vehicle | null
  setVehicle: (v: Vehicle | null) => void
  label: string
}

const GarageContext = createContext<GarageContextValue | null>(null)

function vehicleLabel(v: Vehicle | null): string {
  if (!v) return 'Не выбрано'
  const vin = v.vin ? ` · VIN …${v.vin.slice(-6)}` : ''
  return `${v.brand} ${v.model} · ${v.year}${vin}`
}

export function GarageProvider({ children }: { children: ReactNode }) {
  const [vehicle, setVehicleState] = useState<Vehicle | null>(() =>
    readJson<Vehicle | null>(GARAGE_KEY, null),
  )

  useEffect(() => {
    writeJson(GARAGE_KEY, vehicle)
  }, [vehicle])

  const setVehicle = useCallback((v: Vehicle | null) => {
    setVehicleState(v)
  }, [])

  const label = useMemo(() => vehicleLabel(vehicle), [vehicle])

  const value = useMemo(() => ({ vehicle, setVehicle, label }), [vehicle, setVehicle, label])

  return <GarageContext.Provider value={value}>{children}</GarageContext.Provider>
}

export function useGarage() {
  const ctx = useContext(GarageContext)
  if (!ctx) throw new Error('useGarage must be used within GarageProvider')
  return ctx
}
