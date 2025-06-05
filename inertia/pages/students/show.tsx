import { InferPageProps } from '@adonisjs/inertia/types'
import StudentsController from '#controllers/students_controller'
import {
    School,
    UserRound,
    Phone,
    Mail,
    Clock3,
    BookOpen,
    CheckCircle2,
    XCircle,
} from 'lucide-react'

export default function StudentShow({
    student,
    lends,
}: InferPageProps<StudentsController, 'show'>) {
    const ongoingLend = lends.find((l) => l.itsOngoing)

    return (
        <div className="max-w-3xl mx-auto space-y-6 p-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 bg-white dark:bg-gray-900">
                <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-4">
                    <UserRound className="w-5 h-5" /> {student.name}
                </h2>

                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <strong>Email:</strong>{' '}
                        {student.email ? (
                            student.email
                        ) : (
                            <span className="italic text-gray-500">Não informado</span>
                        )}
                    </li>
                    <li className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <strong>Telefone:</strong>{' '}
                        {student.phoneNumber ? (
                            student.phoneNumber
                        ) : (
                            <span className="italic text-gray-500">Não informado</span>
                        )}
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

            <div className="border border-yellow-300 dark:border-yellow-700 rounded-xl shadow-md p-6 bg-white dark:bg-gray-900">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-yellow-700 dark:text-yellow-300 mb-4">
                    <Clock3 className="w-5 h-5" />
                    Empréstimo em andamento
                </h3>

                {!ongoingLend && (
                    <p className="text-sm text-gray-500">Nenhum livro em posse atualmente.</p>
                )}

                {ongoingLend && (
                    <ul className="space-y-4">
                        <li
                            key={ongoingLend.id}
                            className="border p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950"
                        >
                            <div className="text-lg font-medium text-yellow-800 dark:text-yellow-200">
                                {ongoingLend.bookReplica.book.title}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                <div>
                                    <strong>Código da seduc:</strong>{' '}
                                    {ongoingLend.bookReplica.seducCode}
                                </div>
                                <div>
                                    <strong>Início:</strong> {ongoingLend.createdAt}
                                </div>
                                <div>
                                    <strong>Devolução prevista:</strong> {ongoingLend.endsAt}
                                </div>
                                {ongoingLend.wasExtended && (
                                    <span className="text-yellow-600 italic">Estendido</span>
                                )}
                            </div>
                        </li>
                    </ul>
                )}
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 bg-white dark:bg-gray-900">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-4">
                    <BookOpen className="w-5 h-5" />
                    Histórico de empréstimos
                </h3>

                {lends.length === 0 ? (
                    <p className="text-sm text-gray-500">Nenhum empréstimo registrado.</p>
                ) : (
                    <ul className="space-y-4">
                        {lends.map((lend) => (
                            <li
                                key={lend.id}
                                className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                            >
                                <div className="text-lg font-medium text-gray-800 dark:text-white">
                                    {lend.bookReplica.book.title}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    <div>
                                        <strong>Código da seduc:</strong>{' '}
                                        {lend.bookReplica.seducCode}
                                    </div>
                                    <div>
                                        <strong>Início:</strong> {lend.createdAt}
                                    </div>
                                    <div>
                                        <strong>Devolução prevista:</strong> {lend.endsAt}
                                    </div>
                                    {lend.returnedAt && (
                                        <div>
                                            <strong>Devolvido em: {lend.returnedAt}</strong>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    {lend.wasExtended && (
                                        <span className="mr-2 inline-flex items-center gap-1">
                                            <Clock3 className="w-3 h-3" />
                                            Estendido
                                        </span>
                                    )}
                                    {lend.returnedAt ? (
                                        <span className="inline-flex items-center gap-1 text-green-600">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Concluído
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 text-yellow-600">
                                            <XCircle className="w-3 h-3" />
                                            Em aberto
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
