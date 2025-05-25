import Header from '~/components/ui/header/header'
import { HeaderItemProps } from '~/components/ui/header/header-item'
import MainLayout from './main-layout'

export default function ClassRoomsLayout({ children }: { children: React.ReactNode }) {
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
