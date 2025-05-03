import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Author from './author.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Genre from './genre.js'
import { randomUUID } from 'node:crypto'

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

  @column()
  declare seducCode: string

  @column()
  declare quantity: number

  @column()
  declare isAvailable: boolean

  @belongsTo(() => Author)
  declare author: BelongsTo<typeof Author>

  @manyToMany(() => Genre)
  declare genres: ManyToMany<typeof Genre>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
