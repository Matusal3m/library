/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import 'flowbite'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import MainLayout from '~/layouts/main-layout'
import { AuthorsLayout } from '~/layouts/authors-layout'
import { BooksLayout } from '~/layouts/books-layout'
import { ClassRoomsLayout } from '~/layouts/class-rooms-layout'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
    let page = pages[`../pages/${name}.tsx`]

    //@ts-ignore
    page.default.layout = (page: any) => swithLayout(name, page)
    return page
  },

  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
  },
})

const swithLayout = (name: string, page: any) => {
  if (name.startsWith('books/')) {
    return <BooksLayout children={page} />
  }

  if (name.startsWith('authors/')) {
    return <AuthorsLayout children={page} />
  }

  if (name.startsWith('class_rooms/')) {
    return <ClassRoomsLayout children={page} />
  }

  return <MainLayout children={page} />
}
