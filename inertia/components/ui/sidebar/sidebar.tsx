import { Link } from '@inertiajs/react'
import { MoreHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'

type SidebarItemProps = {
    label: string
    icon?: React.JSX.ElementType
    href: string
}

export default function Sidebar({
    items,
    extraItems,
}: {
    items: SidebarItemProps[]
    extraItems: SidebarItemProps[]
}) {
    const [showMore, setShowMore] = useState(false)
    const [currentPath, setCurrentPath] = useState('')

    useEffect(() => {
        setCurrentPath( '/' + window.location.pathname.split('/')[1])

        return () => setCurrentPath('')
    })

    return (
        <aside className="w-[20%] h-screen hidden sm:block fixed top-0 left-0 z-40">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    {items.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`
                  flex items-center p-2 text-gray-900 rounded-lg
                  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group
                  ${item.href === currentPath ? 'bg-gray-100 dark:bg-gray-700' : ''}
                `}
                            >
                                {item.icon ? <item.icon /> : <span className="w-5 h-5"></span>}
                                <span className="ms-3">{item.label}</span>
                            </Link>
                        </li>
                    ))}

                    <li>
                        <div
                            onClick={() => setShowMore(!showMore)}
                            className="cursor-pointer text-gray-900 dark:text-white font-medium flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <MoreHorizontal className="w-5 h-5 mr-2" />
                            <span className="ms-3">Outras Páginas</span>
                        </div>

                        {showMore && (
                            <ul className="space-y-2 pl-4 mt-2">
                                {extraItems.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`
                        flex items-center p-2 text-gray-900 rounded-lg
                        dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group
                        ${item.href === currentPath ? 'bg-gray-100 dark:bg-gray-700' : ''}
                      `}
                                            onClick={() => handleClick(item.href)}
                                        >
                                            {item.icon ? (
                                                <item.icon />
                                            ) : (
                                                <span className="w-5 h-5"></span>
                                            )}
                                            <span className="ms-3">{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </aside>
    )
}
