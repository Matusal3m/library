import BookReplicasController from '#controllers/book_replicas_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'
import { BookOpenIcon, ArrowLeft } from 'lucide-react'

export default function BookReplicaPage({
    bookReplica,
    studentsHistory,
    book,
}: InferPageProps<BookReplicasController, 'show'>) {
    console.log({
        bookReplica,
        studentsHistory,
        book,
    })
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <header className="flex items-center gap-4">
                <Link
                    href={`/books/${book.id}`}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Réplica do Livro
                </h1>
            </header>

            <section className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <BookOpenIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span>
                        Título do livro:{' '}
                        <strong className="text-blue-700 dark:text-blue-300">{book.title}</strong>
                    </span>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                    Código da Seduc:{' '}
                    <strong className="font-mono text-gray-800 dark:text-white">
                        {bookReplica.seducCode}
                    </strong>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                    Disponibilidade:{' '}
                    <span className={bookReplica.isAvailable ? 'text-green-600' : 'text-red-600'}>
                        {bookReplica.isAvailable ? 'Disponível' : 'Emprestado'}
                    </span>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Histórico de empréstimos
                </h2>

                {studentsHistory.length === 0 ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Nenhum aluno pegou esse livro até agora.
                    </p>
                ) : (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300 border-b">
                                        Aluno
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300 border-b">
                                        Matrícula
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300 border-b">
                                        Turma
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300 border-b">
                                        Pedido em
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300 border-b">
                                        Retornado em
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {studentsHistory.map((student) => (
                                    <tr
                                        key={student.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <td className="px-4 py-3 text-blue-700 dark:text-blue-300 hover:underline">
                                            <Link href={`/students/${student.id}`}>
                                                {student.name}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-gray-900 dark:text-white">
                                            {student.enrollmentNumber}
                                        </td>
                                        <td className="px-4 py-3 text-gray-900 dark:text-white">
                                            {student.classRoom}
                                        </td>
                                        <td className="px-4 py-3 text-gray-900 dark:text-white">
                                            {new Date(student.loanAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 text-gray-900 dark:text-white">
                                            {student.returnedAt
                                                ? new Date(student.returnedAt).toLocaleDateString()
                                                : 'Não devolvido'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    )
}
