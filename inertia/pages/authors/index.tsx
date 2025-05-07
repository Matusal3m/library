import AuthorsController from '#controllers/authors_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'

export default function IndexAuthors({ authors }: InferPageProps<AuthorsController, 'index'>) {
  return (
    <ul className="grid grid-cols-3 gap-4 p-2">
      {authors.map((author) => (
        <Link href={`/authors/${author.id}`} key={author.id}>
          <li className="block p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              {author.name}
            </h5>
            <span className="mb-2 tracking-tight text-gray-900 dark:text-white">
              Livros registrados: {author.book_count}
            </span>
          </li>
        </Link>
      ))}
    </ul>
  )
}
