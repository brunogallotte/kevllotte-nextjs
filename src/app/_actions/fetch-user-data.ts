'use server'

import type { TUser } from '@/types'

import { verifyJwtAction } from './verify-jwt-action'

export const fetchUserData = async (): Promise<TUser> => {
  const tokenJwt = await verifyJwtAction()

  const userInformationsResponse = await fetch(
    `${process.env.KEVLLOTTE_API_URL}/me`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenJwt?.value}`,
      },
    },
  )

  const userInformationsData = await userInformationsResponse.json()

  return userInformationsData
}
