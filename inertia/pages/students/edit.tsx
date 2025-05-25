import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { InferPageProps } from '@adonisjs/inertia/types'
import StudentsController from '#controllers/students_controller'
import Button from '~/components/ui/buttons/button'
import LoadingButton from '~/components/ui/buttons/loading-button'
import FloatingInput from '~/components/ui/inputs/floating-input'
import PhoneInput from '~/components/ui/inputs/phone-input'
import { SingleSelect } from '~/components/ui/selects/single-select'

export default function EditStudentForm({
    student,
    classRooms,
}: InferPageProps<StudentsController, 'edit'>) {
    const { data, setData, put, processing, errors } = useForm({
        name: student.name,
        enrollmentNumber: student.enrollmentNumber,
        classRoomId: student.classRoomId,
        email: student.email,
        phoneNumber: student.phoneNumber,
    })

    function submit(e: FormEvent) {
        e.preventDefault()
        put(`/students/${student.id}`)
    }

    return (
        <form
            onSubmit={submit}
            className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
        >
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Registrar aluno
            </h4>

            <FloatingInput
                label="Nome do aluno"
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                error={errors.name}
            />

            <FloatingInput
                label="Número de matrícula"
                name="enrollment_number"
                type="number"
                value={data.enrollmentNumber}
                onChange={(e) => setData('enrollmentNumber', e.target.value)}
                error={errors.enrollmentNumber}
            />

            <FloatingInput
                label="Email"
                name="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                error={errors.email}
            />

            <PhoneInput
                label="Número de telefone"
                name="phone_number"
                value={data.phoneNumber}
                onChange={(e) => setData('phoneNumber', e.target.value)}
                error={errors.phoneNumber}
            />

            <SingleSelect
                label="Turma"
                placeholder="Selecione uma turma"
                name="class_rooms_ids"
                options={classRooms}
                value={data.classRoomId}
                onChange={(vals) => setData('classRoomId', vals as string)}
                error={errors.classRoomId}
            />

            <div className="mt-6 text-center">
                {processing ? (
                    <>
                        <LoadingButton label="Registrando..." />
                    </>
                ) : (
                    <Button label="Registrar aluno" type="submit" />
                )}
            </div>
        </form>
    )
}
