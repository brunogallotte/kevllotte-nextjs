import { Main } from "../_components/Main";

import { FormSection } from "./_pageResources/sections/FormSection/FormSection";

export default function Home() {
  return (
    <Main className="overflow-hidden" stylization={{ theme: "dark" }}>
      <FormSection />
    </Main>
  );
}
