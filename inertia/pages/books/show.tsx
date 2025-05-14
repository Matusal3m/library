import { InferPageProps } from '@adonisjs/inertia/types'
import BooksController from '../../../app/controllers/books_controller'
import { Link, router, useForm } from '@inertiajs/react'
import { BookOpenIcon, PlusCircle, Trash2 } from 'lucide-react'
import AvailableIndicator from '~/components/ui/indicators/available-indicator'
import UnavailableIndicator from '~/components/ui/indicators/unavailable-indicator'
import { useState } from 'react'
import FloatingInput from '~/components/ui/inputs/floating-input'

export default function ShowBook({ book }: InferPageProps<BooksController, 'show'>) {
  const [open, setOpen] = useState(false)

  const { data, setData, post } = useForm({
    seducCode: '',
  })

  const handleOpen = () => {
    setData('seducCode', '')
    setOpen(!open)
  }

  const handleDeleteReplica = (replicaId: string) => {
    if (confirm('Tem certeza que deseja excluir esta réplica?')) {
      router.delete(`/replicas/${replicaId}`)
    }
  }

  const submit = () => {
    post(`/books/${book.id}/replicas`)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <header className="flex gap-4 space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{book.title}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <BookOpenIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span>
            Quantidade de réplicas: <strong>{book.quantity}</strong>
          </span>
        </div>
      </header>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Autoria</h2>
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
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Gêneros</h2>
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

        <div>
          <div className="flex justify-between items-center mb-2 relative">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Réplicas</h2>

            <div className="relative">
              <button
                onClick={handleOpen}
                className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Nova Réplica</span>
              </button>

              {open && (
                <div className="absolute top-full right-0 mt-2 w-64 z-10">
                  <form
                    onSubmit={submit}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="relative">
                      <div onClick={() => setOpen(false)} className="cursor-pointer p-2">
                        <div className="absolute right-3 w-4 h-4 bg-white dark:bg-gray-800 border-t border-l border-gray-200 dark:border-gray-700 rotate-45" />
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
                        className="w-full py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded-md 
                  transition-colors text-sm"
                      >
                        Adicionar Réplica
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  Cod. da Seduc
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  Disponibilidade
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {book.replicas.map((replica) => (
                <tr
                  key={replica.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3 text-blue-700 dark:text-blue-300 font-mono">
                    {replica.seducCode}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {replica.isAvailable ? (
                      <AvailableIndicator message="Disponível" />
                    ) : (
                      <UnavailableIndicator message="Indisponível" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
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
        </div>
      </section>
    </div>
  )
}
