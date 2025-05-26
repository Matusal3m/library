import { useForm } from '@inertiajs/react'
import { SingleSelect } from '../selects/single-select'

type LendModalProps = {
    isOpen: boolean
    onClose: () => void
    students: { id: string; name: string }[]
    replica: { id: string; seducCode: string }
}

export default function LendModal({ isOpen, onClose, students, replica }: LendModalProps) {
    const { data, setData, post, reset } = useForm({
        studentId: '',
        bookReplicaId: replica.id,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(`/lends`, {
            onSuccess: () => {
                reset()
                onClose()
            },
        })
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl z-50"
                onClick={(e) => e.stopPropagation()}
                onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        onClose()
                    }
                }}
                tabIndex={0}
            >
                <h2 className="text-lg w-full font-semibold text-gray-800 dark:text-white mb-4">
                    Empréstimo
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <SingleSelect
                        name="studentId"
                        label="Aluno"
                        options={students}
                        value={data.studentId}
                        onChange={(value) => setData('studentId', value as string)}
                        placeholder="Escolher aluno"
                        search
                    />

                    <div className="flex justify-between items-center pt-2 gap-4">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            Cód. Seduc: {replica.seducCode}
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
