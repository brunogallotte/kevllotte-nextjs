import Link from "next/link";
import { User } from "@nextui-org/user";

import { PrevPost, TPrevPostProps } from "./PrevPost/PrevPost";

import { ContentWrapper } from "@/app/_components/ContentWrapper";
import { verifyJwtAction } from "@/app/_actions/verify-jwt-action";
import { Aside } from "./Aside/Aside";

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
        {postsOfUser.posts.map((post: TPrevPostProps) => (
          <PrevPost key={post.id} {...post} />
        ))}
      </div>
      <Aside />
    </ContentWrapper>
  );
};
