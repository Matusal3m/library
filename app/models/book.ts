import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Author from './author.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Genre from './genre.js'
import { randomUUID } from 'node:crypto'
import BookReplica from './book_replica.js'

export default class Book extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(book: Book) {
    book.id = randomUUID()
  }

  @column()
  declare title: string

  @hasMany(() => BookReplica)
  declare replicas: HasMany<typeof BookReplica>

  @manyToMany(() => Author, {
    pivotTable: 'author_books',
  })
  declare authors: ManyToMany<typeof Author>

  @manyToMany(() => Genre, {
    pivotTable: 'genre_books',
  })
  declare genres: ManyToMany<typeof Genre>

  @column.dateTime({
    autoCreate: true,
    serialize(value) {
      return DateTime.fromISO(value).toLocaleString(DateTime.DATE_SHORT)
    },
  })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize(value) {
      return DateTime.fromISO(value).toLocaleString(DateTime.DATE_SHORT)
    },
  })
  declare updatedAt: DateTime
}
