import AuthorsController from '#controllers/authors_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { AvailableIndicator, UnavailableIndicator } from '~/components/ui/indicators'

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

function AuthorBookList({
  books,
}: {
  books: {
    id: string
    title: string
    seducCode: string
    quantity: number
    isAvailable: boolean
    createdAt: string
  }[]
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {books.map((book: any) => (
        <BookListItem book={book} />
      ))}
    </div>
  )
}

function BookListItem({
  book,
}: {
  book: {
    id: string
    title: string
    seducCode: string
    quantity: number
    isAvailable: boolean
    createdAt: string
  }
}) {
  return (
    <div
      key={book.id}
      className="p-4 bg-white rounded-md border border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">{book.title}</h4>

      <div className="flex flex-wrap gap-2 mb-4">
        {book.isAvailable ? <AvailableIndicator /> : <UnavailableIndicator />}
        <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-sm dark:bg-gray-700 dark:text-gray-200">
          Cód. SEDUC: {book.seducCode}
        </span>
        <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-sm dark:bg-gray-700 dark:text-gray-200">
          Quantidade: {book.quantity}
        </span>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>Adicionado em: {new Date(book.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  )
}

function AuthorWithoutBooksAlert() {
  return (
    <div className="p-4 text-center bg-gray-50 rounded-lg dark:bg-gray-600">
      <p className="text-gray-600 dark:text-gray-300">O autor não possui livros registrados</p>
    </div>
  )
}
