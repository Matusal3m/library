import { InferPageProps } from '@adonisjs/inertia/types'
import LendsController from '#controllers/lends_controller'
import { Link, router, useForm } from '@inertiajs/react'
import {
  BookIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  CheckIcon,
  RotateCwIcon,
  BookUser,
  FilterIcon,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import Checkbox from '~/components/ui/inputs/checkbox'
import { SingleSelect } from '~/components/ui/selects/single-select'
import Radio from '~/components/ui/inputs/radio'
import Button from '~/components/ui/buttons/buttons'
import { useState } from 'react'
import MultiSelect from '~/components/ui/selects/multi-select'

export default function LendsIndex({
  lends,
  classRooms,
}: InferPageProps<LendsController, 'index'>) {
  const [showFilters, setShowFilters] = useState(false)

  const resetFilters = () => {
    setData('where.itsLate', 'any')
    setData('where.wasExtended', 'any')
    setData('where.itsOngoing', 'any')
    setData('where.classRoomsIds', [])
    router.visit('/lends', { only: ['lends'] })
  }

  const partialReloadPage = () => router.reload({ only: ['lends'] })

  const { data, setData } = useForm({
    where: {
      itsOngoing: 'any' as boolean | 'any',
      wasExtended: 'any' as boolean | 'any',
      itsLate: 'any' as boolean | 'any',
      classRoomsIds: [] as string[],
    },
    orderBy: 'created_at',
    direction: 'asc',
  })

  const optionsToOrderBy = [
    { id: 'created_at', name: 'Criação' },
    { id: 'ends_at', name: 'Data de devolução' },
    { id: 'extended_at', name: 'Data de extensão' },
    { id: 'returned_at', name: 'Data de devolução' },
  ]

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.reload({ only: ['lends'], data, replace: true })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Empréstimos</h1>

      <div className="mb-4 flex justify-between items-center">
        <button
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          <FilterIcon className="w-4 h-4" />
          {showFilters ? 'Esconder Filtros' : 'Mostrar Filtros'}
          {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {showFilters && (
        <form onSubmit={submit} className="mb-8">
          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FilterIcon className="w-5 h-5" />
              Filtros
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col justify-start">
                    <h5 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                      Incluir
                    </h5>

                    <Checkbox
                      label="Prorrogados"
                      checked={data.where.wasExtended === 'any' ? false : data.where.wasExtended}
                      onChange={(value) => setData('where.wasExtended', value)}
                    />
                    <Checkbox
                      label="Atrasados"
                      checked={data.where.itsLate === 'any' ? false : data.where.itsLate}
                      onChange={(value) => setData('where.itsLate', value)}
                    />
                  </div>

                  <div className="flex flex-col justify-start">
                    <h5 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                      Apenas
                    </h5>
                    <Radio
                      label="Devolvido"
                      name="itsOngoing"
                      value={false}
                      data={data.where.itsOngoing}
                      onChange={(value) => setData('where.itsOngoing', value)}
                    />
                    <Radio
                      label="Em andamento"
                      name="itsOngoing"
                      value={true}
                      data={data.where.itsOngoing}
                      onChange={(value) => setData('where.itsOngoing', value)}
                    />
                    <Radio
                      label="Sem preferência"
                      name="itsOngoing"
                      value={'any'}
                      data={data.where.itsOngoing}
                      onChange={(value) => setData('where.itsOngoing', value)}
                    />
                  </div>

                  <div className="flex flex-col col-span-2">
                    <h5 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                      Turmas
                    </h5>
                    <MultiSelect
                      name="classRooms"
                      options={classRooms}
                      value={data.where.classRoomsIds}
                      onChange={(vals) => setData('where.classRoomsIds', vals)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <SingleSelect
                  options={optionsToOrderBy}
                  placeholder="Selecionar forma de ordenação"
                  name="order_by_fields"
                  onChange={(vals) => setData('orderBy', vals as string)}
                  value={data.orderBy}
                />

                <div className="flex flex-col">
                  <h5 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                    Ordem:
                  </h5>
                  <div className="flex gap-4">
                    <Radio
                      label="Crescente"
                      name="direction"
                      onChange={(value) => setData('direction', value as string)}
                      data={data.direction}
                      value="asc"
                    />
                    <Radio
                      label="Decrescente"
                      name="direction"
                      onChange={(value) => setData('direction', value as string)}
                      data={data.direction}
                      value="desc"
                    />
                  </div>

                  <div className="pt-4 flex justify-end items-center">
                    <Button type="submit" label="Filtrar" className="w-full sm:w-auto" />
                    <Button
                      type="button"
                      onClick={() => resetFilters()}
                      label="Limpar filtros"
                      className="w-full sm:w-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

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
                Empréstimo em: {lend.createdAt}
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                Devolução prevista: {lend.endsAt}
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2 text-xs">
              {lend.itsOngoing && !lend.returnedAt ? (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  Em andamento
                </span>
              ) : (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-1">
                  <CheckIcon className="w-3 h-3" />
                  Devolvido
                </span>
              )}
              {lend.wasExtended && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-1">
                  <RotateCwIcon className="w-3 h-3" />
                  Prorrogado
                </span>
              )}
            </div>

            <div className="my-2 flex">
              {lend.itsOngoing && !lend.wasExtended && (
                <Link
                  className="flex justify-center items-center  h-8 px-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  method="post"
                  href={`/lends/${lend.id}/extend`}
                  as="button"
                  onSuccess={() => partialReloadPage()}
                >
                  Estender Prazo
                </Link>
              )}
              {lend.itsOngoing && (
                <Link
                  className="flex justify-center items-center  h-8 px-4 text-white rounded-md bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors duration-200 focus:ring-4 font-medium rounded-lg text-sm me-2"
                  method="post"
                  href={`/lends/${lend.id}/finish`}
                  as="button"
                  onSuccess={() => partialReloadPage()}
                >
                  Finalizar
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
