import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new book replica.
 */
export const createBookReplicaValidator = vine.compile(
    vine.object({
        bookId: vine.string(),
        seducCode: vine.string(),
    })
)

/**
 * Validator to validate the payload when updating
 * an existing book replica.
 */
export const updateBookReplicaValidator = vine.compile(
    vine.object({
        seducCode: vine.string(),
    })
)
