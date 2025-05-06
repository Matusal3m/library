import { Header, HeaderItemProps } from '~/components/ui/header'
import MainLayout from './main-layout'

export function AuthorsLayout({ children }: { children: React.ReactNode }) {
  const items: HeaderItemProps[] = [
    {
      href: '/authors',
      label: 'Todos os autores',
    },
    {
      href: '/authors/create',
      label: 'Criar autor',
    },
  ]

  return (
    <MainLayout>
      <Header items={items} />
      {children}
    </MainLayout>
  )
}
