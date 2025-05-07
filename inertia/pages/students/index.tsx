import { InferPageProps } from '@adonisjs/inertia/types'
import StudentsController from '#controllers/users_controller'

export default function StudentsIndex({ students }: InferPageProps<StudentsController, 'index'>) {
  return (
    <div>
      {students.map((student) => (
        <code>{JSON.stringify(student)}</code>
      ))}
    </div>
  )
}
