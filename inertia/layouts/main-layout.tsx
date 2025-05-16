import { BookOpen, GraduationCap, LibraryBig, PenLine, Tags, Users } from 'lucide-react'
import Sidebar from '~/components/ui/sidebar/sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const mainItems = [
    { href: '/books', label: 'Livros', icon: LibraryBig },
    { href: '/students', label: 'Alunos', icon: GraduationCap },
    { href: '/lends', label: 'Empréstimos', icon: BookOpen },
  ]

  const extraItems = [
    { href: '/authors', label: 'Autores', icon: PenLine },
    { href: '/class_rooms', label: 'Turmas', icon: Users },
    { href: '/genres', label: 'Gêneros Literários', icon: Tags },
  ]

  return (
    <div className="flex flex-row min-h-screen dark:bg-gray-900">
      <Sidebar extraItems={extraItems} items={mainItems} />
      <main className="flex-1 ml-[20%] px-4 py-6">{children}</main>
    </div>
  )
}
