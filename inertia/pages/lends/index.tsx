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
    PlusIcon,
} from 'lucide-react'
import { SingleSelect } from '~/components/ui/selects/single-select'
import Radio from '~/components/ui/inputs/radio'
import Button from '~/components/ui/buttons/button'
import { useState } from 'react'
import MultiSelect from '~/components/ui/selects/multi-select'

export default function LendsIndex({
    lends,
    classRooms,
    filters,
}: InferPageProps<LendsController, 'index'>) {
    const { data, setData, get } = useForm({
        where: {
            itsOngoing: filters?.where?.itsOngoing || 'any',
            wasExtended: filters?.where?.wasExtended || 'any',
            itsLate: filters?.where?.itsLate || 'any',
            classRoomsIds: filters?.where?.classRoomsIds || ([] as string[]),
        },
        searchBy: filters?.searchBy || 'name',
        search: filters?.search || '',
        orderBy: filters?.orderBy || 'created_at',
        direction: filters?.direction || 'asc',
    })
    const [showFilters, setShowFilters] = useState(false)

    const resetFilters = () => {
        setData('where.itsLate', 'any')
        setData('where.wasExtended', 'any')
        setData('where.itsOngoing', 'any')
        setData('where.classRoomsIds', [])
        router.visit('/lends', { only: ['lends'] })
    }

    const handleCreateDocument = () => {
        const params = new URLSearchParams()

        params.append('itsLate', String(data.where.itsLate))
        params.append('wasExtended', String(data.where.wasExtended))
        params.append('itsOngoing', String(data.where.itsOngoing))

        data.where.classRoomsIds.forEach((id) => params.append('classRoomsIds[]', id))

        const url = `/lends/document?${params.toString()}`
        window.location.href = url
    }

    const partialReloadPage = () => router.reload({ only: ['lends'] })

    const extensionOptions = [
        { id: 'any', name: 'Qualquer' },
        { id: 'true', name: 'Prorrogados' },
        { id: 'false', name: 'Não prorrogados' },
    ]

    const lateOptions = [
        { id: 'any', name: 'Qualquer' },
        { id: 'true', name: 'Atrasados' },
        { id: 'false', name: 'Não atrasados' },
    ]

    const optionsToOrderBy = [
        { id: 'created_at', name: 'Data de aluguel' },
        { id: 'ends_at', name: 'Data de devolução prevista' },
        { id: 'extended_at', name: 'Data de extensão' },
        { id: 'returned_at', name: 'Data em que foi entreque' },
        { id: 'students.name', name: 'Nome do aluno' },
    ]

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(data)
        get('/lends', {
            preserveState: true,
            replace: true,
        })
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
                    {showFilters ? (
                        <ChevronUp className="w-4 h-4" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                </button>
                <button
                    type="button"
                    onClick={handleCreateDocument}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition"
                >
                    <PlusIcon className="w-4 h-4" />
                    Criar Documento baseado nos filtros
                </button>
            </div>

            <form onSubmit={submit} className="mb-2">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg"
                        />
                        <select
                            value={data.searchBy}
                            onChange={(e) => setData('searchBy', e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="student">Estudante</option>
                            <option value="book">Livro</option>
                        </select>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Buscar
                        </button>
                    </div>
            </form>

            {showFilters && (
                <form onSubmit={submit} className="mb-8">
                    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <FilterIcon className="w-5 h-5" />
                            Filtros
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-4">
                                <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    Empréstimo
                                </h5>
                                <Radio
                                    label="Em andamento"
                                    name="itsOngoing"
                                    value={true}
                                    data={data.where.itsOngoing}
                                    onChange={(value) => setData('where.itsOngoing', value)}
                                />
                                <Radio
                                    label="Devolvido"
                                    name="itsOngoing"
                                    value={false}
                                    data={data.where.itsOngoing}
                                    onChange={(value) => setData('where.itsOngoing', value)}
                                />
                                <Radio
                                    label="Sem preferência"
                                    name="itsOngoing"
                                    value="any"
                                    data={data.where.itsOngoing}
                                    onChange={(value) => setData('where.itsOngoing', value)}
                                />
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                        Prorrogação
                                    </h5>
                                    <SingleSelect
                                        options={extensionOptions}
                                        value={data.where.wasExtended as string}
                                        onChange={(v) => setData('where.wasExtended', v as string)}
                                        name="was_extended"
                                    />
                                </div>
                                <div>
                                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                        Status de Atraso
                                    </h5>
                                    <SingleSelect
                                        options={lateOptions}
                                        value={data.where.itsLate as string}
                                        onChange={(v) => setData('where.itsLate', v as string)}
                                        name="its_late"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                        Turmas
                                    </h5>
                                    <MultiSelect
                                        name="classRooms"
                                        options={classRooms as any}
                                        value={data.where.classRoomsIds}
                                        onChange={(vals) => setData('where.classRoomsIds', vals)}
                                    />
                                </div>
                                <div>
                                    <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                        Ordenação
                                    </h5>
                                    <SingleSelect
                                        options={optionsToOrderBy}
                                        placeholder="Campo"
                                        name="order_by_fields"
                                        value={data.orderBy}
                                        onChange={(v) => setData('orderBy', v as any)}
                                    />
                                    <div className="mt-2 flex items-center gap-4">
                                        <Radio
                                            label="Crescente"
                                            name="direction"
                                            value="asc"
                                            data={data.direction}
                                            onChange={(v) => setData('direction', v as any)}
                                        />
                                        <Radio
                                            label="Decrescente"
                                            name="direction"
                                            value="desc"
                                            data={data.direction}
                                            onChange={(v) => setData('direction', v as any)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <Button
                                type="button"
                                onClick={resetFilters}
                                label="Limpar filtros"
                                className="sm:w-auto"
                            />
                            <Button
                                type="submit"
                                label="Filtrar"
                                className="sm:w-auto bg-green-600"
                            />
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
                        <Link href={`.bookReplica./${lend.bookReplica.id}`} className="mb-3">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 hover:underline">
                                <BookIcon className="w-4 h-4" />
                                {lend.bookReplica.book.title}
                            </h2>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                Código da Seduc: {lend.bookReplica.seducCode}
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
