import { Header, HeaderItemProps } from '~/components/ui/header'
import MainLayout from './main-layout'

export function GenresLayout({ children }: { children: React.ReactNode }) {
  const items: HeaderItemProps[] = [
    {
      href: '/genres',
      label: 'Todos os gêneros literários',
    },
    {
      href: '/genres/create',
      label: 'Adicionar novo gênero literário',
    },
  ]

  return (
    <MainLayout>
      <Header items={items} />
      {children}
    </MainLayout>
  )
}
