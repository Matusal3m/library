import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider(
    {
        'required': 'O campo {{ field }} é obrigatório',
        'positive': 'O número de matrícula deve ser positivo',
        'number': 'O campo {{ field }} deve ser um número',
        'string': 'O campo {{ field }} deve ser um texto',
        'unique': 'O valor informado para {{ field }} já está em uso',
        'regex': 'O formato do {{ field }} é inválido',

        'enrollmentNumber.required': 'O número de matrícula é obrigatório',
        'enrollmentNumber.positive': 'O número de matrícula deve ser positivo',
        'enrollmentNumber.unique': 'Este número de matrícula já está em uso',

        'email.unique': 'Este e-mail já está cadastrado',
        'email.string': 'O e-mail deve ser um texto válido',

        'phoneNumber.regex': 'O telefone deve estar no formato válido (ex: (85) 99999-9999)',

        'classRoomId.required': 'A turma é obrigatória',
        'classRoomId.string': 'O ID da turma deve ser um texto',

        'name.required': 'O nome do aluno é obrigatório',
        'name.string': 'O nome deve ser um texto válido',

        'database.unique': 'Este {{ field }} já está cadastrado no sistema',
    },
    {
        name: 'Nome do aluno',
        enrollmentNumber: 'Número de matrícula',
        email: 'E-mail',
        phoneNumber: 'Telefone',
        classRoomId: 'Turma',
    }
)

/**
 * Validator to validate the payload when creating
 * a new student.
 */
export const createStudentValidator = vine.compile(
    vine.object({
        name: vine.string(),
        enrollmentNumber: vine.number().positive().unique({
            table: 'students',
            column: 'enrollment_number',
        }),
        email: vine
            .string()
            .unique({
                table: 'students',
                column: 'email',
            })
            .optional(),
        phoneNumber: vine
            .string()
            .regex(/^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/)
            .unique({
                table: 'students',
                column: 'phone_number',
            })
            .optional(),
        classRoomId: vine.string(),
    })
)

/**
 * Validator to validate the payload when updating
 * an existing student.
 */
export const updateStudentValidator = vine.compile(
    vine.object({
        name: vine.string(),

        enrollmentNumber: vine
            .number()
            .positive()
            .unique(async (db, value, field) => {
                const exists = await db
                    .from('students')
                    .where('enrollment_number', value)
                    .andWhereNot('id', field.meta.userId)
                    .first()

                return !exists
            }),

        email: vine.string().unique(async (db, value, field) => {
            const exists = await db
                .from('students')
                .where('email', value)
                .andWhereNot('id', field.meta.userId)
                .first()

            return !exists
        }),

        phoneNumber: vine
            .string()
            .regex(/^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/)
            .unique(async (db, value, field) => {
                const exists = await db
                    .from('students')
                    .where('phone_number', value)
                    .andWhereNot('id', field.meta.userId)
                    .first()

                return !exists
            }),

        classRoomId: vine.string(),
    })
)
