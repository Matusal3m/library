import MainLayout from '~/layouts/main-layout'

export default function Home() {
  return <div>Home</div>
}

Home.layout = (page: any) => <MainLayout children={page} />
