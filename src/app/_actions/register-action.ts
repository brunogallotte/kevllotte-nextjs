'use server'

import { TSignUpSchema } from '../auth/_pageResources/components/SignUp/config'

type TToast = {
  status: 'success' | 'error'
  title: string
  description: string
}

export const RegisterAction = async (props: TSignUpSchema): Promise<TToast> => {
  // eslint-disable-next-line
  const { confirmPassword, acceptTerms, ...data } = props

  const responseData = await fetch('https://kevllotte-api.onrender.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (responseData.status === 201) {
    return {
      status: 'success',
      title: 'Success',
      description: 'User registered successfully! Please, sign-in to continue.',
    }
  } else if (responseData.status === 409) {
    return {
      status: 'error',
      title: 'Error',
      description: 'User already exists.',
    }
  }

  return {
    status: 'error',
    title: 'Error',
    description: 'Service temporarily unavailable, please try later.',
  }
}
