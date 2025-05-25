import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import Book from './book.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'

export default class Author extends BaseModel {
    static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    declare id: string

    @beforeCreate()
    static assignUuid(author: Author) {
        author.id = randomUUID()
    }

    @column()
    declare name: string

    @manyToMany(() => Book, {
        pivotTable: 'author_books',
    })
    declare books: ManyToMany<typeof Book>

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
