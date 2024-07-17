import { PrevPost, TPrevPostProps } from "./PrevPost/PrevPost";

import { verifyJwtAction } from "@/app/_actions/verify-jwt-action";

export const Feed = async () => {
  const tokenJwt = await verifyJwtAction();

  const responseOfFetchUserPosts = await fetch(
    "https://kevllotte-api.onrender.com/users/posts",
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
    <div>
      <h1>Feed</h1>
      <div className="w-full flex flex-col gap-8">
        {postsOfUser.posts.map((post: TPrevPostProps) => (
          <PrevPost key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};
