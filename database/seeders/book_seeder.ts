import { BookFactory } from '#database/factories/book_factory'
import Book from '#models/book'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
    async run() {
        const books = await BookFactory.with('authors', 2)
            .with('authors', 3)
            .with('replicas', 10)
            .with('genres', 3)
            .createMany(9)

        Book.createMany(books)
    }
}
