import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new author.
 */
export const createAuthorValidator = vine.compile(
  vine.object({
    name: vine.string().unique({ column: 'name', table: 'authors' }),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing author.
 */
export const updateAuthorValidator = vine.compile(
  vine.object({
    name: vine.string().unique({ column: 'name', table: 'authors' }),
  })
)
