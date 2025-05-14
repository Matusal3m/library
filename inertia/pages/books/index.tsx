import { InferPageProps } from '@adonisjs/inertia/types'
import BooksController from '../../../app/controllers/books_controller'
import { Link } from '@inertiajs/react'

export default function IndexBooks({ books }: InferPageProps<BooksController, 'index'>) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="block h-full p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 transition-all"
        >
          <Link href={`/books/${book.id}`}>
            <h5 className="hover:underline  mb-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {book.title}
            </h5>
          </Link>

          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <strong>Autoria:</strong>{' '}
              <span className="flex flex-wrap gap-1">
                {book.authors.map((author) => (
                  <Link
                    key={author.id}
                    href={`/authors/${author.id}`}
                    className="underline hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {author.name}
                  </Link>
                ))}
              </span>
            </div>

            <div>
              <strong>Gêneros:</strong>{' '}
              <span className="flex flex-wrap gap-1">
                {book.genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href={`/genres/${genre.id}`}
                    className="underline hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {genre.name}
                  </Link>
                ))}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
