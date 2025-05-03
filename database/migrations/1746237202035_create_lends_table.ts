import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'lends'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.integer('student_id').unsigned().references('students.id')
      table.integer('book_id').unsigned().references('books.id')

      table.boolean('was_extended').defaultTo(false)
      table.boolean('its_ongoing')

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
