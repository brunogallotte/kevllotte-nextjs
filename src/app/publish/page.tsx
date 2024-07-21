import { ContentWrapper } from '../_components/ContentWrapper'
import { Main } from '../_components/Main'
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
