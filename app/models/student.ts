import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import ClassRoom from './class_room.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare phoneNumber: string

  @column()
  declare email: string

  @column()
  declare enrollmentNumber: number

  @column()
  declare onLend: boolean

  @belongsTo(() => ClassRoom)
  declare classRoom: BelongsTo<typeof ClassRoom>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
