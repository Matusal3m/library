/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import inertiaResolve from './inertia-resolve'

const appName = import.meta.env.VITE_APP_NAME || 'Biblioteca PP'

createInertiaApp({
    progress: { color: '#5468FF' },

    title: () => appName,

    resolve: inertiaResolve,

    setup({ el, App, props }) {
        hydrateRoot(el, <App {...props} />)
    },
})
