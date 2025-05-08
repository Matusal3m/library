import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import Button from '~/components/ui/buttons/buttons'
import LoadingButton from '~/components/ui/buttons/loading-button'
import FloatingInput from '~/components/ui/inputs/floating-input'
import AuthorsLayout from '~/layouts/authors-layout'

export default function EditAuthor({ author }: { author: { id: string; name: string } }) {
  const { data, setData, put, processing, errors } = useForm({
    name: author.name,
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    put(`/authors/${author.id}`)
  }

  return (
    <form className="max-w-md mx-auto" onSubmit={submit}>
      <FloatingInput
        label="Nome do Autor"
        name="author_name"
        onChange={(e) => setData('name', e.target.value)}
        value={data.name}
      />
      {errors.name && <div>{errors.name}</div>}
      {processing ? (
        <LoadingButton label="Enviando..." />
      ) : (
        <Button type="submit" label="Atualizar autor(a)" />
      )}
    </form>
  )
}
