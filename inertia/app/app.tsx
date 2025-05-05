/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import 'flowbite'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import MainLayout from '~/layouts/main-layout'
import { AuthorsLayout } from '~/layouts/authors-layout'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
    let page = pages[`../pages/${name}.tsx`]

    //@ts-ignore
    page.default.layout = name.startsWith('authors/')
      ? (page: any) => <AuthorsLayout children={page} />
      : (page: any) => <MainLayout children={page} />
    return page
  },

  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
  },
})
