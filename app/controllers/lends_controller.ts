import Book from '#models/book'
import Lend from '#models/lend'
import Student from '#models/student'
import { createLendValidator, lendFilterValidator } from '#validators/lend'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import ClassRoom from '#models/class_room'

@inject()
export default class LendsController {
  /**
   * Display a list of resource
   */
  async index({ inertia, request }: HttpContext) {
    const { direction, orderBy, where } = await request.validateUsing(lendFilterValidator)

    const query = Lend.query()
      .preload('book', (q) => q.select('id', 'title', 'seduc_code'))
      .preload('student', (q) => q.select('id', 'name', 'enrollment_number'))
      .as('students')

    const { wasExtended, itsOngoing, itsLate, classRoomsIds } = where || {}

    const hasFilters =
      wasExtended !== 'any' ||
      itsOngoing !== 'any' ||
      itsLate !== 'any' ||
      (classRoomsIds && classRoomsIds.length > 0)

    if (hasFilters) {
      if (wasExtended && wasExtended !== 'any') {
        query.where('was_extended', wasExtended)
      }

      if (itsOngoing && itsOngoing !== 'any') {
        query.where('its_ongoing', itsOngoing)
      }

      if (itsLate && itsLate !== 'any') {
        const operator = itsLate ? '<' : '>'
        query.where((subquery) => {
          subquery
            .where((sq) => {
              sq.where('ends_at', operator, Date.now()).andWhereNull('returned_at')
            })
            .orWhereColumn('ends_at', operator, 'returned_at')
        })
      }

      if (classRoomsIds && classRoomsIds.length > 0) {
        classRoomsIds.forEach((classRoomId) => {
          query.whereHas('student', (studentQuery) => {
            studentQuery.where('class_room_id', classRoomId)
          })
        })
      }
    }

    query.orderBy(orderBy || 'created_at', direction || 'desc')

    const lends = await query.exec()
    const classRooms = await ClassRoom.all()

    return inertia.render('lends/index', {
      lends: lends.map((lend) => lend.serialize()),
      classRooms: classRooms.map((c) => c.serialize()) as { id: string; name: string }[],
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
    const { bookId, studentId } = await createLendValidator.validate(request.all())

    const book = await Book.findOrFail(bookId)
    const student = await Student.findOrFail(studentId)

    await Lend.create({ bookId, studentId })

    book.merge({ isAvailable: false }).save()
    student.merge({ onLend: true }).save()

    return response.redirect('/lends')
  }

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
