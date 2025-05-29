import { InferPageProps } from '@adonisjs/inertia/types'
import GenresController from '#controllers/genres_controller'
import { Link } from '@inertiajs/react'
import { BookIcon } from 'lucide-react'

export default function ListGenres({ genres }: InferPageProps<GenresController, 'index'>) {
    return (
        <div className="p-6">
            <h1 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Gêneros literários
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {genres.map((genre) => (
                    <Link
                        href={`/genres/${genre.id}`}
                        key={genre.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-md p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">
                            {genre.name}
                        </h2>

                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <BookIcon className="w-4 h-4 mr-1.5" />
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
