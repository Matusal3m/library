export default function AvailableIndicator({ message }: { message?: string }) {
    return (
        <span className="px-2 py-0.5 text-xs rounded-sm font-medium bg-green-50 text-green-700 dark:bg-green-800 dark:text-green-200">
            {message ?? 'Disponível'}
        </span>
    )
}
