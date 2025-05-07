import { Header, HeaderItemProps } from '~/components/ui/header'
import MainLayout from './main-layout'

export function StudentsLayout({ children }: { children: React.ReactNode }) {
  const items: HeaderItemProps[] = [
    {
      href: '/students',
      label: 'Todos os alunos',
    },
    {
      href: '/students/create',
      label: 'Adicionar novo aluno',
    },
  ]

  return (
    <MainLayout>
      <Header items={items} />
      {children}
    </MainLayout>
  )
}
