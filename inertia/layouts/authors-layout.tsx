import { AuthorsHeader, AuthorsHeaderItemProps } from '~/components/headers/authors-header'
import MainLayout from './main-layout'

export function AuthorsLayout({ children }: { children: React.ReactNode }) {
  const items: AuthorsHeaderItemProps[] = [
    {
      href: '/authors',
      label: 'Ver todos autores',
    },
    {
      href: '/authors/create',
      label: 'Criar autor',
    },
  ]

  return (
    <MainLayout>
      <AuthorsHeader items={items} />
      {children}
    </MainLayout>
  )
}
