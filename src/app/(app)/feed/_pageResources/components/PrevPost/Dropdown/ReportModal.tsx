'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Checkbox } from '@nextui-org/checkbox'
import { Textarea } from '@nextui-org/input'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal'
import { Select, SelectItem } from '@nextui-org/select'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import type { TPrevPostProps } from '../PrevPost'
import { fetchReportPost } from './fetchs/fetch-report-post'

export const ReportModal = ({
  onClose,
  isOpen,
  onOpenChange,
  post,
}: TReportModal) => {
  const [selectValue, setSelectValue] = useState<string>('')

  const { register, handleSubmit, formState, reset } = useForm<TReportSchema>({
    resolver: zodResolver(reportSchema),
  })

  const { mutateAsync: handleReportPostMutation } = useMutation({
    mutationKey: [`post-${post.id}-report`],
    mutationFn: async ({ reason, description, blockAuthor }: TReportSchema) =>
      // TODO: BLOCK AUTHOR WHEN REPORTING A POST IF BLOCKAUTHOR IS TRUE

      await fetchReportPost({
        postId: post.id,
        reason,
        description: description ?? undefined,
      }),
    onSuccess: (data) => {
      if (data.status === 201) {
        toast.success(data.title, {
          description: data.description,
        })
      } else {
        toast.error('Error!', {
          description: 'There was an error when trying to report this post.',
        })
      }
    },
  })

  const onSubmit = async (data: TReportSchema) => {
    await handleReportPostMutation({
      reason: data.reason,
      description: data.description,
      blockAuthor: data.blockAuthor,
    })

    reset()
    onClose()
  }

  return (
    <Modal
      className="border border-zinc-900 bg-zinc-950 pb-4"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Report this post
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Select
                  errorMessage={formState.errors.reason?.message}
                  isInvalid={!!formState.errors.reason?.message}
                  label="Reason"
                  variant="bordered"
                  onSelectionChange={(e) => setSelectValue(e.currentKey)}
                  {...register('reason')}
                >
                  <SelectItem key="spam">This post contains spam</SelectItem>
                  <SelectItem key="violated norms">
                    The author violated community norms
                  </SelectItem>
                  <SelectItem key="scam">The content is a scam</SelectItem>
                  <SelectItem key="other">Other</SelectItem>
                </Select>
                <Textarea
                  errorMessage={formState.errors.description?.message}
                  isDisabled={selectValue !== 'other'}
                  isInvalid={!!formState.errors.description?.message}
                  placeholder="Write a reason with more details"
                  variant="bordered"
                  {...register('description')}
                />
                <Checkbox color="danger" {...register('blockAuthor')}>
                  I want to block the post author
                </Checkbox>
                <Button
                  color="danger"
                  isLoading={formState.isSubmitting}
                  type="submit"
                  variant="flat"
                >
                  Report
                </Button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

const reportSchema = z.object({
  reason: z
    .string({ required_error: 'Select a reason' })
    .min(1, 'Select a reason'),
  description: z.string().optional(),
  blockAuthor: z.boolean(),
})

type TReportSchema = z.infer<typeof reportSchema>

type TReportModal = {
  isOpen: boolean
  onClose: () => void
  onOpenChange: () => void
  post: TPrevPostProps
}
