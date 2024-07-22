import { verifyJwtAction } from '@/app/_actions/verify-jwt-action'
import { ContentWrapper } from '@/app/_components/ContentWrapper'

import { Aside } from './Aside/Aside'
import { Header } from './Header/Header'
import { PrevPost, TPrevPostProps } from './PrevPost/PrevPost'

export const Feed = async () => {
  const tokenJwt = await verifyJwtAction()

  await new Promise((resolve) => setTimeout(resolve, 5000))

  const responseOfFetchUserPosts = await fetch(
    `${process.env.KEVLLOTTE_API_URL}/posts`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenJwt.value}`,
      },
    },
  )

  const postsOfUser = await responseOfFetchUserPosts.json()

  return (
    <ContentWrapper className="flex pt-12" element="section">
      <div className="flex w-full flex-col gap-8">
        <Header />
        {postsOfUser.posts.map((post: TPrevPostProps) => (
          <PrevPost key={post.id} {...post} />
        ))}
      </div>
      <Aside />
    </ContentWrapper>
  )
}
