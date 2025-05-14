import factory from '@adonisjs/lucid/factories'
import Book from '#models/book'
import { AuthorFactory } from './author_factory.js'
import { GenreFactory } from './genre_factory.js'
import { BookReplicaFactory } from './book_replica_factory.js'

export const BookFactory = factory
  .define(Book, async ({ faker }) => {
    return {
      title: faker.book.title(),
    }
  })
  .relation('authors', () => AuthorFactory)
  .relation('genres', () => GenreFactory)
  .relation('replicas', () => BookReplicaFactory)
  .build()
