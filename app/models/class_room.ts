import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasManyThrough } from '@adonisjs/lucid/orm'
import Student from './student.js'
import type { HasMany, HasManyThrough } from '@adonisjs/lucid/types/relations'
import Book from './book.js'

export default class ClassRoom extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @hasMany(() => Student)
  declare students: HasMany<typeof Student>

  @hasManyThrough([() => Book, () => Student])
  declare books: HasManyThrough<typeof Book>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
