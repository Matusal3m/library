import { InferPageProps } from '@adonisjs/inertia/types'
import GenresController from '#controllers/genres_controller'
import { Link } from '@inertiajs/react'
import { BookIcon } from 'lucide-react'
import GenresLayout from '~/layouts/genres-layout'

export default function ListGenres({ genres }: InferPageProps<GenresController, 'index'>) {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/genres/${genre.id}`}
            className="block p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {genre.name}
            </h2>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <BookIcon className="w-4 h-4" />
              <span>
                {genre.booksCount} livro{genre.booksCount === 1 ? '' : 's'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
