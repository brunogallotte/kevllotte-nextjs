import { verifyJwtAction } from '@/app/_actions/verify-jwt-action'
import { ContentWrapper } from '@/app/_components/ContentWrapper'

import { Aside } from './Aside/Aside'
import { Header } from './Header/Header'
import { PrevPost, TPrevPostProps } from './PrevPost/PrevPost'

export const Feed = async () => {
  const tokenJwt = await verifyJwtAction()

  const feedPostsResponse = await fetch(
    `${process.env.KEVLLOTTE_API_URL}/posts`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenJwt.value}`,
      },
      next: {
        tags: ['feed-posts'],
      },
    },
  )

  const feedPostsData = await feedPostsResponse.json()

  return (
    <ContentWrapper className="flex pt-12" element="section">
      <div className="flex w-full flex-col gap-8">
        <Header />
        {feedPostsData.posts.map((post: TPrevPostProps) => (
          <PrevPost key={post.id} {...post} />
        ))}
      </div>
      <Aside />
    </ContentWrapper>
  )
}
