type CheckboxProps = {
  label: string
  onChange: (value: string) => void
  className?: string
  value: string
}

export default function Checkbox({ label, onChange, className, value }: CheckboxProps) {
  return (
    <div className={`flex items-center mb-4 ${className}`}>
      <input
        id={`checkbox_${value}`}
        type="checkbox"
        onChange={() => onChange(value)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={`checkbox_${value}`}
        className={`ms-2 text-sm font-medium text-gray-900 dark:text-gray-300`}
      >
        {label}
      </label>
    </div>
  )
}
