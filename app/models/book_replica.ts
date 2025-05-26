import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import Book from './book.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class BookReplica extends BaseModel {
    static selfAssignPrimaryKey = true

    @beforeCreate()
    static assignUuid(bookReplica: BookReplica) {
        bookReplica.id = randomUUID()
    }

    @column({ isPrimary: true })
    declare id: string

    @column()
    declare bookId: string

    @column()
    declare seducCode: string

    @belongsTo(() => Book)
    declare book: BelongsTo<typeof Book>

    @column({
        serialize(value) {
            return value === 1
        },
    })
    declare isAvailable: boolean

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
