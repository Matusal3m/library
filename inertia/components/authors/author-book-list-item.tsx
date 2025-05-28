import { Link } from '@inertiajs/react'

export default function AuthorBookListItem({ book }: { book: any }) {
    return (
        <div
            key={book.id}
            className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700"
        >
            <Link
                href={`/books/${book.id}`}
                className="block text-lg font-bold text-blue-800 dark:text-blue-300 mb-2 hover:underline"
            >
                {book.title}
            </Link>

            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium">Quantidade:</span>{' '}
                {book.meta.quantity ?? (
                    <span className="text-red-600 dark:text-red-400 italic">não informado</span>
                )}
            </div>
        </div>
    )
}
