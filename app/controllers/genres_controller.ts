import Genre from '#models/genre'
import { createGenreValidator, updateGenreValidator } from '#validators/genre'
import type { HttpContext } from '@adonisjs/core/http'
export default class GenresController {
    /**
     * Display a list of resource
     */
    async index({ inertia }: HttpContext) {
        const genres = await Genre.query().withCount('books')

        const genresJSON = genres.map((genre) => ({
            id: genre.id,
            name: genre.name,
            booksCount: genre.$extras.books_count,
        }))

        return inertia.render('genres/index', { genres: genresJSON })
    }

    /**
     * Display form to create a new record
     */
    async create({ inertia }: HttpContext) {
        return inertia.render('genres/create')
    }

    /**
     * Handle form submission for the create action
     */
    async store({ request, response }: HttpContext) {
        const data = await request.validateUsing(createGenreValidator)

        await Genre.create(data)

        return response.redirect('/genres')
    }

    /**
     * Show individual record
     */
    async show({ params, inertia }: HttpContext) {
        const genre = await Genre.findOrFail(params.id)

        await genre.load('books', (q) => q.preload('authors').preload('genres'))

        return inertia.render('genres/show', { genre })
    }

    /**
     * Edit individual record
     */
    async edit({ params, inertia }: HttpContext) {
        const genre = await Genre.findOrFail(params.id)

        return inertia.render('genres/edit', { genre })
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ params, request, response }: HttpContext) {
        const data = await request.validateUsing(updateGenreValidator)

        const genre = await Genre.findOrFail(params.id)

        await genre.merge(data).save()

        return response.redirect('/genres')
    }

    /**
     * Delete record
     */
    async destroy({ params, response }: HttpContext) {
        const genre = await Genre.findOrFail(params.id)

        await genre.delete()

        return response.redirect('/genres')
    }
}
