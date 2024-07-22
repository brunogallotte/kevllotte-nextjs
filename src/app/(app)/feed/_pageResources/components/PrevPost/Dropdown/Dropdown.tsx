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

import { ReportModal } from './ReportModal'

export const MoreOptionsDropdown = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

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
            <DropdownItem key="follow" startContent={<UserFollow />}>
              Follow this user
            </DropdownItem>
            <DropdownItem
              key="follow"
              description="Recommend more posts like this to me"
              startContent={<View />}
            >
              Show more
            </DropdownItem>
            <DropdownItem
              key="follow"
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
