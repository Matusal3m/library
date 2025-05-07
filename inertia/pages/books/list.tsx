import { InferPageProps } from '@adonisjs/inertia/types'
import BooksController from '../../../app/controllers/books_controller'
import { Link } from '@inertiajs/react'
import { AvailableIndicator, UnavailableIndicator } from '~/components/ui/indicators'

export default function ListBooks({ books }: InferPageProps<BooksController, 'index'>) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {books.map((book) => (
        <Link href={`/books/${book.id}`} key={book.id}>
          <div className="block h-full p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 transition-all">
            <h5 className="mb-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {book.title}
            </h5>

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

              <div className="flex items-center gap-2 flex-wrap">
                {book.isAvailable ? <AvailableIndicator /> : <UnavailableIndicator />}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Código da Seduc: {book.seducCode}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
