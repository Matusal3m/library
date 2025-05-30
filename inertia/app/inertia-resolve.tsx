import AuthorsLayout from '~/layouts/authors-layout'
import BooksLayout from '~/layouts/books-layout'
import GenresLayout from '~/layouts/genres-layout'
import MainLayout from '~/layouts/main-layout'
import StudentsLayout from '~/layouts/students-layout'

const layoutMap = [
    ['books/', BooksLayout],
    ['authors/', AuthorsLayout],
    ['genres/', GenresLayout],
    ['students/', StudentsLayout],
] as const

export default (name: string) => {
    const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
    let page = pages[`../pages/${name}.tsx`]
    let Layout = MainLayout

    for (const [prefix, L] of layoutMap) {
        if (name.startsWith(prefix)) {
            Layout = L
            break
        }
    }

    //@ts-ignore
    page.default.layout = (page) => <Layout>{page}</Layout>
    return page
}
