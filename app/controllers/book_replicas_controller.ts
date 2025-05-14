import Book from '#models/book'
import BookReplica from '#models/book_replica'
import { createBookReplicaValidator, updateBookReplicaValidator } from '#validators/book_replica'
import type { HttpContext } from '@adonisjs/core/http'

export default class BookReplicasController {
  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { bookId, seducCode } = await request.validateUsing(createBookReplicaValidator)

    await BookReplica.create({ bookId, seducCode })

    const book = await Book.findOrFail(bookId)

    await book.load('replicas')
    await book.load('genres')
    await book.load('authors')

    return response.redirect(`/books/${bookId}`)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    // Include students history on show method
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ response, request, params }: HttpContext) {
    const { seducCode } = await request.validateUsing(updateBookReplicaValidator)

    const bookReplica = await BookReplica.findOrFail(params.id)

    await bookReplica.merge({ seducCode }).save()

    return response.redirect(`/books/${bookReplica.bookId}`)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
