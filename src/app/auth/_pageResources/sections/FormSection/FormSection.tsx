import { twMerge } from 'tailwind-merge'

import GridPattern from '@/app/_components/AnimatedGridPattern/AnimatedGridPattern'
import { ContentWrapper } from '@/app/_components/ContentWrapper'

import { SignIn } from '../../components/SignIn/SignIn'

export const FormSection = () => {
  return (
    <ContentWrapper className="flex w-full" element="section">
      <GridPattern
        className={twMerge(
          '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
          'inset-y-0 h-[800px] skew-y-12 opacity-40 lg:relative lg:opacity-100',
        )}
        duration={3}
        maxOpacity={0.1}
        numSquares={30}
        repeatDelay={1}
      />
      <div className="relative z-20 mx-auto w-full max-w-[350px] lg:mx-0 lg:ml-auto lg:bg-zinc-950">
        <SignIn />
      </div>
    </ContentWrapper>
  )
}
