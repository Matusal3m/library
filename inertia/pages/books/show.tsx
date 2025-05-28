import { InferPageProps } from '@adonisjs/inertia/types'
import BooksController from '../../../app/controllers/books_controller'
import { Link, router, useForm } from '@inertiajs/react'
import { BookOpenIcon, PlusCircle, Trash2 } from 'lucide-react'
import AvailableIndicator from '~/components/ui/indicators/available-indicator'
import UnavailableIndicator from '~/components/ui/indicators/unavailable-indicator'
import { useState } from 'react'
import FloatingInput from '~/components/ui/inputs/floating-input'
import LendModal from '~/components/ui/dropdowns/lend-dropdown'

export default function ShowBook({ book, students }: InferPageProps<BooksController, 'show'>) {
    const [openNewReplica, setOpenNewReplica] = useState(false)
    const [selectedReplica, setSelectedReplica] = useState<(typeof book.replicas)[0] | null>(null)
    const { data, setData, post } = useForm({ seducCode: '' })

    const handleOpenNewReplica = () => {
        setData('seducCode', '')
        setOpenNewReplica((prev) => !prev)
    }

    const submitNewReplica = (e: React.FormEvent) => {
        e.preventDefault()
        post(`/books/${book.id}/replicas`, {
            onSuccess: () => setOpenNewReplica(false),
        })
    }

    const handleLendClick = (replica: (typeof book.replicas)[0]) => {
        if (!replica.isAvailable) return

        router.reload({ only: ['students'] })
        setSelectedReplica(replica)
    }

    const closeLendDropdown = () => setSelectedReplica(null)

    const handleDeleteReplica = (replicaId: string) => {
        if (confirm('Tem certeza que deseja excluir esta réplica?')) {
            router.delete(`/replicas/${replicaId}`)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {book.title}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <BookOpenIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span>
                            Quantidade de réplicas: <strong>{book.quantity}</strong>
                        </span>
                    </div>
                </div>
                <div className="relative">
                    <button
                        onClick={handleOpenNewReplica}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                    >
                        <PlusCircle className="w-4 h-4" /> Nova Réplica
                    </button>

                    {openNewReplica && (
                        <div className="absolute">
                            <div className="rig-0 mt-2 w-64 z-10">
                                <form
                                    onSubmit={submitNewReplica}
                                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
                                >
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => setOpenNewReplica(false)}
                                            className="text-gray-500"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <FloatingInput
                                        label="Código da Seduc"
                                        name="seduc_code"
                                        onChange={(e) => setData('seducCode', e.target.value)}
                                        value={data.seducCode}
                                        className="w-full mb-3"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors text-sm"
                                    >
                                        Adicionar Réplica
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <section className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Autoria
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {book.authors.map((author) => (
                            <Link
                                key={author.id}
                                href={`/authors/${author.id}`}
                                className="underline dark:text-white hover:text-blue-800"
                            >
                                {author.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Gêneros
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {book.genres.map((genre) => (
                            <Link
                                key={genre.id}
                                href={`/genres/${genre.id}`}
                                className="underline dark:text-white hover:text-blue-800"
                            >
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                    <table className="w-full overflow-y-auto">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Cod. da Seduc
                                </th>
                                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Disponibilidade
                                </th>
                                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {book.replicas.map((replica) => (
                                <tr
                                    key={replica.id}
                                    className="relative hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <td className="px-4 py-3 text-blue-700 dark:text-blue-300 font-mono hover:underline">
                                        <Link href={`/book-replicas/${replica.id}`}>
                                            {replica.seducCode}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {replica.isAvailable ? (
                                            <AvailableIndicator message="Disponível" />
                                        ) : (
                                            <UnavailableIndicator message="Indisponível" />
                                        )}
                                    </td>
                                    <td className="px-4 py-3 flex justify-center items-center gap-4 ">
                                        <div className="">
                                            <button
                                                onClick={() => handleLendClick(replica)}
                                                disabled={!replica.isAvailable}
                                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm
                          ${
                              replica.isAvailable
                                  ? 'text-green-700 bg-green-100 hover:bg-green-200 dark:text-green-300 dark:bg-green-950 dark:hover:bg-green-800'
                                  : 'text-gray-400 bg-gray-100 dark:text-gray-500 dark:bg-gray-800 cursor-not-allowed'
                          }`}
                                            >
                                                {replica.isAvailable
                                                    ? 'Emprestar'
                                                    : 'Já emprestado'}
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => handleDeleteReplica(replica.id)}
                                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                            title="Excluir réplica"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {selectedReplica && (
                        <LendModal
                            isOpen={true}
                            onClose={closeLendDropdown}
                            students={students || []}
                            replica={selectedReplica}
                        />
                    )}
                </div>
            </section>
        </div>
    )
}
