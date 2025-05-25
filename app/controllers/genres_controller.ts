import Genre from '#models/genre'
import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'
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
    async store({ request }: HttpContext) {}

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
