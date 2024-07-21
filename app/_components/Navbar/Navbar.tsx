"use client";

import { Home } from "@carbon/icons-react";
import { Tab, Tabs } from "@nextui-org/tabs";

import { AvatarDropdown } from "./AvatarDropdown/AvatarDropdown";

export const Navbar = () => {
  return (
    <nav className="w-full z-20 flex max-w-[660px] min-h-[72px] items-center fixed bottom-4 left-[50%] translate-x-[-50%] p-2 bg-zinc-950/75 border border-zinc-900 backdrop-blur-md rounded-3xl">
      <div className="flex items-center w-full gap-4 max-w-[430px]">
        <div className="text-zinc-300 rounded-full w-full">
          <div className=" rounded-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 min-w-10 max-w-14 flex items-center justify-center min-h-10">
            <Home />
          </div>
        </div>
        <Tabs
          aria-label="Tabs variants"
          classNames={{ cursor: "!bg-zinc-900" }}
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
  );
};
