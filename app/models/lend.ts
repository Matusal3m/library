import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Student from './student.js'
import Book from './book.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Lend extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare wasExtended: boolean

  @column()
  declare itsOngoing: boolean

  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>

  @belongsTo(() => Book)
  declare book: BelongsTo<typeof Book>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime()
  declare extendedAt: DateTime

  @column.dateTime()
  declare endsAt: DateTime

  @column.dateTime()
  declare returnedAt: DateTime
}
