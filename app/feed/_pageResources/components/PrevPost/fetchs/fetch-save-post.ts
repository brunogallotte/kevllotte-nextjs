"use server";

import { verifyJwtAction } from "@/app/_actions/verify-jwt-action";

export const fetchSavePost = async (postId: string) => {
  const tokenJwt = await verifyJwtAction();

  const response = await fetch(
    `${process.env.KEVLLOTTE_API_URL}/posts/${postId}/save`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenJwt.value}`,
      },
    },
  );
};
