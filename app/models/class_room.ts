import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany, hasManyThrough } from '@adonisjs/lucid/orm'
import Student from './student.js'
import type { HasMany, HasManyThrough } from '@adonisjs/lucid/types/relations'
import Book from './book.js'
import { randomUUID } from 'node:crypto'

export default class ClassRoom extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(classRoom: ClassRoom) {
    classRoom.id = randomUUID()
  }

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
