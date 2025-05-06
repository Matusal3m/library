import factory from '@adonisjs/lucid/factories'
import Book from '#models/book'
import { AuthorFactory } from './author_factory.js'
import { GenreFactory } from './genre_factory.js'

export const BookFactory = factory
  .define(Book, async ({ faker }) => {
    return {
      title: faker.book.title(),
      quantity: faker.helpers.rangeToNumber({
        max: 15,
        min: 2,
      }),
      isAvailable: true,
      seducCode: faker.commerce.isbn(),
    }
  })
  .relation('authors', () => AuthorFactory)
  .relation('genres', () => GenreFactory)
  .build()
