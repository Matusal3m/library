import LendsController from '#controllers/lends_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import Button from '~/components/ui/buttons/button'
import LoadingButton from '~/components/ui/buttons/loading-button'
import { SingleSelect } from '~/components/ui/selects/single-select'

export default function CreateLendForm({
  books,
  students,
}: InferPageProps<LendsController, 'create'>) {
  const { data, setData, post, processing, errors } = useForm({
    bookId: '',
    studentId: '',
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    post('/lends')
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Adicionar novo autor
      </h4>

      <SingleSelect
        label="Livro"
        placeholder="Selecione o livro"
        name="book_id"
        options={books}
        onChange={(vals) => setData('bookId', vals as string)}
        value={data.bookId}
        error={errors.bookId}
        search
      />

      <SingleSelect
        label="Aluno"
        placeholder="Selecione o aluno"
        name="student_id"
        options={students}
        onChange={(vals) => setData('studentId', vals as string)}
        value={data.studentId}
        error={errors.studentId}
        search
      />

      {processing ? (
        <LoadingButton label="Adicionando empréstimo..." />
      ) : (
        <Button label="Adicionar empréstimo" type="submit" />
      )}
    </form>
  )
}
