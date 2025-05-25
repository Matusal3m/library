import factory from '@adonisjs/lucid/factories'
import BookReplica from '#models/book_replica'

export const BookReplicaFactory = factory
    .define(BookReplica, async ({ faker }) => {
        return {
            seducCode: faker.string.fromCharacters('ABCDEFG123456', 8),
            isAvailable: true,
        }
    })
    .build()
