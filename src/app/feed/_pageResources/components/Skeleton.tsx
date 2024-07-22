import { ContentWrapper } from '@/app/_components/ContentWrapper'

import { AsideSkeleton } from './Aside/Skeleton'
import { HeaderSkeleton } from './Header/Skeleton'
import { PrevPostSkeleton } from './PrevPost/Skeleton'

export function FeedSkeleton() {
  return (
    <ContentWrapper className="flex pt-12" element="section">
      <div className="flex w-full flex-col gap-8">
        <HeaderSkeleton />
        <PrevPostSkeleton />
      </div>
      <AsideSkeleton />
    </ContentWrapper>
  )
}
