import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider(
  {
    required: 'O campo {{ field }} é obrigatório',
    notEmpty: 'Um {{ field }} deve ser escolhido',
    positive: 'O valor deve ser positivo',
  },
  {
    title: 'título',
    quantity: 'quantidade',
    seducCode: 'código da seduc',
    authorsIds: 'autor',
    genresIds: 'gênero',
  }
)

/**
 * Validator to validate the payload when creating
 * a new book.
 */
export const createBookValidator = vine.compile(
  vine.object({
    title: vine.string(),
    quantity: vine.number().positive(),
    seducCode: vine.string(),
    authorsIds: vine.array(vine.string()).notEmpty(),
    genresIds: vine.array(vine.string()).notEmpty(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing book.
 */
export const updateBookValidator = vine.compile(vine.object({}))
