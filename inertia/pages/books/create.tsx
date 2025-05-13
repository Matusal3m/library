import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { InferPageProps } from '@adonisjs/inertia/types'
import BooksController from '#controllers/books_controller'
import Button from '~/components/ui/buttons/button'
import LoadingButton from '~/components/ui/buttons/loading-button'
import FloatingInput from '~/components/ui/inputs/floating-input'
import MultiSelect from '~/components/ui/selects/multi-select'
import BooksLayout from '~/layouts/books-layout'

export default function CreateBookForm({
  authors,
  genres,
}: InferPageProps<BooksController, 'create'>) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    quantity: '',
    seducCode: '',
    authorsIds: [] as any[],
    genresIds: [] as any[],
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    post('/books')
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Adicionar novo livro
      </h4>

      <FloatingInput
        label="Título do livro"
        name="title"
        value={data.title}
        onChange={(e) => setData('title', e.target.value)}
        error={errors.title}
      />

      <FloatingInput
        label="Quantidade"
        name="quantity"
        type="number"
        value={data.quantity}
        onChange={(e) => setData('quantity', e.target.value)}
        error={errors.quantity}
      />

      <FloatingInput
        label="Código SEDUC"
        name="seducCode"
        value={data.seducCode}
        onChange={(e) => setData('seducCode', e.target.value)}
        error={errors.seducCode}
      />

      <MultiSelect
        label="Autores"
        name="authorsIds"
        options={authors}
        value={data.authorsIds}
        onChange={(vals) => setData('authorsIds', vals)}
        error={errors.authorsIds}
      />

      <MultiSelect
        label="Gêneros"
        name="genres"
        options={genres}
        value={data.genresIds}
        onChange={(vals) => setData('genresIds', vals)}
        error={errors.genresIds}
      />

      <div className="mt-6 text-center">
        {processing ? (
          <>
            <LoadingButton label="Salvando..." />
          </>
        ) : (
          <Button label="Salvar Livro" type="submit" />
        )}
      </div>
    </form>
  )
}
