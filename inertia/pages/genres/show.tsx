import GenresController from '#controllers/genres_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'

export default function ShowGenre({ genre }: InferPageProps<GenresController, 'show'>) {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {genre.name}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {genre.books.length} livro{genre.books.length === 1 ? '' : 's'} encontrado
                </p>
            </div>

            <div className="space-y-4">
                {genre.books.length === 0 ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                        Nenhum livro neste gênero ainda.
                    </p>
                ) : (
                    genre.books.map((book) => (
                        <Link
                            key={book.id}
                            href={`/books/${book.id}`}
                            className="block border border-gray-200 dark:border-gray-700 rounded-md p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:scale-[1.01]"
                        >
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                {book.title}
                            </h2>

                            <div className="flex flex-wrap gap-2">
                                {book.authors.length > 0 ? (
                                    book.authors.map((author) => (
                                        <Link
                                            key={author.id}
                                            href={`/authors/${author.id}`}
                                            className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-sm hover:underline"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {author.name}
                                        </Link>
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                                        Autor desconhecido
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}
