import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// TODO: Need implements refresh token

export const verifyJwtAction = async () => {
  const tokenJwt = cookies().get('tokenAccess')

  if (!tokenJwt) {
    redirect('/')
  }

  const user = await fetch('https://kevllotte-api.onrender.com/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokenJwt.value}`,
    },
  })

  if (user.status !== 200) {
    redirect('/auth')
  }

  return tokenJwt
}
