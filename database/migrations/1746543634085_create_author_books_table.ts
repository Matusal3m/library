import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'author_books'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')

            table.uuid('author_id').references('authors.id')
            table.uuid('book_id').references('books.id')

            table.timestamp('created_at')
            table.timestamp('updated_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
