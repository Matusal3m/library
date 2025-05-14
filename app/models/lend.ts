import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import Student from './student.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import BookReplica from './book_replica.js'

export default class Lend extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(lend: Lend) {
    lend.id = randomUUID()
  }

  @beforeCreate()
  static registerEndDate(lend: Lend) {
    lend.endsAt = DateTime.now().plus({ days: 14 })
  }

  @column({
    serialize(value) {
      return value === 1
    },
  })
  declare wasExtended: boolean

  @column({
    serialize(value) {
      return value === 1
    },
  })
  declare itsOngoing: boolean

  @column()
  declare studentId: string

  @column()
  declare bookReplicaId: string

  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>

  @belongsTo(() => BookReplica)
  declare bookReplica: BelongsTo<typeof BookReplica>

  @column.dateTime({
    autoCreate: true,
    serialize(value) {
      return DateTime.fromISO(value).toLocaleString(DateTime.DATE_SHORT)
    },
  })
  declare createdAt: DateTime

  @column.dateTime({
    serialize(value) {
      return value ? DateTime.fromISO(value).toLocaleString(DateTime.DATE_SHORT) : value
    },
  })
  declare extendedAt: DateTime

  @column.dateTime({
    serialize(value) {
      return DateTime.fromISO(value).toLocaleString(DateTime.DATE_SHORT)
    },
  })
  declare endsAt: DateTime

  @column.dateTime({
    serialize(value) {
      return value ? DateTime.fromISO(value).toLocaleString(DateTime.DATE_SHORT) : value
    },
  })
  declare returnedAt: DateTime
}
