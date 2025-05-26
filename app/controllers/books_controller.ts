import Author from '#models/author'
import Book from '#models/book'
import Genre from '#models/genre'
import Student from '#models/student'

import type { HttpContext } from '@adonisjs/core/http'
import { createBookValidator, updateBookValidator } from '#validators/book'

type SerializedBookWithReplicas = {
    id: string
    title: string
    genres: { id: string; name: string }[]
    authors: { id: string; name: string }[]
    replicas: { id: string; seducCode: string; isAvailable: string }[]
    quantity: number
    createdAt: string
    updatedAt: string
}

export default class BooksController {
    /**
     * Display a list of resource
     */
    async index({ inertia, request }: HttpContext) {
        const search = request.input('search', '')
        const where = request.input('where', 'title')

        const booksQuery = Book.query().preload('authors').preload('genres')

        if (search !== '') {
            booksQuery.where((query) => {
                if (where === 'title') {
                    query.whereLike('title', `%${search}%`)
                }

                if (where === 'author') {
                    query.orWhereHas('authors', (authorQuery) => {
                        authorQuery.whereLike('name', `%${search}%`)
                    })
                }
            })
        }

        const books = await booksQuery.orderBy('title')

        return inertia.render('books/index', {
            books,
            search: search as string,
            where: where as string,
        })
    }

    /**
     * Display form to create a new record
     */
    async create({ inertia }: HttpContext) {
        const authors = (await Author.query().select('id', 'name')) as unknown as {
            id: string
            name: string
        }[]
        const genres = (await Genre.query().select('id', 'name')) as unknown as {
            id: string
            name: string
        }[]

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
    async show({ params, inertia }: HttpContext) {
        const book = await Book.findOrFail(params.id)

        await book.load('authors', (q) => q.select('id', 'name'))
        await book.load('genres', (q) => q.select('id', 'name'))
        await book.load('replicas', (q) => q.select('id', 'seduc_code', 'is_available', 'book_id'))

        await book.loadCount('replicas')

        const bookJson = book.serialize()

        return inertia.render('books/show', {
            book: {
                ...bookJson,
                quantity: book.$extras.replicas_count,
            } as SerializedBookWithReplicas,
            students: inertia.optional(
                async () =>
                    (await Student.query().select('id', 'name', 'enrollment_number')).map(s => ({
                        id: s.id,
                        name:`${s.name} (${s.enrollmentNumber})`
                    }))  as { id: string; name: string}[]
            ),
        })
    }

    /**
     * Edit individual record
     */
    async edit({ params, inertia }: HttpContext) {
        const book = await Book.findOrFail(params.id)

        await book.load('authors')
        await book.load('genres')

        return inertia.render('books/show', {
            book: book.serialize() as {
                id: string
                title: string
                genres: { id: string; name: string }[]
                authors: { id: string; name: string }[]
            },
        })
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ params, request, response }: HttpContext) {
        const data = await request.validateUsing(updateBookValidator)
        const book = await Book.findOrFail(params.id)

        await book.merge(data).save()

        return response.redirect('/books')
    }
}
