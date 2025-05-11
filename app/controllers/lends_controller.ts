import Book from '#models/book'
import Lend from '#models/lend'
import Student from '#models/student'
import { createLendValidator } from '#validators/lend'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

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
      lends: lends.map((lend) => lend.serialize()),
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

  async extend({ params, response }: HttpContext) {
    const lend = await Lend.findOrFail(params.id)

    lend.extendedAt = DateTime.now()
    lend.wasExtended = true
    lend.endsAt = lend.extendedAt.plus({ days: 14 })

    await lend.save()

    return response.redirect('/lends')
  }

  async finish({ params, response }: HttpContext) {
    const lend = await Lend.findOrFail(params.id)

    await lend.load('student')
    await lend.load('book')

    lend.returnedAt = DateTime.now()
    lend.itsOngoing = false
    lend.student.onLend = false
    lend.book.isAvailable = true

    await lend.save()
    await lend.student.save()
    await lend.book.save()

    return response.redirect('/lends')
  }
}
