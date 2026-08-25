import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

export interface SelectOption {
  value: string
  label: string
}

export interface SelectGroup {
  label?: string
  options: SelectOption[]
}

interface SelectProps {
  id: string
  value: string
  onChange: (value: string) => void
  groups: SelectGroup[]
  placeholder: string
  invalid?: boolean
  describedBy?: string
  required?: boolean
}

// Native <select> renders its option list with the OS/browser's own popup —
// on this project that popup came out white-on-white against the dark theme
// and couldn't be reliably restyled cross-browser. This is a small,
// purpose-built replacement: a button + listbox pair with full keyboard
// support, built only for what this form needs (no generic component
// library).
export function Select({ id, value, onChange, groups, placeholder, invalid, describedBy, required }: SelectProps) {
  const [open, setOpen] = useState(false)
  const [activeValue, setActiveValue] = useState<string | null>(value || null)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const flatOptions = groups.flatMap((g) => g.options)
  const selected = flatOptions.find((o) => o.value === value)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    if (open) setActiveValue(value || flatOptions[0]?.value || null)
    // Only re-sync the active option when the panel opens, not on every value/options change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function commit(v: string) {
    onChange(v)
    setOpen(false)
  }

  function moveActive(dir: 1 | -1) {
    const idx = flatOptions.findIndex((o) => o.value === activeValue)
    const nextIdx = idx === -1 ? 0 : (idx + dir + flatOptions.length) % flatOptions.length
    setActiveValue(flatOptions[nextIdx]?.value ?? null)
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        setOpen(true)
      }
      return
    }
    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        break
      case 'ArrowDown':
        e.preventDefault()
        moveActive(1)
        break
      case 'ArrowUp':
        e.preventDefault()
        moveActive(-1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (activeValue) commit(activeValue)
        break
      case 'Tab':
        setOpen(false)
        break
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        aria-activedescendant={open && activeValue ? `${listId}-${activeValue}` : undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className={`mt-2 flex w-full items-center justify-between gap-3 rounded-xl border bg-white/[0.03] px-4 py-3 text-left text-[14px] outline-none transition-all duration-300 focus:border-gold-400/50 focus:bg-white/[0.05] ${
          invalid ? 'border-gold-400/60' : 'border-white/10'
        } ${selected ? 'text-cream-100' : 'text-cream-200/35'}`}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown
          className={`h-4 w-4 flex-none text-cream-200/50 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: easeOut }}
            role="listbox"
            id={listId}
            className="absolute z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-white/10 bg-ink-900 p-1.5 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)]"
          >
            {groups.map((group, gi) => (
              <div key={group.label ?? gi}>
                {group.label && (
                  <p className="px-3 pb-1.5 pt-2.5 text-[10.5px] font-medium uppercase tracking-widest text-cream-200/40">
                    {group.label}
                  </p>
                )}
                {group.options.map((option) => {
                  const isSelected = option.value === value
                  const isActive = option.value === activeValue
                  return (
                    <div
                      key={option.value}
                      id={`${listId}-${option.value}`}
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setActiveValue(option.value)}
                      onClick={() => commit(option.value)}
                      className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-[13.5px] transition-colors duration-150 ${
                        isActive ? 'bg-white/[0.06] text-cream-100' : 'text-cream-200/80'
                      }`}
                    >
                      <span className="truncate">{option.label}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 flex-none text-gold-400" />}
                    </div>
                  )
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
