import vine, { SimpleMessagesProvider } from '@vinejs/vine'

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
        bookReplicaId: vine.string().unique(async (db, value) => {
            const bookReplica = await db
                .from('book_replicas')
                .where('id', value)
                .andWhere('is_available', true)
                .first()

            return !!bookReplica
        }),
    })
)

export const lendFilterValidator = vine.compile(
    vine.object({
        where: vine
            .object({
                wasExtended: vine.unionOfTypes([vine.boolean(), vine.string()]),
                itsOngoing: vine.unionOfTypes([vine.boolean(), vine.string()]),
                itsLate: vine.unionOfTypes([vine.boolean(), vine.string()]),
                classRoomsIds: vine.array(vine.string()).optional(),
            })
            .optional(),
        orderBy: vine
            .enum(['created_at', 'ends_at', 'extended_at', 'returned_at', 'students.name'])
            .optional(),
        direction: vine.enum(['asc', 'desc']).optional(),
    })
)
