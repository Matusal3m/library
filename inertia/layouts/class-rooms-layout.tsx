import { Header, HeaderItemProps } from '~/components/ui/header'
import MainLayout from './main-layout'

export function ClassRoomsLayout({ children }: { children: React.ReactNode }) {
  const items: HeaderItemProps[] = [
    {
      href: '/class_rooms',
      label: 'Todos as turmas',
    },
  ]

  return (
    <MainLayout>
      <Header items={items} />
      {children}
    </MainLayout>
  )
}
