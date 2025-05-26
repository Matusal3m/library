import ClassRoom from '#models/class_room'
import Student from '#models/student'
import { createStudentValidator, updateStudentValidator } from '#validators/student'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentsController {
    /**
     * Display a list of resource
     */
    async index({ inertia, request }: HttpContext) {
        const search = request.input('search', '').trim()
        const where = request.input('where', 'name')

        const studentsQuery = Student.query()

        if (search !== '') {
            if (where === 'name') {
                studentsQuery.whereLike('name', `%${search}%`)
            }

            if (where === 'email') {
                studentsQuery.whereLike('email', `%${search}%`)
            }
        }

        const students = await studentsQuery.orderBy('name')

        return inertia.render('students/index', {
            students,
            search,
            where,
        })
    }

    /**
     * Display form to create a new record
     */
    async create({ inertia }: HttpContext) {
        const classRooms = (await ClassRoom.all()) as { id: string; name: string }[]

        return inertia.render('students/create', { classRooms })
    }

    /**
     * Handle form submission for the create action
     */
    async store({ request, response }: HttpContext) {
        const data = await request.validateUsing(createStudentValidator)

        await Student.create(data)

        return response.redirect('/students')
    }

    /**
     * Show individual record
     */
    async show({ params, inertia }: HttpContext) {
        const student = await Student.query()
            .where('id', params.id)
            .preload('classRoom')
            .preload('lend', (query) => {
                query.preload('bookReplica').orderBy('created_at', 'desc').first()
            })
            .firstOrFail()

        return inertia.render('students/show', {
            student: student as any as {
                id: string
                name: string
                enrollmentNumber: number
                phoneNumber: string
                email: string
                classRoom: { id: string; name: string }
                lend: {
                    id: string
                    createdAt: string
                    extendedAt: string
                    endsAt: string
                    returnedAt: string
                    itsOngoing: boolean
                    wasExtended: boolean
                    book: {
                        id: string
                        title: string
                        seducCode: string
                    }
                }
            },
        })
    }

    /**
     * Edit individual record
     */
    async edit({ params, inertia }: HttpContext) {
        const student = await Student.findOrFail(params.id)

        const classRooms = await ClassRoom.query().select('id', 'name')

        return inertia.render('students/edit', {
            student: student.serialize(),
            classRooms: classRooms as { id: string; name: string }[],
        })
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ params, response, request }: HttpContext) {
        const data = await request.validateUsing(updateStudentValidator, {
            meta: { userId: params.id },
        })

        const student = await Student.findOrFail(params.id)

        student.merge(data).save()

        return response.redirect(`/students`)
    }
}
