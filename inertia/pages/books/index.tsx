import { useForm } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import BooksController from '../../../app/controllers/books_controller'
import { Link } from '@inertiajs/react'

export default function IndexBooks({
    books,
    search,
    where,
}: InferPageProps<BooksController, 'index'>) {
    const { data, setData, get } = useForm({
        search: search || '',
        where: where || 'title',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        get('/books', {
            preserveState: true,
            replace: true,
        })
    }

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Buscar livros..."
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                />
                <select
                    value={data.where}
                    onChange={(e) => setData('where', e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg"
                >
                    <option value="title">Título</option>
                    <option value="author">Autor</option>
                </select>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Buscar
                </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="block h-full p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 transition-all"
                    >
                        <Link href={`/books/${book.id}`}>
                            <h5 className="hover:underline mb-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {book.title}
                            </h5>
                        </Link>

                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 underline ">
                            <div>
                                <strong>Autoria:</strong>{' '}
                                <span className="flex flex-wrap gap-1">
                                    {book.authors.map((author, i) => (
                                        <Link
                                            href={`/authors/${author.id}`}
                                            className="hover:font-semibold"
                                            key={author.id}
                                        >
                                            {author.name}
                                            {i === book.authors.length - 1 ? '' : ','}
                                        </Link>
                                    ))}
                                </span>
                            </div>

                            <div>
                                <strong>Gêneros:</strong>{' '}
                                <span className="flex flex-wrap gap-1">
                                    {book.genres.map((genre, i) => (
                                        <Link
                                            href={`/genres/${genre.id}`}
                                            className="hover:font-semibold"
                                            key={genre.id}
                                        >
                                            {genre.name}
                                            {i === book.genres.length - 1 ? '' : ','}
                                        </Link>
                                    ))}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
