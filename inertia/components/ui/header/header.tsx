import HeaderItem, { HeaderItemProps } from './header-item'

export default function Header({ items }: { items: HeaderItemProps[] }) {
  return (
    <nav className="bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <ul className="flex p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {items.map((item) => (
            <HeaderItem href={item.href} label={item.label} key={item.href} />
          ))}
        </ul>
      </div>
    </nav>
  )
}
