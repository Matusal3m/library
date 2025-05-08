import AuthorsController from '#controllers/authors_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import AuthorBookList from '~/components/authors/author-book-list'
import AuthorWithoutBooksAlert from '~/components/authors/author-without-books-alert'

export default function ShowAuthor(props: InferPageProps<AuthorsController, 'show'>) {
  return (
    <div className="p-6 max-w-4xl mx-auto dark:bg-gray-800 rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {props.author.name}
        </h1>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2">
          Livros de sua autoria
        </h3>
        {props.author.books && props.author.books.length > 0 ? (
          <AuthorBookList books={props.author.books} />
        ) : (
          <AuthorWithoutBooksAlert />
        )}
      </div>
    </div>
  )
}
