import { Suspense } from 'react'

import { Main } from '../_components/Main'
import { Navbar } from '../_components/Navbar/Navbar'
import { Feed } from './_pageResources/components/Feed'
import { FeedSkeleton } from './_pageResources/components/Skeleton'

export default async function Page() {
  return (
    <Main stylization={{ theme: 'dark' }}>
      <Suspense fallback={<FeedSkeleton />}>
        <Feed />
      </Suspense>
      <Navbar />
    </Main>
  )
}

export const metadata = {
  title: 'Kevllotte - Feed',
  description: 'Feed',
}
