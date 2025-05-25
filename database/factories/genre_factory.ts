import factory from '@adonisjs/lucid/factories'
import Genre from '#models/genre'
import { BookFactory } from './book_factory.js'

export const GenreFactory = factory
    .define(Genre, async ({ faker }) => {
        return {
            name: faker.book.genre() + faker.number.int({ min: 10, max: 99 }),
        }
    })
    .relation('books', () => BookFactory)
    .build()
