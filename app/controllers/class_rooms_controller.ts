import ClassRoom from '#models/class_room'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClassRoomsController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    const classRooms = await ClassRoom.query().withCount('students')

    const classRoomsJson = classRooms.map((classRoom) => ({
      id: classRoom.id,
      name: classRoom.name,
      studentsCount: classRoom.$extras.studentsCount ?? 0,
    }))

    return inertia.render('class_rooms/index', { classRooms: classRoomsJson })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

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
