"use client";

import { formatDistanceToNow } from "date-fns";
import { Button } from "@nextui-org/button";
import { ArrowRight, Badge } from "@carbon/icons-react";
import { useState } from "react";
import { Image } from "@nextui-org/image";

import { fetchAddLikeForPost } from "./fetchs/fetch-add-like-for-post";

import { HeartFilledIcon } from "@/components/icons";

export const PrevPost = (props: TPrevPostProps) => {
  const [likesLength, setLikesLength] = useState<number>(props.likes.length);

  const handleAddLikeForPost = async (postId: string) => {
    const responseFetchAddLikeForPost = await fetchAddLikeForPost(postId);

    if (responseFetchAddLikeForPost === 201) {
      setLikesLength(likesLength + 1);
    }
  };

  return (
    <div className="w-full max-w-[730px] border-b border-zinc-900 pb-6">
      <header className="flex items-center text-[14px] gap-2">
        <Image alt="Kevllotte" className="max-w-5" src="/kevllotte-logo.png" />

        <div className="flex items-center gap-1">
          <span className="text-zinc-100">@brunogallotte</span>
          <span> & other username</span>
        </div>
      </header>

      <div className="flex items-center mt-4 justify-between">
        <div className="flex flex-col gap-1">
          <b className="text-zinc-100 text-3xl">{props.title}</b>
          <p className="text-zinc-200 text-lg mt-3">{props.content}</p>
          <p className="text-[14px] text-sky-600">
            #day #js #typescript #foda-se
          </p>
        </div>
        <Image
          isZoomed
          alt=""
          className="border cursor-pointer border-zinc-900"
          src="/reactjsjpg.jpg"
          width={250}
        />
      </div>

      <footer className="flex items-center mt-4">
        <time className="text-[14px] text-zinc-300">
          Published{" "}
          {formatDistanceToNow(new Date(props.createdAt), { addSuffix: true })}
        </time>
        <Button className="ml-3" color="default" size="sm" variant="bordered">
          Ler mais
          <ArrowRight className="w-4 h-4" />
        </Button>
        <div className="flex items-center ml-auto gap-2">
          <Button
            className="flex items-centergap-1"
            color="danger"
            size="sm"
            variant="flat"
            onClick={() => handleAddLikeForPost(props.id)}
          >
            <HeartFilledIcon className="w-4 h-4" />
            {likesLength}
          </Button>

          <Button
            className="flex items-centergap-1"
            color="warning"
            size="sm"
            variant="flat"
          >
            <Badge className="w-4 h-4" />
            Save this post
          </Button>
        </div>
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
  likes: [
    {
      id: string;
      authorId: string;
      postId: string;
      createdAt: Date;
    },
  ];
  createdAt: string;
  updatedAt: string;
};
