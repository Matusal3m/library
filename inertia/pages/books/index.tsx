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
                                {book.authors.map((author, i) => (
                                    <div key={author.id}>
                                        {author.name}
                                        {i === book.authors.length - 1 ? '' : ','}
                                    </div>
                                ))}
                            </span>
                        </div>

                        <div>
                            <strong>Gêneros:</strong>{' '}
                            <span className="flex flex-wrap gap-1">
                                {book.genres.map((genre, i) => (
                                    <span key={genre.id}>
                                        {genre.name}
                                        {i === book.genres.length - 1 ? '' : ','}
                                    </span>
                                ))}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
