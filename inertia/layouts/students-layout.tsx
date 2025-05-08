import Header from '~/components/ui/header/header'
import { HeaderItemProps } from '~/components/ui/header/header-item'
import MainLayout from './main-layout'

export default function StudentsLayout({ children }: { children: React.ReactNode }) {
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
