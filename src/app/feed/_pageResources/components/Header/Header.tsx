'use client'

import { Search } from '@carbon/icons-react'
import { Input } from '@nextui-org/input'
import { Tab, Tabs } from '@nextui-org/tabs'
import React from 'react'

export const Header = () => {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-zinc-900 pb-2 pr-8">
      <Tabs
        aria-label="Tabs variants"
        classNames={{ cursor: '!bg-zinc-900' }}
        variant="light"
      >
        <Tab key="popular" title="Most Popular" />
        <Tab key="latest" title="Latest" />
        <Tab key="following" title="Following" />
        <Tab key="special" title="Special for me" />
      </Tabs>

      <Input
        className="max-w-[250px]"
        classNames={{ inputWrapper: '!bg-zinc-900' }}
        startContent={<Search className="text-zinc-500" />}
        placeholder="Search for some post"
        variant="flat"
      />
    </header>
  )
}
