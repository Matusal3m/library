export function AvailableIndicator() {
  return (
    <span className="px-2 py-0.5 text-xs rounded-sm font-medium bg-green-50 text-green-700 dark:bg-green-800 dark:text-green-200">
      Disponível
    </span>
  )
}

export function UnavailableIndicator() {
  return (
    <span className="px-2 py-0.5 text-xs rounded-sm font-medium bg-red-50 text-red-700 dark:bg-red-800 dark:text-red-200">
      Indisponível
    </span>
  )
}
