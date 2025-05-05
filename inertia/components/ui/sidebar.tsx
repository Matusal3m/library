import { Link } from '@inertiajs/react'

type SidebarItemProps = {
  label: string
  icon?: React.ReactNode
  href: string
}

export function Sidebar({ items, className }: { items: SidebarItemProps[]; className?: string }) {
  return (
    <aside id="main-sidebar" className={className} aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {items.map((item, i) => (
            <SidebarItem key={item.label + i} {...item} />
          ))}
        </ul>
      </div>
    </aside>
  )
}

function SidebarItem({ label, icon, href }: SidebarItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {icon ? icon : <SidebarItemIconPlaceholder />}
        <span className="ms-3">{label}</span>
      </Link>
    </li>
  )
}

function SidebarItemIconPlaceholder() {
  return <span className="w-5 h-5"></span>
}
