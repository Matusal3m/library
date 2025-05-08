import { Link } from '@inertiajs/react'
import { JSX } from 'react'

export type SidebarItemProps = {
  label: string
  icon?: JSX.ElementType
  href: string
}
export default function SidebarItem({ label, icon: Icon, href }: SidebarItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {Icon ? <Icon /> : <span className="w-5 h-5"></span>}
        <span className="ms-3">{label}</span>
      </Link>
    </li>
  )
}
