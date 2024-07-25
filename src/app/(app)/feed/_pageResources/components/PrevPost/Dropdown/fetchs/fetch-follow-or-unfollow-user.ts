'use server'

import { fetchUserData } from '@/app/_actions/fetch-user-data'
import { verifyJwtAction } from '@/app/_actions/verify-jwt-action'

export const fetchFollowOrUnfollowUser = async ({
  userId,
}: TFetchFollowOrUnfollowUser) => {
  const tokenJwt = await verifyJwtAction()

  const userData = await fetchUserData()

  const userFollowers = await fetch(
    `${process.env.KEVLLOTTE_API_URL}/users/${userId}/followers`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenJwt.value}`,
      },
    },
  )

  const userFollowersData: TUserFollowersData = await userFollowers.json()

  const userHasFollowed = userFollowersData.followers.find(
    (follower) => follower.followerAuthorId === userData.author.id,
  )

  if (userHasFollowed) {
    const followId = userHasFollowed.id

    const unfollowUserResponse = await fetch(
      `${process.env.KEVLLOTTE_API_URL}/users/follow/${followId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${tokenJwt.value}`,
        },
      },
    )

    return {
      status: unfollowUserResponse.status,
      title: 'Success!',
      description: 'Unfollowed this user succesfully!',
    }
  }

  const followUserResponse = await fetch(
    `${process.env.KEVLLOTTE_API_URL}/users/follow/${userId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenJwt.value}`,
      },
    },
  )

  return {
    status: followUserResponse.status,
    title: 'Success!',
    description: 'Followed this user succesfully!',
  }
}

export type TUserFollowersData = {
  followers: {
    id: string
    followerAuthorId: string
    followingAuthorId: string
    createdAt: string
  }[]
}

export type TFetchFollowOrUnfollowUser = {
  userId: string
}
