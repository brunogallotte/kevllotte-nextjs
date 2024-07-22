import { Main } from '@/app/_components/Main'

import { FormSection } from './_pageResources/sections/FormSection/FormSection'

export default function Home() {
  return (
    <Main className="overflow-hidden" stylization={{ theme: 'dark' }}>
      <FormSection />
    </Main>
  )
}

export const metadata = {
  title: 'Kevllotte - Sign in',
  description: 'Log in with your account to start publishing your posts',
}
