import vine, { SimpleMessagesProvider } from '@vinejs/vine'
// import { LendMessagesProvider } from './custom-messages/lend.js'

vine.messagesProvider = new SimpleMessagesProvider({
  'bookId.database.unique': 'Este livro já está emprestado a outro aluno.',
  'studentId.database.unique': 'Este aluno já possui um livro emprestado.',
})

/**
 * Validator to validate the payload when creating
 * a new lend.
 */
export const createLendValidator = vine.compile(
  vine.object({
    studentId: vine.string().unique(async (db, value) => {
      const student = await db
        .from('students')
        .where('id', value)
        .andWhere('on_lend', false)
        .first()

      return !!student
    }),
    bookId: vine.string().unique(async (db, value) => {
      const book = await db.from('books').where('id', value).andWhere('is_available', true).first()

      return !!book
    }),
  })
)
