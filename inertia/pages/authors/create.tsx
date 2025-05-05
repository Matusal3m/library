import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { Button, LoadingButton } from '~/components/ui/buttons'
import { FloatingInput } from '~/components/ui/inputs'
import MainLayout from '~/layouts/main-layout'

export default function CreateAuthorForm() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    post('/authors')
  }

  return (
    <form onSubmit={submit}>
      <div className="w-xl p-7">
        <FloatingInput
          label="Nome do autor"
          name="author_name"
          onChange={(e) => setData('name', e.target.value)}
          value={data.name}
        />
      </div>
      {errors.name && <div>{errors.name}</div>}

      {processing ? (
        <LoadingButton label="Adicionando Autor(a)..." />
      ) : (
        <Button label="Adicionar Autor(a)" type="submit" />
      )}
    </form>
  )
}

CreateAuthorForm.layout = (page: any) => <MainLayout children={page} />
