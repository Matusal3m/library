import AuthorsController from '#controllers/authors_controller'
import { InferPageProps } from '@adonisjs/inertia/types'

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
      className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-700 dark:border-gray-600"
    >
      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{book.title}</h4>

      <div className="flex flex-wrap gap-2 mb-3">
        <span
          className={`px-2 py-1 text-xs rounded-full ${book.isAvailable ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}
        >
          {book.isAvailable ? 'Disponível' : 'Indisponível'}
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-200">
          Código SEDUC: {book.seducCode}
        </span>
        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full dark:bg-purple-900 dark:text-purple-200">
          Quantidade: {book.quantity}
        </span>
        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full dark:bg-purple-900 dark:text-purple-200">
          Está disponível: {book.isAvailable}
        </span>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-300">
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
