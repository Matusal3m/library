import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider(
  {
    required: 'O campo {{ field }} deve ser preenchido',
    positive: 'O número de matrícula deve ser positivo',
  },
  {
    name: 'Nome do aluno',
    enrollmentNumber: 'Número de matrícula',
    email: 'Email',
    phoneNumber: 'Número de telefone',
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
    enrollmentNumber: vine.number().positive(),
    email: vine.string(),
    phoneNumber: vine.string(),
    classRoomId: vine.string(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing student.
 */
export const updateStudentValidator = vine.compile(vine.object({}))
