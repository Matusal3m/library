import { InferPageProps } from '@adonisjs/inertia/types'
import BooksController from '../../../app/controllers/books_controller'
import { Link } from '@inertiajs/react'
import AvailableIndicator from '~/components/ui/indicators/available-indicator'
import UnavailableIndicator from '~/components/ui/indicators/unavailable-indicator'

export default function ShowBook({ book }: InferPageProps<BooksController, 'show'>) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{book.title}</h1>
      </header>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Autoria</h2>
          <div className="flex flex-wrap gap-2">
            {book.authors.map((author) => (
              <Link
                key={author.id}
                href={`/authors/${author.id}`}
                className="underline dark:text-white hover:text-blue-800"
              >
                {author.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Gêneros</h2>
          <div className="flex flex-wrap gap-2">
            {book.genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/genres/${genre.id}`}
                className="underline dark:text-white hover:text-blue-800"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Réplicas</h2>
          <div className="flex flex-col gap-2">
            {book.replicas.map((replica) => (
              <div
                key={replica.id}
                className="flex items-center justify-between px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 hover:shadow-sm transition-shadow"
              >
                <span className="text-blue-700 dark:text-blue-300 font-mono underline">
                  {replica.seducCode}
                </span>
                {replica.isAvailable ? (
                  <AvailableIndicator message="Disponível" />
                ) : (
                  <UnavailableIndicator message="Indisponível" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
