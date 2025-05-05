import { InferPageProps } from '@adonisjs/inertia/types'
import BooksController from '../../../app/controllers/books_controller'

export default function ListBooks(props: InferPageProps<BooksController, 'index'>) {
  return (
    <div>
      {props.books.map((book) => (
        <>
          <code>{JSON.stringify(book)}</code>
          <br />
        </>
      ))}
    </div>
  )
}
