import { InferPageProps } from '@adonisjs/inertia/types'
import StudentsController from '#controllers/students_controller'
import { BookOpen, School, UserRound, Info, Phone, Mail } from 'lucide-react'
import { Link } from '@inertiajs/react'

export default function StudentShow({ student }: InferPageProps<StudentsController, 'show'>) {
    const lend = student.lend
    const hasLend = lend
    const ongoing = lend?.itsOngoing

    return (
        <div className="max-w-3xl mx-auto space-y-6 p-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 bg-white dark:bg-gray-900">
                <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-4">
                    <UserRound className="w-5 h-5" /> {student.name}
                </h2>

                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <strong>Email:</strong> {student.email}
                    </li>
                    <li className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <strong>Telefone:</strong> {student.phoneNumber}
                    </li>
                    <li className="flex items-center gap-2">
                        <School className="w-4 h-4 text-gray-500" />
                        <span>
                            <strong>Turma:</strong> {student.classRoom.name}
                        </span>
                    </li>
                    <li className="flex items-center gap-2">
                        <strong>Matrícula:</strong> {student.enrollmentNumber}
                    </li>
                </ul>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 bg-white dark:bg-gray-900">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-4">
                    <BookOpen className="w-5 h-5" />
                    {ongoing
                        ? 'Empréstimo Atual'
                        : hasLend
                          ? 'Último Empréstimo'
                          : 'Sem empréstimos'}
                </h3>

                {!hasLend && (
                    <div className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Nenhum empréstimo registrado para este aluno.
                    </div>
                )}

                {hasLend && (
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li>
                            <strong>Livro: </strong>
                            <Link
                                href={`/books/${lend.book.id}`}
                                className="underline hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                {lend.book.title}
                            </Link>
                        </li>
                        <li>
                            <strong>Código Seduc:</strong> {lend.book.seducCode}
                        </li>
                        <li>
                            <strong>Retirado em:</strong> {lend.createdAt}
                        </li>
                        <li>
                            <strong>{ongoing ? 'Devolver até:' : 'Devolvido em:'}</strong>{' '}
                            {ongoing ? lend.endsAt : lend.returnedAt}
                        </li>

                        {lend.wasExtended && (
                            <li>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-full font-medium">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    Empréstimo prorrogado
                                </span>
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    )
}
