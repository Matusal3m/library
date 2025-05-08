import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import Button from '~/components/ui/buttons/buttons'
import LoadingButton from '~/components/ui/buttons/loading-button'
import FloatingInput from '~/components/ui/inputs/floating-input'

export default function CreateAuthorForm() {
  const { data, setData, post, processing } = useForm({
    name: '',
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    post('/authors')
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Adicionar novo autor
      </h4>
      <FloatingInput
        label="Nome do autor"
        name="author_name"
        onChange={(e) => setData('name', e.target.value)}
        value={data.name}
      />

      {processing ? (
        <LoadingButton label="Adicionando Autor(a)..." />
      ) : (
        <Button label="Adicionar Autor(a)" type="submit" />
      )}
    </form>
  )
}
