"use server";

import { cookies } from "next/headers";

export const fetchAddLikeForPost = async (postId: string): Promise<number> => {
  const tokenJwt = cookies().get("tokenAccess");

  console.log(tokenJwt?.value);
  console.log(postId);

  const response = await fetch(
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

  console.log(response.status);

  return response.status;
};
