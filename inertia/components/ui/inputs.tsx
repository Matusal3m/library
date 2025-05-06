import { cn } from '~/utils/cn'

export function FloatingInput({
  value,
  onChange,
  label,
  name,
  className,
  type = 'text',
  error,
}: {
  value: any
  onChange: React.ChangeEventHandler<HTMLInputElement>
  label: string
  name: string
  className?: string
  type?: string
  error?: string
}) {
  return (
    <div className={cn('relative z-0 w-full mb-5 group', className)}>
      <input
        type={type}
        name={name}
        id={name}
        className={cn(
          'block py-2.5 px-0 w-full text-sm bg-transparent border-0 appearance-none focus:outline-none focus:ring-0 peer',
          'border-b-2',
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-gray-300 focus:border-blue-600 dark:border-gray-600 dark:focus:border-blue-500',
          error ? 'text-red-700 dark:text-red-400' : 'text-gray-900 dark:text-white'
        )}
        placeholder=" "
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={name}
        className={cn(
          'peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
          error
            ? 'text-red-500 peer-focus:text-red-600'
            : 'text-gray-500 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
        )}
      >
        {label}
      </label>
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
