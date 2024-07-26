'use client'

import { ChartLine, Help, Settings, UserFilled } from '@carbon/icons-react'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import { User } from '@nextui-org/user'
import React, { useEffect, useState } from 'react'

import { fetchUserData } from '@/app/_actions/fetch-user-data'
import type { TUser } from '@/types'

export const AvatarDropdown = () => {
  const [user, setUser] = useState<TUser | null>(null)

  useEffect(() => {
    const handleFetchUserData = async () => {
      const user = await fetchUserData()

      setUser(user)
    }

    handleFetchUserData()
  }, [])

  return (
    <div className="ml-auto flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: 'https://github.com/brunogallotte.png',
            }}
            className="transition-transform"
            description={`@${user?.author.username}`}
            name={user?.author.name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@{user?.author.username}</p>
          </DropdownItem>
          <DropdownItem key="my-profile" startContent={<UserFilled />}>
            My profile
          </DropdownItem>
          <DropdownItem key="analytics" startContent={<ChartLine />}>
            Analytics
          </DropdownItem>
          <DropdownItem key="help-and-feedback" startContent={<Help />}>
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="settings" startContent={<Settings />}>
            Settings
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
