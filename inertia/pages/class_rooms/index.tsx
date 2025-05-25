import { InferPageProps } from '@adonisjs/inertia/types'
import ClassRoomsController from '#controllers/class_rooms_controller'
import { UsersIcon } from 'lucide-react'

export default function IndexClassRooms({
    classRooms,
}: InferPageProps<ClassRoomsController, 'index'>) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Turmas</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {classRooms.map((classRoom) => (
                    <div
                        key={classRoom.id}
                        className="block p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 transition-all"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            {classRoom.name}
                        </h2>

                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <UsersIcon className="w-4 h-4" />
                            <span>
                                {classRoom.studentsCount} aluno
                                {classRoom.studentsCount === 1 ? '' : 's'} registrado
                                {classRoom.studentsCount === 1 ? '' : 's'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
