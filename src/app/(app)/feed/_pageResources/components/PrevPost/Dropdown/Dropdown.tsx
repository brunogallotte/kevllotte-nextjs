'use client'

import {
  OverflowMenuVertical,
  UserFollow,
  View,
  ViewOff,
} from '@carbon/icons-react'
import { Button } from '@nextui-org/button'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import { useDisclosure } from '@nextui-org/modal'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { fetchFollowOrUnfollowUser } from './fetchs/fetch-follow-or-unfollow-user'
import { ReportModal } from './ReportModal'

export const MoreOptionsDropdown = ({ userId }: TMoreOptionsDropdown) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const { mutateAsync: handleFollowOrUnfollowUserMutation } = useMutation({
    mutationKey: [`${userId}-follow`],
    mutationFn: (userId: string) => fetchFollowOrUnfollowUser({ userId }),
    onSuccess: (data) => {
      if (data.status === 200 || data.status === 204) {
        toast.success(data.title, {
          description: data.description,
        })
      } else if (data.status === 404) {
        toast.success('Error!', {
          description: 'Post not found. Please try again later.',
        })
      } else {
        toast.error('Error!', {
          description: 'There was an error when trying to follow this user.',
        })
      }
    },
  })

  return (
    <>
      <Dropdown
        showArrow
        classNames={{
          base: 'before:bg-default-200', // change arrow background
          content: 'p-0 border-small border-divider bg-background',
        }}
        radius="sm"
      >
        <DropdownTrigger>
          <Button disableRipple size="sm" isIconOnly variant="ghost">
            <OverflowMenuVertical />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Custom item styles"
          className="p-3"
          disabledKeys={['profile']}
          itemClasses={{
            base: [
              'rounded-md',
              'text-default-500',
              'transition-opacity',
              'data-[hover=true]:text-foreground',
              'data-[hover=true]:bg-default-100',
              'dark:data-[hover=true]:bg-default-50',
              'data-[selectable=true]:focus:bg-default-50',
              'data-[pressed=true]:opacity-70',
              'data-[focus-visible=true]:ring-default-500',
            ],
          }}
        >
          <DropdownSection showDivider aria-label="Profile & Actions">
            <DropdownItem
              key="follow"
              startContent={<UserFollow />}
              onClick={() => handleFollowOrUnfollowUserMutation(userId)}
            >
              Follow this user
            </DropdownItem>
            <DropdownItem
              key="recommend-more"
              description="Recommend more posts like this to me"
              startContent={<View />}
            >
              Show more
            </DropdownItem>
            <DropdownItem
              key="recomend-less"
              description="Avoid showing me similar posts"
              startContent={<ViewOff />}
            >
              Show less
            </DropdownItem>
          </DropdownSection>

          <DropdownSection aria-label="Preferences">
            <DropdownItem
              key="report"
              className="text-red-500"
              onClick={onOpen}
            >
              Report this post
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <ReportModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  )
}

export type TMoreOptionsDropdown = {
  userId: string
}
