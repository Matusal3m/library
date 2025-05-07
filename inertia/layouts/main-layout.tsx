import { Sidebar } from '~/components/ui/sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const items = [
    { href: '/authors', label: 'Autores' },
    { href: '/books', label: 'Livros' },
    { href: '/class_rooms', label: 'Turmas' },
    { href: '/genres', label: 'Gêneros Literários' },
  ]

  return (
    <div className="flex overflow-x-hidden min-h-screen dark:bg-gray-900">
      <Sidebar items={items} className="w-[20%] h-screen hidden sm:block fixed top-0 left-0 z-40" />
      <main className="flex-1 ml-[20%] px-4 py-6">{children}</main>
    </div>
  )
}
