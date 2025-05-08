import { Book, GraduationCap, PenLine, Tags, Users } from 'lucide-react'
import Sidebar from '~/components/ui/sidebar/sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const items = [
    { href: '/authors', label: 'Autores', icon: PenLine },
    { href: '/books', label: 'Livros', icon: Book },
    { href: '/class_rooms', label: 'Turmas', icon: Users },
    { href: '/genres', label: 'Gêneros Literários', icon: Tags },
    { href: '/students', label: 'Alunos', icon: GraduationCap },
  ]

  return (
    <div className="flex flex-row min-h-screen dark:bg-gray-900">
      <Sidebar items={items} />
      <main className="flex-1 ml-[20%] px-4 py-6">{children}</main>
    </div>
  )
}
