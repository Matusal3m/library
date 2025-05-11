export default function AuthorBookListItem({
  book,
}: {
  book: {
    id: string
    title: string
    seducCode: string
    quantity: number
    isAvailable: boolean
    createdAt: string
  }
}) {
  return (
    <div
      key={book.id}
      className="p-4 bg-white rounded-md border border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">{book.title}</h4>

      <div className="flex flex-wrap gap-2 mb-4">
        {book.isAvailable ? <AvailableIndicator /> : <UnavailableIndicator />}
        <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-sm dark:bg-gray-700 dark:text-gray-200">
          Cód. SEDUC: {book.seducCode}
        </span>
        <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-sm dark:bg-gray-700 dark:text-gray-200">
          Quantidade: {book.quantity}
        </span>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>Adicionado em: {book.createdAt}</p>
      </div>
    </div>
  )
}
