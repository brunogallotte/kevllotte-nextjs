'use client'

import { Home } from '@carbon/icons-react'
import { Tab, Tabs } from '@nextui-org/tabs'

import { AvatarDropdown } from './AvatarDropdown/AvatarDropdown'

export const Navbar = () => {
  return (
    <nav className="fixed bottom-4 left-[50%] z-20 flex min-h-[72px] w-full max-w-[660px] translate-x-[-50%] items-center rounded-3xl border border-zinc-900 bg-zinc-950/75 p-2 backdrop-blur-md">
      <div className="flex w-full max-w-[430px] items-center gap-4">
        <div className="w-full rounded-full text-zinc-300">
          <div className="flex min-h-10 min-w-10 max-w-14 items-center justify-center rounded-full bg-zinc-900 transition-all duration-300 hover:bg-zinc-800">
            <Home />
          </div>
        </div>
        <Tabs
          aria-label="Tabs variants"
          classNames={{ cursor: '!bg-zinc-900' }}
          variant="underlined"
        >
          <Tab
            key="popular"
            className="!text-red-500"
            title="Publish new post"
          />
          <Tab key="latest" title="My posts" />
          <Tab key="following" title="Saved posts" />
        </Tabs>
      </div>
      <AvatarDropdown />
    </nav>
  )
}
