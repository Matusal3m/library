import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import ClassRoom from './class_room.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import Lend from './lend.js'

export default class Student extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(student: Student) {
    student.id = randomUUID()
  }

  @column()
  declare name: string

  @column()
  declare phoneNumber: string

  @column()
  declare email: string

  @column()
  declare enrollmentNumber: number

  @column({
    serialize(value) {
      return value === 1
    },
  })
  declare onLend: boolean

  @column()
  declare classRoomId: string

  @hasOne(() => Lend)
  declare lend: HasOne<typeof Lend>

  @belongsTo(() => ClassRoom)
  declare classRoom: BelongsTo<typeof ClassRoom>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
