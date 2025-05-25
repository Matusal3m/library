type CheckboxProps = {
    label: string
    checked: boolean
    onChange: (value: boolean) => void
    className?: string
}

export default function Checkbox({ label, checked, onChange, className = '' }: CheckboxProps) {
    const handleChange = () => {
        onChange(!checked)
    }

    return (
        <div className={`flex items-center mb-4 ${className}`}>
            <input
                id={`checkbox_${label.replace(/\s+/g, '_').toLowerCase()}`}
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
                htmlFor={`checkbox_${label.replace(/\s+/g, '_').toLowerCase()}`}
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                {label}
            </label>
        </div>
    )
}
