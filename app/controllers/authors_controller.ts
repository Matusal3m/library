import Author from '#models/author'
import Book from '#models/book'
import { createAuthorValidator, updateAuthorValidator } from '#validators/author'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class AuthorsController {
    /**
     * Display a list of resource
     */
    async index({ inertia }: HttpContext) {
        const authors = await Author.query().withCount('books')

        const authorsWithBooksCount = authors.map((author) => ({
            id: author.id,
            name: author.name,
            book_count: author.$extras.books_count,
        }))

        return await inertia.render('authors/index', {
            authors: authorsWithBooksCount,
        })
    }

    /**
     * Display form to create a new record
     */
    async create({ inertia }: HttpContext) {
        return await inertia.render('authors/create')
    }

    /**
     * Handle form submission for the create action
     */
    async store({ request, response }: HttpContext) {
        const data = await request.validateUsing(createAuthorValidator)

        await Author.create(data)

        return response.redirect().toRoute('authors.index')
    }

    /**
     * Show individual record
     */
    async show({ params, inertia }: HttpContext) {
        const author = await Author.query()
            .where('id', params.id)
            .preload('books', (bq) => {
                bq.withCount('replicas', (cq) => cq.as('quantity'))
            })
            .firstOrFail()

        return inertia.render('authors/show', {
            author: author.serialize(),
        })
    }

    /**
     * Edit individual record
     */
    async edit({ params, inertia }: HttpContext) {
        const author = await Author.findByOrFail(params.id)

        return inertia.render('authors/edit', { author })
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ params, request }: HttpContext) {
        const data = await request.validateUsing(updateAuthorValidator)

        const author = await Author.findByOrFail({ id: params.id })

        author.name = data.name

        return author
    }

    /**
     * Delete record
     */
    async destroy({ params }: HttpContext) {
        const author = await Author.findByOrFail({ id: params.id })
        await author.delete()
    }
}
