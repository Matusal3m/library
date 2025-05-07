import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { Button, LoadingButton } from '~/components/ui/buttons'
import { FloatingInput } from '~/components/ui/inputs'

export default function CreateGenreForm() {
  const { data, setData, post, processing } = useForm({
    name: '',
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    post('/genres')
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Adicionar novo gênero literário
      </h4>
      <FloatingInput
        label="Nome do gênero literário"
        name="genre_name"
        onChange={(e) => setData('name', e.target.value)}
        value={data.name}
      />

      {processing ? (
        <LoadingButton label="Adicionando Gênero Literário..." />
      ) : (
        <Button label="Adicionar Gênero Literário" type="submit" />
      )}
    </form>
  )
}
