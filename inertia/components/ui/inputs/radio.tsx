type RadioProps = {
    label: string
    name: string
    value: any
    onChange: (value: any) => void
    data: any
}

export default function Radio({ label, name, value, onChange, data }: RadioProps) {
    return (
        <div className="flex items-center mb-4">
            <input
                id={'radio_' + label.replace(' ', '_').toLowerCase()}
                type="radio"
                value={value}
                name={name}
                checked={data === value}
                onChange={() => onChange(value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
                htmlFor={'radio_' + label.replace(' ', '_').toLowerCase()}
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                {label}
            </label>
        </div>
    )
}
