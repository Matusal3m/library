import Header from '~/components/ui/header/header'
import { HeaderItemProps } from '~/components/ui/header/header-item'
import MainLayout from './main-layout'

export default function BooksLayout({ children }: { children: React.ReactNode }) {
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
