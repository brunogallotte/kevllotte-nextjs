import { Main } from '../_components/Main'
import { Navbar } from '../_components/Navbar/Navbar'
import { Feed } from './_pageResources/components/Feed'

export default async function Page() {
  return (
    <Main stylization={{ theme: 'dark' }}>
      <Feed />
      <Navbar />
    </Main>
  )
}

export const metadata = {
  title: 'Kevllotte - Feed',
  description: 'Feed',
}
