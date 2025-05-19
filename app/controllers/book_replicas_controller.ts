import Book from '#models/book'
import BookReplica from '#models/book_replica'
import { createBookReplicaValidator, updateBookReplicaValidator } from '#validators/book_replica'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class BookReplicasController {
  async index({ request, response }: HttpContext) {
    const query = BookReplica.query()

    if (request.qs().bookId) {
      query.where('book_id', request.qs().bookId)
    }

    const bookReplicas = await query.exec()

    return response.send(bookReplicas)
  }

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
  async show({ params, inertia }: HttpContext) {
    const studentsHistory = await db
      .from('lends')
      .join('students', (q) => {
        q.on('lends.book_replica_id', '=', params.id)
      })
      .select('students.name', 'students.id', 'students.enrollment_number', 'students.class_room')
      .exec()

    const bookReplica = await BookReplica.findOrFail(params.id)

    return inertia.render('book_replicas/show', {
      studentsHistory,
      bookReplica,
    })
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
