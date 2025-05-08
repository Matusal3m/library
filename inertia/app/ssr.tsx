import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import inertiaResolve from './inertia-resolve'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: inertiaResolve,
    setup: ({ App, props }) => <App {...props} />,
  })
}
