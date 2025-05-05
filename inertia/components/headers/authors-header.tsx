import { Link } from '@inertiajs/react'

export function AuthorsHeader({ items }: { items: AuthorsHeaderItemProps[] }) {
  return (
    <nav className="bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <ul className="flex p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {items.map((item) => (
            <AuthorsHeaderItem href={item.href} label={item.label} key={item.href} />
          ))}
        </ul>
      </div>
    </nav>
  )
}

export type AuthorsHeaderItemProps = {
  label: string
  href: string
}

function AuthorsHeaderItem({ href, label }: AuthorsHeaderItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 no-underline hover:underline"
        aria-current="page"
        method="get"
      >
        {label}
      </Link>
    </li>
  )
}
