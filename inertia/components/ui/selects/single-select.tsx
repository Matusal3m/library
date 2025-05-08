import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '~/utils/cn'

type Option = { id: string | number; name: string }

type SingleSelectProps = {
  label?: string
  name: string
  options: Option[]
  value: string | number
  onChange: (value: string | number) => void
  placeholder?: string
  error?: string
}

export function SingleSelect({
  label,
  options,
  name,
  value,
  onChange,
  error,
  placeholder = 'Selecione uma',
}: SingleSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const toggleOpen = () => setIsOpen((prev) => !prev)

  const selectOption = (id: string | number) => {
    if (value !== id) {
      onChange(id)
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 0)
    }
  }, [isOpen])

  return (
    <div className="mb-6 relative dark:text-white" ref={containerRef}>
      {label && (
        <label
          className={cn(
            'block mb-2 text-sm font-medium',
            error ? 'text-red-500 peer-focus:text-red-600' : 'text-gray-900 dark:text-gray-300'
          )}
        >
          {label}
        </label>
      )}
      <div
        onClick={toggleOpen}
        className="relative w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md px-3 py-2 text-sm cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 min-h-[42px]"
      >
        <div className="flex flex-wrap gap-2">
          {value === '' ? (
            <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>
          ) : (
            <span key={value} className="text-black dark:text-white">
              {options.find((o) => String(o.id) === String(value))?.name || value}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="ml-1"
              ></button>
            </span>
          )}
        </div>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>

      {isOpen && (
        <div className="relative z-50 w-full mt-1 max-h-60 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg text-sm overflow-hidden">
          <ul className="max-h-48 overflow-y-auto">
            {options.map((opt) => (
              <li
                key={opt.id}
                onClick={() => selectOption(opt.id)}
                className={`px-3 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 ${
                  opt.id == value ? 'bg-blue-100 dark:bg-blue-700' : ''
                }`}
              >
                {opt.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
