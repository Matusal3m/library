import Author from '#models/author'
import Book from '#models/book'
import Genre from '#models/genre'

import type { HttpContext } from '@adonisjs/core/http'
import { createBookValidator } from '#validators/book'

export default class BooksController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    const books = await Book.query().preload('authors').preload('genres')

    const booksJson = books.map((book) => book.serialize()) as {
      id: string
      title: string
      isAvailable: boolean
      seducCode: string
      quantity: number
      genres: { id: string; name: string }[]
      authors: { id: string; name: string }[]
    }[]

    return inertia.render('books/list', { books: booksJson })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    const authors = (await Author.all()) as unknown as { id: string; name: string }[]
    const genres = (await Genre.all()) as unknown as { id: string; name: string }[]

    return inertia.render('books/create', { authors, genres })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { authorsIds, genresIds, ...rest } = await request.validateUsing(createBookValidator)

    const book = await Book.create(rest)

    await book.related('authors').attach(authorsIds)
    await book.related('genres').attach(genresIds)

    return response.redirect('/books')
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
