import { InferPageProps } from '@adonisjs/inertia/types'
import BooksController from '../../../app/controllers/books_controller'
import { Link } from '@inertiajs/react'
import { BookOpenIcon } from 'lucide-react'
import AvailableIndicator from '~/components/ui/indicators/available-indicator'
import UnavailableIndicator from '~/components/ui/indicators/unavailable-indicator'
import BooksLayout from '~/layouts/books-layout'

export default function ShowBook({ book }: InferPageProps<BooksController, 'show'>) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{book.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          {book.isAvailable ? <AvailableIndicator /> : <UnavailableIndicator />}
          <span>Cód. da Seduc: {book.seducCode}</span>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <BookOpenIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span>Quantidade de Réplicas: {book.quantity}</span>
          </div>
        </div>
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
      </section>
    </div>
  )
}
