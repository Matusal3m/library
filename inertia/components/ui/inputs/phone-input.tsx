import { cn } from '~/utils/cn'

type PhoneInputProps = {
  label?: string
  name: string
  value: string
  onChange: (e: { target: { name: string; value: string } }) => void
  error?: string
  placeholder?: string
}
export default function PhoneInput({
  label = 'Telefone',
  name,
  value,
  onChange,
  error,
  placeholder = '(00) 00000-0000',
}: PhoneInputProps) {
  const formatValue = (input: string) => {
    const digits = input.replace(/\D/g, '')
    const len = digits.length
    if (len === 0) return ''
    if (len < 3) {
      return `(${digits}`
    }
    if (len < 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    }
    const pre = digits.slice(2, len - 4)
    const last = digits.slice(len - 4)
    return `(${digits.slice(0, 2)}) ${pre}-${last}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const formatted = formatValue(raw)

    onChange({
      target: { name, value: formatted },
    })
  }

  return (
    <div className="w-full max-w-sm mb-4">
      {label && (
        <label
          htmlFor={name}
          className={cn(
            'peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
            error
              ? 'text-red-500 peer-focus:text-red-600'
              : 'text-gray-500 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
          )}
        />
      )}
      <input
        id={name}
        name={name}
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={15}
        className={cn(
          'block py-2.5 px-0 w-full text-sm bg-transparent border-0 appearance-none focus:outline-none focus:ring-0 peer',
          'border-b-2',
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-gray-300 focus:border-blue-600 dark:border-gray-600 dark:focus:border-blue-500',
          error ? 'text-red-700 dark:text-red-400' : 'text-gray-900 dark:text-white'
        )}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
