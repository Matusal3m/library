import Genre from '#models/genre'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    Genre.updateOrCreateMany('name', [
      { name: 'Romance' },
      { name: 'Romance policial' },
      { name: 'Romance distópico' },
      { name: 'Ficção científica' },
      { name: 'Fantasia' },
      { name: 'Terror' },
      { name: 'Suspense' },
      { name: 'Literatura infantojuvenil' },
      { name: 'Realismo mágico' },
      { name: 'Conto' },
      { name: 'Crônica' },
      { name: 'Biografia/Autobiografia' },
      { name: 'Poesia' },
      { name: 'Histórias em Quadrinhos (HQ)' },
      { name: 'Gibi' },
      { name: 'Graphic novel' },
      { name: 'Mangá' },
      { name: 'Webcomic' },
      { name: 'Quadrinhos de super-heróis' },
      { name: 'Quadrinhos nacionais' },
    ])
  }
}
