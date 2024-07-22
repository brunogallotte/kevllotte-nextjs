'use client'

import { Email, Locked } from '@carbon/icons-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { AuthAction } from '@/app/_actions/auth-action'

import { SignUp } from '../SignUp/SignUp'

export const SignIn = () => {
  const { register, handleSubmit, formState } = useForm<TAuthenticateSchema>({
    resolver: zodResolver(authenticateSchema),
  })

  const router = useRouter()

  const onSubmit = async (data: TAuthenticateSchema) => {
    const userAuthResponse = await AuthAction(data)

    if (userAuthResponse && 'author' in userAuthResponse) {
      router.push('/feed')
    } else if ('title' in userAuthResponse) {
      toast.error(userAuthResponse.title, {
        description: userAuthResponse.description,
      })
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center">
      <Image
        alt="Kevllotte"
        height={100}
        src="/kevllotte-logo.png"
        width={90}
      />
      <h1 className="mt-8 text-3xl font-bold">Sign in to Kevllotte</h1>
      <p className="mt-2 text-zinc-300">
        Don’t have an account?{' '}
        <b className="text-sky-600">
          <SignUp />
        </b>
      </p>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Input
          classNames={{ mainWrapper: 'mt-12', label: '!text-zinc-300' }}
          errorMessage={formState.errors.email?.message}
          isInvalid={!!formState.errors.email?.message}
          label="Email address"
          labelPlacement="outside"
          placeholder="Enter your e-mail"
          size="lg"
          startContent={<Email className="min-h-6 min-w-6 text-zinc-500" />}
          variant="bordered"
          {...register('email')}
        />

        <Input
          isClearable
          classNames={{ mainWrapper: 'mt-6', label: '!text-zinc-300' }}
          errorMessage={formState.errors.password?.message}
          isInvalid={!!formState.errors.password?.message}
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          size="lg"
          startContent={<Locked className="min-h-6 min-w-6 text-zinc-500" />}
          type="password"
          variant="bordered"
          {...register('password')}
        />
        <span className="mr-auto mt-2 text-sky-600">Forget you password?</span>

        <Button
          className="mt-8 w-full"
          color="primary"
          disabled={formState.isSubmitting}
          isLoading={formState.isSubmitting}
          size="lg"
          type="submit"
          variant="shadow"
        >
          Login
        </Button>
      </form>
    </div>
  )
}

export const authenticateSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must have at least 8 characters long'),
})

export type TAuthenticateSchema = z.infer<typeof authenticateSchema>
