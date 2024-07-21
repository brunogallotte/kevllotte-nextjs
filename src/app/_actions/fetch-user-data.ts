'use server'

import { cookies } from 'next/headers'

import type { TUser } from '@/types'

export const fetchUserData = async (): Promise<TUser> => {
  const tokenJwt = cookies().get('tokenAccess')

  const fetchUserDataResponse = await fetch(
    `${process.env.KEVLLOTTE_API_URL}/me`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenJwt?.value}`,
      },
    },
  )

  const fetchUserDataResponseJson = await fetchUserDataResponse.json()

  return fetchUserDataResponseJson
}
