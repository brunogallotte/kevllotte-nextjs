"use server";

import { verifyJwtAction } from "@/app/_actions/verify-jwt-action";

export const fetchSavePost = async (postId: string) => {
  const tokenJwt = await verifyJwtAction();

  try {
    console.log(postId);
    console.log(tokenJwt);

    const response = await fetch(
      `${process.env.KEVLLOTTE_API_URL}/posts/${postId}/save`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenJwt.value}`,
        },
      },
    );

    console.log(response.status);

    if (!response.ok) {
      const errorData = await response.json();

      console.error("Erro na resposta:", errorData);
    }
  } catch (error) {
    console.error("Erro ao salvar o post:", error);
  }
};
