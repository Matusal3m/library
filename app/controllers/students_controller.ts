import ClassRoom from '#models/class_room'
import Student from '#models/student'
import { createStudentValidator } from '#validators/student'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentsController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    const students = await Student.all()

    return inertia.render('students/index', {
      students,
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
