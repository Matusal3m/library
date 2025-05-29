import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new genre.
 */
export const createGenreValidator = vine.compile(
    vine.object({
        name: vine.string(),
    })
)

/**
 * Validator to validate the payload when updating
 * an existing genre.
 */
export const updateGenreValidator = vine.compile(
    vine.object({
        name: vine.string(),
    })
)
