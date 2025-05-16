import { InferPageProps } from '@adonisjs/inertia/types'
import StudentsController from '#controllers/students_controller'
import { Link } from '@inertiajs/react'
import { BookCheck, BookLock } from 'lucide-react'
import AvailableIndicator from '~/components/ui/indicators/available-indicator'
import UnavailableIndicator from '~/components/ui/indicators/unavailable-indicator'

export default function StudentsIndex({ students }: InferPageProps<StudentsController, 'index'>) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {students.map((student) => (
        <div
          key={student.id}
          className="block h-full p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 transition-all"
        >
          <Link href={`/students/${student.id}`} key={student.id}>
            <h5 className="hover:underline  mb-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {student.name}
            </h5>
          </Link>

          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <strong>Email:</strong> <span key={student.id + '_email'}>{student.email}</span>
            </div>

            <div>
              <strong>Número de telefone:</strong>{' '}
              <span className="flex flex-wrap gap-1">
                <span key={student.id + '_phoneNumber'}>{student.phoneNumber}</span>
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-1 items-center">
                {student.onLend ? (
                  <>
                    <UnavailableIndicator message="Já está com um livro" />
                    <BookLock color="red" size={20} />
                  </>
                ) : (
                  <>
                    <AvailableIndicator message="Pode alugar" />
                    <BookCheck color="green" size={20} />
                  </>
                )}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Número de matrícula: {student.enrollmentNumber}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Link
              href={`/students/${student.id}/edit`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Editar
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
