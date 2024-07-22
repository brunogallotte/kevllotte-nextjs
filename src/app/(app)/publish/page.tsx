import { ContentWrapper } from '@/app/_components/ContentWrapper'
import { Main } from '@/app/_components/Main'

import { RichTextEditor } from './_pageResources/components/RichTextEditor'

export default function Publish() {
  return (
    <Main stylization={{ theme: 'dark' }}>
      <ContentWrapper element="section">
        <RichTextEditor />
      </ContentWrapper>
    </Main>
  )
}
