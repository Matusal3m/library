import { Link } from '@inertiajs/react'

type SidebarItemProps = {
  label: string
  icon?: React.JSX.ElementType
  href: string
}

export default function Sidebar({ items }: { items: SidebarItemProps[] }) {
  return (
    <aside className="w-[20%] h-screen hidden sm:block fixed top-0 left-0 z-40">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {item.icon ? <item.icon /> : <span className="w-5 h-5"></span>}
                <span className="ms-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
