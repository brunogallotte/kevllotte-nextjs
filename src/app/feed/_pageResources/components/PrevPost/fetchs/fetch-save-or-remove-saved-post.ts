'use server'

import { verifyJwtAction } from '@/app/_actions/verify-jwt-action'

import type { TPrevPostProps } from '../PrevPost'

export const fetchSaveOrRemoveSavedPost = async (postId: string) => {
  const tokenJwt = await verifyJwtAction()

  const savedPosts = await fetch(
    `${process.env.KEVLLOTTE_API_URL}/posts/save`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenJwt.value}`,
      },
    },
  )

  const savedPostsData: TSavedPostsData = await savedPosts.json()

  const isPostAlreadySaved = savedPostsData.savedPosts.find(
    (post) => post.id === postId,
  )

  if (isPostAlreadySaved) {
    const removeSavedPostResponse = await fetch(
      `${process.env.KEVLLOTTE_API_URL}/posts/save/${postId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${tokenJwt.value}`,
        },
      },
    )

    return {
      status: removeSavedPostResponse.status,
      title: 'Success!',
      description: 'Post removed from your saved posts successfully!',
    }
  }

  const savePostResponse = await fetch(
    `${process.env.KEVLLOTTE_API_URL}/posts/${postId}/save`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenJwt.value}`,
      },
    },
  )

  return {
    status: savePostResponse.status,
    title: 'Success!',
    description: 'Post saved successfully!',
  }
}

export type TSavedPostsData = {
  savedPosts: TPrevPostProps[]
}
