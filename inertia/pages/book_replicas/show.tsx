import { InferPageProps } from '@adonisjs/inertia/types'
import BookReplicasController from '#controllers/book_replicas_controller'

export default function ShowBookReplica({
    bookReplica,
    studentsHistory,
}: InferPageProps<BookReplicasController, 'show'>) {
    return <code className="text-white">{JSON.stringify({ bookReplica, studentsHistory })}</code>
}
