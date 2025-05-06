import { Header, HeaderItemProps } from '~/components/ui/header'
import MainLayout from './main-layout'

export function BooksLayout({ children }: { children: React.ReactNode }) {
  const items: HeaderItemProps[] = [
    {
      href: '/books',
      label: 'Todos os livros',
    },
    {
      href: '/books/create',
      label: 'Adicionar novo livro',
    },
  ]

  return (
    <MainLayout>
      <Header items={items} />
      {children}
    </MainLayout>
  )
}
