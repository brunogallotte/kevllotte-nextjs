'use server'

import { verifyJwtAction } from '@/app/_actions/verify-jwt-action'

import type { TPrevPostLikeProps } from '../PrevPost'

export const fetchAddOrRemoveLikeForPost = async ({
  postId,
}: TFetchAddOrRemoveLikeForPost): Promise<number> => {
  const tokenJwt = await verifyJwtAction()

  const user = await fetch(`${process.env.KEVLLOTTE_API_URL}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokenJwt.value}`,
    },
  })

  const userData = await user.json()

  const postLikes = await fetch(
    `${process.env.KEVLLOTTE_API_URL}/posts/${postId}/likes`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenJwt.value}`,
      },
    },
  )

  const postLikesData: TPostLikesData = await postLikes.json()

  const userHasLiked = postLikesData.postLikes.find(
    (like) => like.authorId === userData.author.id,
  )

  if (userHasLiked) {
    const deleteLikeResponse = await fetch(
      `${process.env.KEVLLOTTE_API_URL}/posts/${postId}/likes`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenJwt.value}`,
        },
      },
    )

    return deleteLikeResponse.status
  }

  const addPostLikeResponse = await fetch(
    `${process.env.KEVLLOTTE_API_URL}/posts/${postId}/likes`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenJwt.value}`,
      },
      body: JSON.stringify({
        postId,
      }),
    },
  )

  return addPostLikeResponse.status
}

export type TPostLikesData = {
  postLikes: TPrevPostLikeProps[]
}

export type TFetchAddOrRemoveLikeForPost = {
  postId: string
}
