"use server";

import { cookies } from "next/headers";

export const fetchAddOrRemoveLikeForPost = async ({
  postId,
  postLike,
}: TFetchAddOrRemoveLikeForPost): Promise<number> => {
  const tokenJwt = cookies().get("tokenAccess");

  const user = await fetch(`${process.env.KEVLLOTTE_API_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenJwt?.value}`,
    },
  });

  const userData = await user.json();

  const userHasLiked = postLike.find(
    (like) => like.authorId === userData.author.id,
  );

  if (userHasLiked) {
    const responseDeleteOfLike = await fetch(
      `${process.env.KEVLLOTTE_API_URL}/posts/${postId}/likes`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenJwt?.value}`,
        },
      },
    );

    return responseDeleteOfLike.status;
  }

  const responseOfAddLikeForPost = await fetch(
    `${process.env.KEVLLOTTE_API_URL}/posts/${postId}/likes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenJwt?.value}`,
      },
      body: JSON.stringify({
        postId,
      }),
    },
  );

  return responseOfAddLikeForPost.status;
};

export type TFetchAddOrRemoveLikeForPost = {
  postId: string;
  postLike: {
    id: string;
    authorId: string;
    postId: string;
    createdAt: Date;
  }[];
};
