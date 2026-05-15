import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { filterByPrefix } from '../lib/searchPrefix'

type Props = {
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly string[]
  placeholder?: string
  required?: boolean
  disabled?: boolean
  suppressList?: boolean
  emptyHint?: string
}

export function GarageAutocomplete({
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
  disabled,
  suppressList = false,
  emptyHint,
}: Props) {
  const listId = useId()
  const wrapRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)

  const suggestions = suppressList ? [] : filterByPrefix(options, value, 14)

  useEffect(() => {
    setActive(-1)
  }, [value, suggestions.length])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const pick = (opt: string) => {
    onChange(opt)
    setOpen(false)
    setActive(-1)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) {
      if (e.key === 'ArrowDown' && suggestions.length > 0) {
        setOpen(true)
        setActive(0)
        e.preventDefault()
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (i + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1))
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault()
      pick(suggestions[active]!)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const showList =
    open &&
    !suppressList &&
    (suggestions.length > 0 || Boolean(emptyHint) || (!value.trim() && options.length > 0))

  return (
    <label className="field-label garage-ac">
      {label}
      <div ref={wrapRef} className="garage-ac__wrap">
        <input
          className="field"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete="off"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
        />
        {showList ? (
          <ul id={listId} className="garage-ac__list" role="listbox">
            {suggestions.length === 0 && emptyHint ? (
              <li className="garage-ac__empty" role="presentation">
                {emptyHint}
              </li>
            ) : (
              suggestions.map((opt, i) => (
                <li key={opt}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    className={`garage-ac__opt${i === active ? ' garage-ac__opt--active' : ''}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pick(opt)}
                  >
                    {opt}
                  </button>
                </li>
              ))
            )}
          </ul>
        ) : null}
      </div>
    </label>
  )
}
