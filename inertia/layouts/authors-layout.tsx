import { AuthorsHeader } from '~/components/headers/authors-header'
import MainLayout from './main-layout'

export function AuthorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthorsHeader />
      {children}
    </>
  )
}

AuthorsLayout.layout = (page: any) => <MainLayout children={page} />
