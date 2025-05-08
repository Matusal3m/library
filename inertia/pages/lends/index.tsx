import { InferPageProps } from '@adonisjs/inertia/types'
import LendsController from '#controllers/lends_controller'
import { Link } from '@inertiajs/react'
import {
  BookIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  CheckIcon,
  RotateCwIcon,
  BookUser,
} from 'lucide-react'

export default function LendsIndex({ lends }: InferPageProps<LendsController, 'index'>) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Empréstimos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {lends.map((lend) => (
          <div
            key={lend.id}
            className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-900 dark:border-gray-700"
          >
            <Link href={`/books/${lend.book.id}`} className="mb-3">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 hover:underline">
                <BookIcon className="w-4 h-4" />
                {lend.book.title}
              </h2>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Código da Seduc: {lend.book.seducCode}
              </span>
            </Link>

            <Link
              href={`/students/${lend.student.id}`}
              className="mb-3 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 hover:underline"
            >
              <UserIcon className="w-4 h-4 text-gray-500" />
              {lend.student.name}
            </Link>

            <div className="mb-3 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <BookUser className="w-4 h-4 text-gray-500" />
              {lend.student.enrollmentNumber}
            </div>

            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Empréstimo em: {new Date(lend.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                Devolução prevista: {new Date(lend.endsAt).toLocaleDateString()}
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2 text-xs">
              {!!lend.itsOngoing && !lend.returnedAt ? (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  Em andamento
                </span>
              ) : (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-1">
                  <CheckIcon className="w-3 h-3" />
                  Devolvido
                </span>
              )}
              {!!lend.wasExtended && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-1">
                  <RotateCwIcon className="w-3 h-3" />
                  Prorrogado
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
