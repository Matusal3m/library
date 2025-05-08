export default function UnavailableIndicator({ message }: { message?: string }) {
  return (
    <span className="px-2 py-0.5 text-xs rounded-sm font-medium bg-red-50 text-red-700 dark:bg-red-800 dark:text-red-200">
      {message ?? 'Indisponível'}
    </span>
  )
}
