import ClassRoom from '#models/class_room'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    ClassRoom.updateOrCreateMany('name', [
      {
        name: '1º informática',
      },
      {
        name: '2º informática',
      },
      {
        name: '3º informática',
      },
      {
        name: '1º enfermagem',
      },
      {
        name: '2º enfermagem',
      },
      {
        name: '3º enfermagem',
      },
      {
        name: '1º guia de turismo',
      },
      {
        name: '2º guia de turismo',
      },
      {
        name: '3º guia de turismo',
      },
    ])
  }
}
