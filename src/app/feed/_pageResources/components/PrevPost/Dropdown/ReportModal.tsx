'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Checkbox } from '@nextui-org/checkbox'
import { Textarea } from '@nextui-org/input'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal'
import { Select, SelectItem } from '@nextui-org/select'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const ReportModal = ({
  onClose,
  isOpen,
  onOpenChange,
}: TReportModal) => {
  const [selectValue, setSelectValue] = useState<string>('')

  const { register, handleSubmit, formState } = useForm<TReportSchema>({
    resolver: zodResolver(reportSchema),
  })

  const onSubmit = (data: TReportSchema) => {
    console.log(data)

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
}
