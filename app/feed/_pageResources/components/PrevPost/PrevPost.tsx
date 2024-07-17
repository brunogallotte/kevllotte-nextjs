import Image from "next/image";

import { HeartFilledIcon } from "@/components/icons";
import dayjs from "dayjs";

export const PrevPost = (props: TPrevPostProps) => {
  return (
    <div className="w-full max-w-[680px] border-b border-zinc-900 pb-6">
      <header className="flex items-center text-[14px] gap-2">
        <Image
          alt="Kevllotte"
          className="max-w-5"
          height={100}
          src="/kevllotte-logo.png"
          width={100}
        />

        <div className="flex items-center gap-1">
          <span className="text-zinc-100">{props.userId}</span>
          <span> & other username</span>
        </div>
      </header>

      <div className="flex items-center mt-6 justify-between">
        <div className="flex flex-col gap-1">
          <b className="text-zinc-100 text-3xl">{props.title}</b>
          <p className="text-zinc-300">{props.content}</p>
        </div>
      </div>

      <footer className="flex items-center mt-4">
        <span>Publicado em {dayjs(props.createdAt).format("DD/MM/YYYY")}</span>
        <span className="flex items-center gap-1">
          <HeartFilledIcon />
          6K
        </span>
      </footer>
    </div>
  );
};

export type TPrevPostProps = {
  id: string;
  title: string;
  content: string;
  userId: string;
  status: number;
  slug: {
    value: string;
  };
  createdAt: string;
  updatedAt: string;
};
