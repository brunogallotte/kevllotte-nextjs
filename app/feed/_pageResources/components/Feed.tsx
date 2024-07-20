import { PrevPost, TPrevPostProps } from "./PrevPost/PrevPost";
import { Aside } from "./Aside/Aside";
import { Header } from "./Header/Header";

import { ContentWrapper } from "@/app/_components/ContentWrapper";
import { verifyJwtAction } from "@/app/_actions/verify-jwt-action";

export const Feed = async () => {
  const tokenJwt = await verifyJwtAction();

  const responseOfFetchUserPosts = await fetch(
    `${process.env.KEVLLOTTE_API_URL}/posts`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenJwt.value}`,
      },
    }
  );

  const postsOfUser = await responseOfFetchUserPosts.json();

  return (
    <ContentWrapper className="pt-12 flex" element="section">
      <div className="w-full flex flex-col gap-8">
        <Header />
        {postsOfUser.posts.map((post: TPrevPostProps) => (
          <PrevPost key={post.id} {...post} />
        ))}
      </div>
      <Aside />
    </ContentWrapper>
  );
};
