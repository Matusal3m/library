import Header from '~/components/ui/header/header'
import { HeaderItemProps } from '~/components/ui/header/header-item'
import MainLayout from './main-layout'

export default function LendsLayout({ children }: { children: React.ReactNode }) {
  const items: HeaderItemProps[] = [
    {
      href: '/lends',
      label: 'Todos empréstimos',
    },
    {
      href: '/lends/create',
      label: 'Novo empréstimo',
    },
  ]

  return (
    <MainLayout>
      <Header items={items} />
      {children}
    </MainLayout>
  )
}
