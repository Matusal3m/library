import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'students'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()

            table.string('name')
            table.string('phone_number').unique().nullable()
            table.string('email', 254).unique().nullable()
            table.integer('enrollment_number').unsigned().unique()
            table.boolean('on_lend').defaultTo(false)
            table.string('class_room_id').unsigned().references('class_rooms.id')

            table.timestamp('created_at')
            table.timestamp('updated_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
