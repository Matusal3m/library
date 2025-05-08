import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new lend.
 */
export const createLendValidator = vine.compile(
  vine.object({
    studentId: vine.string().exists({ table: 'students', column: 'id' }),
    bookId: vine.string().exists({ table: 'books', column: 'id' }),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing lend.
 */
export const updateLendValidator = vine.compile(vine.object({}))
