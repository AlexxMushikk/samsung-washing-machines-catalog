import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import styles from './Select.module.css'

export type SelectOption<T extends string | number> = {
  value: T
  label: string
}

type SelectProps<T extends string | number> = {
  label: string
  value: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
}

function Select<T extends string | number>({ label, value, options, onChange }: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const id = useId()

  const selectedIndex = options.findIndex((option) => option.value === value)

  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [isOpen])

  function open() {
    setHighlightedIndex(selectedIndex === -1 ? 0 : selectedIndex)
    setIsOpen(true)
  }

  function select(index: number) {
    onChange(options[index].value)
    setIsOpen(false)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (isOpen) setHighlightedIndex((index) => (index + 1) % options.length)
        else open()
        break
      case 'ArrowUp':
        event.preventDefault()
        if (isOpen) setHighlightedIndex((index) => (index - 1 + options.length) % options.length)
        else open()
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (isOpen) select(highlightedIndex)
        else open()
        break
      case 'Escape':
      case 'Tab':
        setIsOpen(false)
        break
    }
  }

  return (
    <div className={styles.field} ref={containerRef}>
      <span className={styles.label} id={`${id}-label`}>
        {label}
      </span>

      <div className={styles.control}>
        <button
          type="button"
          className={styles.trigger}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={`${id}-listbox`}
          aria-labelledby={`${id}-label`}
          aria-activedescendant={isOpen ? `${id}-option-${highlightedIndex}` : undefined}
          onClick={() => (isOpen ? setIsOpen(false) : open())}
          onKeyDown={handleKeyDown}
        >
          {options[selectedIndex]?.label ?? ''}
        </button>

        {isOpen && (
          <ul className={styles.list} id={`${id}-listbox`} role="listbox">
            {options.map((option, index) => (
              <li
                key={String(option.value)}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={index === selectedIndex}
                className={`${styles.option} ${index === highlightedIndex ? styles.highlighted : ''}`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => select(index)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Select
