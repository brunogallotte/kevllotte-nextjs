import { ContentWrapper } from "../_components/ContentWrapper";
import { Main } from "../_components/Main";

import { Feed } from "./_pageResources/components/Feed";

export default async function Page() {
  // const response = await fetch("https://kevllotte-api.onrender.com/posts", {
  //   method: "POST",
  //   cache: "no-cache",
  //   headers: {
  //     Authorization:
  //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZmZmYTExYi04YjM0LTQ2NWEtODQ0OC00N2ExNjQ1NWVlMzgiLCJpYXQiOjE3MjExMzM4MTcsImV4cCI6MTcyMTEzNDQxN30.H9WkYkFCxW_29DpUqNIWEIWCl1k87sE0turb7G2etfI",
  //   },
  //   body: JSON.stringify({
  //     title: "Alocated teste jabiroscatesv",
  //     content: "Hello my friends i'm the best developer in world",
  //   }),
  // });

  // console.log(await response.json());

  return (
    <Main stylization={{ theme: "dark" }}>
      <ContentWrapper className="pt-12" element="section">
        <Feed />
      </ContentWrapper>
    </Main>
  );
}

export const metadata = {
  title: "Kevllotte - Feed",
  description: "Feed",
};
