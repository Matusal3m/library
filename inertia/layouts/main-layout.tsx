import { Sidebar } from '~/components/ui/sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const items = [{ href: '/authors', label: 'Autores' }]

  return (
    <>
      <main className="min-h-screen dark:bg-gray-900 ml-64">{children}</main>
      <Sidebar
        items={items}
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      />
    </>
  )
}
