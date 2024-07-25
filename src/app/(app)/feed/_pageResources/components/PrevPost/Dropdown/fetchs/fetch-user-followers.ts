'use server'

import { verifyJwtAction } from '@/app/_actions/verify-jwt-action'

import type { TUserFollowersData } from './fetch-follow-or-unfollow-user'

// TODO: USE THIS ACTION TO CHECK IF THE USER IS FOLLOWERS OR NO AND CHANGE THE TEXT IN POST MORE OPTIONS DROPDOWN
export const fetchUserFollowers = async ({ userId }: TFetchUserFollowers) => {
  const tokenJwt = await verifyJwtAction()

  const userFollowersResponse = await fetch(
    `${process.env.KEVLLOTTE_API_URL}/users/${userId}/followers`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenJwt.value}`,
      },
    },
  )

  const userFollowersData: TFetchUserFollowersData =
    await userFollowersResponse.json()

  return userFollowersData.followers
}

export type TFetchUserFollowersData = {
  followers: TUserFollowersData
}

export type TFetchUserFollowers = {
  userId: string
}
