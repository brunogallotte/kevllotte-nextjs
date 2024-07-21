'use client'

import { ArrowRight } from '@carbon/icons-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Checkbox } from '@nextui-org/checkbox'
import { Input, Textarea } from '@nextui-org/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import { Progress } from '@nextui-org/progress'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { RegisterAction } from '@/app/_actions/register-action'

import { signUpConfig, TSignUpSchema } from './config'

export const SignUp = () => {
  const [step, setStep] = useState<number>(0)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const { register, handleSubmit, formState, setError, watch } =
    useForm<TSignUpSchema>({
      resolver: zodResolver(signUpConfig[step].schema),
    })

  const onSubmit = async (data: TSignUpSchema) => {
    console.log(data)

    if (step === 3) {
      if (data.password !== data.confirmPassword) {
        return setError('confirmPassword', {
          message: 'Passwords dos not match',
        })
      }
    }

    if (step < signUpConfig.length - 1) {
      return setStep(step + 1)
    }

    const responseRegister = await RegisterAction(data)

    if (responseRegister.status === 'success') {
      toast.success(responseRegister.title, {
        description: responseRegister.description,
      })

      onClose()
    } else {
      toast.error(responseRegister.title, {
        description: responseRegister.description,
      })
      onClose()
    }
  }

  const isTermsAccepted = watch('acceptTerms')

  return (
    <>
      <span className="cursor-pointer" onClick={onOpen}>
        Sign up
      </span>
      <Modal
        className="border border-zinc-900 bg-zinc-950 pb-4"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {step === 0 && (
                    <div className="flex w-full flex-col gap-4">
                      <b className="text-xl text-zinc-100">
                        Sign Up for Your Account
                      </b>
                      <p className="text-zinc-400">
                        Welcome! This is the Sign Up form for creating your
                        account. To get started, please complete all the
                        required steps. We look forward to having you join our
                        community!
                      </p>
                      <Checkbox value="sim" {...register('acceptTerms')}>
                        I agree to the{' '}
                        <span className="font-medium text-sky-600">
                          Terms of Service
                        </span>{' '}
                        and{' '}
                        <span className="font-medium text-sky-600">
                          Privacy Policy
                        </span>
                      </Checkbox>

                      <Button
                        color="primary"
                        endContent={<ArrowRight />}
                        isDisabled={!isTermsAccepted}
                        isLoading={formState.isSubmitting}
                        type="submit"
                      >
                        Create Account
                      </Button>
                    </div>
                  )}

                  {signUpConfig[step].input && (
                    <Input
                      {...(signUpConfig[step].input as any)}
                      errorMessage={
                        formState.errors[
                          signUpConfig[step].name as keyof TSignUpSchema
                        ]?.message
                      }
                      isInvalid={
                        !!formState.errors[
                          signUpConfig[step].name as keyof TSignUpSchema
                        ]?.message
                      }
                      {...register(
                        signUpConfig[step].name as keyof TSignUpSchema,
                      )}
                    />
                  )}

                  {signUpConfig[step].inputs && (
                    <div className="flex flex-col gap-6">
                      {signUpConfig[step].inputs?.map((input, index) => (
                        <Input
                          key={input.label}
                          {...(signUpConfig[step].inputs?.[index] as any)}
                          errorMessage={
                            formState.errors[
                              signUpConfig[step].name[
                                index
                              ] as keyof TSignUpSchema
                            ]?.message
                          }
                          isInvalid={
                            !!formState.errors[
                              signUpConfig[step].name[
                                index
                              ] as keyof TSignUpSchema
                            ]?.message
                          }
                          {...register(
                            signUpConfig[step].name[
                              index
                            ] as keyof TSignUpSchema,
                          )}
                        />
                      ))}
                    </div>
                  )}

                  {signUpConfig[step].textarea && (
                    <Textarea
                      {...(signUpConfig[step].textarea as any)}
                      errorMessage={
                        formState.errors[
                          signUpConfig[step].name as keyof TSignUpSchema
                        ]?.message
                      }
                      isInvalid={
                        !!formState.errors[
                          signUpConfig[step].name as keyof TSignUpSchema
                        ]?.message
                      }
                      {...register(
                        signUpConfig[step].name as keyof TSignUpSchema,
                      )}
                    />
                  )}
                  {step !== 0 && (
                    <>
                      <div className="mt-6 flex w-full justify-end gap-3">
                        <Button
                          color="danger"
                          variant="light"
                          onClick={() => setStep(step - 1)}
                        >
                          Back
                        </Button>
                        <Button
                          color="primary"
                          endContent={<ArrowRight />}
                          isLoading={formState.isSubmitting}
                          type="submit"
                        >
                          Continue
                        </Button>
                      </div>
                      <Progress
                        className="mt-6"
                        color="default"
                        maxValue={signUpConfig.length}
                        size="sm"
                        value={step}
                      />
                    </>
                  )}
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
