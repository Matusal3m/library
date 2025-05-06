import React from 'react'

type Option = { id: number | string; name: string }
type MultiSelectProps = {
  label: string
  name: string
  options: Option[]
  value: (number | string)[]
  onChange: (vals: (number | string)[]) => void
  required?: boolean
}

export function MultiSelect({
  label,
  name,
  options,
  value,
  onChange,
  required = false,
}: MultiSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value)
    onChange(selected)
  }

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        multiple
        required={required}
        value={value.map(String)}
        onChange={handleChange}
        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500
                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                   dark:focus:ring-blue-500 dark:focus:border-blue-500 h-32 p-2.5"
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  )
}
