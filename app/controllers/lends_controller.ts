import Book from '#models/book'
import Lend from '#models/lend'
import Student from '#models/student'
import { createLendValidator, lendFilterValidator } from '#validators/lend'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import ClassRoom from '#models/class_room'
import { LendsFilterService } from '#services/lends_filter_service'
import { DocumentGeneratorService } from '#services/document_generator_service'
import { rmSync } from 'node:fs'
import BookReplica from '#models/book_replica'

@inject()
export default class LendsController {
  constructor(
    private lendsFilter: LendsFilterService,
    private documentGenerator: DocumentGeneratorService
  ) {}

  /**
   * Display a list of resource
   */
  async index({ inertia, request }: HttpContext) {
    const filterOptions = await request.validateUsing(lendFilterValidator)

    const lends = await this.lendsFilter.filter(filterOptions)

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
    const { bookReplicaId, studentId } = await createLendValidator.validate(request.all())

    const bookReplica = await BookReplica.findOrFail(bookReplicaId)
    const student = await Student.findOrFail(studentId)

    await Lend.create({ bookReplicaId, studentId })

    bookReplica.merge({ isAvailable: false }).save()
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
    await lend.load('bookReplica')

    lend.returnedAt = DateTime.now()
    lend.itsOngoing = false
    lend.student.onLend = false
    lend.bookReplica.isAvailable = true

    await lend.save()
    await lend.student.save()
    await lend.bookReplica.save()

    return response.redirect('/lends')
  }

  async document({ request, response }: HttpContext) {
    const filterOptions = await request.validateUsing(lendFilterValidator)

    const lends = await this.lendsFilter.filter(filterOptions, { loadStudentsClassRooms: true })

    const data = lends.map((lend) => {
      lend.bookReplica.load('book')

      //@ts-ignore
      lend = lend.serialize()

      return [
        lend.student.name,
        lend.student.classRoom.name,
        lend.student.enrollmentNumber,
        lend.bookReplica.book.title,
        lend.bookReplica.seducCode,
        lend.createdAt,
        lend.endsAt,
      ]
    })

    const { path } = await this.documentGenerator.generate(
      ['Aluno', 'Turma', 'N. de Matrícula', 'Livro', 'Cód. da Seduc', 'Início', 'Término'],
      data
    )

    response.onFinish(() => {
      rmSync(path)
    })

    return response.attachment(path, 'relatorio-de-emprestimos.pdf')
  }
}
