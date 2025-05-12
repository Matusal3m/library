import { useState, useRef, useEffect } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { cn } from '~/utils/cn'

type Option = { id: string | number; name: string }

type MultiSelectProps = {
  label?: string
  name: string
  options: Option[]
  value: any
  onChange: (value: any) => void
  placeholder?: string
  error?: string
}

export default function MultiSelect({
  label,
  options,
  name,
  value,
  onChange,
  error,
  placeholder = 'Selecione uma ou mais opções',
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const toggleOpen = () => setIsOpen((prev) => !prev)

  const selectOption = (id: string | number) => {
    if (!value.includes(id)) {
      onChange([...value, id])
    }
  }

  const removeOption = (id: string | number) => {
    onChange(value.filter((v) => v !== id))
  }

  const filteredOptions = options.filter((opt) =>
    opt.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
    } else {
      setSearchTerm('')
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
          {value.length === 0 ? (
            <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>
          ) : (
            value.map((val) => {
              const opt = options.find((o) => String(o.id) === String(val))
              return (
                <span
                  key={val}
                  className="flex items-center bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded-full"
                >
                  {opt?.name || val}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeOption(val)
                    }}
                    className="ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )
            })
          )}
        </div>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 max-h-60 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg text-sm overflow-hidden">
          <div className="px-2 py-1 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              ref={searchInputRef}
              className="w-full px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li
                  key={opt.id}
                  onClick={() => selectOption(opt.id)}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 ${
                    value.includes(opt.id) ? 'bg-blue-100 dark:bg-blue-700' : ''
                  }`}
                >
                  {opt.name}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500 dark:text-gray-400 italic">
                Nenhuma opção encontrada
              </li>
            )}
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
