import Header from '~/components/ui/header/header'
import { HeaderItemProps } from '~/components/ui/header/header-item'
import MainLayout from './main-layout'

export default function AuthorsLayout({ children }: { children: React.ReactNode }) {
    const items: HeaderItemProps[] = [
        {
            href: '/authors',
            label: 'Todos os autores',
        },
        {
            href: '/authors/create',
            label: 'Adicionar autor',
        },
    ]

    return (
        <MainLayout>
            <Header items={items} />
            {children}
        </MainLayout>
    )
}
