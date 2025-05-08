import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'lends'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.uuid('student_id').references('students.id')
      table.uuid('book_id').references('books.id')

      table.boolean('was_extended').defaultTo(false)
      table.boolean('its_ongoing').defaultTo(true)

      table.timestamp('created_at')
      table.timestamp('extend_at')
      table.timestamp('ends_at')
      table.timestamp('returned_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
