import { Link } from '@inertiajs/react'

export type HeaderItemProps = {
  label: string
  href: string
}

export default function HeaderItem({ href, label }: HeaderItemProps) {
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
