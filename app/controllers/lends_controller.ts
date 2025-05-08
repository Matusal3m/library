import Book from '#models/book'
import Lend from '#models/lend'
import Student from '#models/student'
import { createLendValidator } from '#validators/lend'
import type { HttpContext } from '@adonisjs/core/http'

export default class LendsController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    const lends = await Lend.query()
      .preload('book', (query) => {
        query.select('id', 'title', 'seduc_code')
      })
      .preload('student', (query) => {
        query.select('id', 'name', 'enrollment_number')
      })

    return inertia.render('lends/index', {
      lends,
    })
  }
  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    const students = await Student.all()
    const books = await Book.all()

    const booksJson = books.map((book) => ({
      id: book.id,
      name: book.title,
    }))

    const studentsJson = students.map((student) => ({
      id: student.id,
      name: student.name,
    }))

    return inertia.render('lends/create', {
      books: booksJson,
      students: studentsJson,
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { bookId, studentId } = await request.validateUsing(createLendValidator)

    const book = await Book.findOrFail(bookId)
    const student = await Student.findOrFail(studentId)

    await Lend.create({ bookId, studentId })

    book.merge({ isAvailable: false }).save()
    student.merge({ onLend: true }).save()

    return response.redirect('/lends')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
