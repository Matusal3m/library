import { useForm } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import StudentsController from '#controllers/students_controller'
import { Link } from '@inertiajs/react'
import { BookCheck, BookLock } from 'lucide-react'
import AvailableIndicator from '~/components/ui/indicators/available-indicator'
import UnavailableIndicator from '~/components/ui/indicators/unavailable-indicator'

export default function StudentsIndex({
    students,
    search,
    where,
}: InferPageProps<StudentsController, 'index'>) {
    const { data, setData, get } = useForm({
        search: search || '',
        where: where || 'name',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        get('/students', {
            preserveState: true,
            replace: true,
        })
    }

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Buscar estudantes..."
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                />
                <select
                    value={data.where}
                    onChange={(e) => setData('where', e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg"
                >
                    <option value="name">Nome</option>
                    <option value="email">Email</option>
                </select>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Buscar
                </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map((student) => (
                    <div
                        key={student.id}
                        className="block h-full p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 transition-all"
                    >
                        <Link href={`/students/${student.id}`}>
                            <h5 className="hover:underline mb-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {student.name}
                            </h5>
                        </Link>

                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <div>
                                <strong>Email:</strong>{' '}
                                <span>{student.email || 'Email não registrado'}</span>
                            </div>

                            <div>
                                <strong>Número de telefone:</strong>{' '}
                                <span>{student.phoneNumber || 'Número não registrado'}</span>
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
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                            >
                                Editar
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
