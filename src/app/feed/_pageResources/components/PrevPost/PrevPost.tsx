'use client'

import { ArrowRight, Badge } from '@carbon/icons-react'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'

import { HeartFilledIcon } from '@/components/icons'

import { MoreOptionsDropdown } from './Dropdown/Dropdown'
import {
  fetchAddOrRemoveLikeForPost,
  TFetchAddOrRemoveLikeForPost,
} from './fetchs/fetch-add-like-for-post'
import { fetchSavePost } from './fetchs/fetch-save-post'

export const PrevPost = (props: TPrevPostProps) => {
  const [likesLength, setLikesLength] = useState<number>(props.likes.length)

  const handleAddLikeForPost = async ({
    postId,
    postLike,
  }: TFetchAddOrRemoveLikeForPost) => {
    const responseFetchAddLikeForPost = await fetchAddOrRemoveLikeForPost({
      postId,
      postLike,
    })

    if (responseFetchAddLikeForPost === 201) {
      return setLikesLength(likesLength + 1)
    }

    setLikesLength(likesLength - 1)
  }

  const handleSavePost = async (postId: string) => {
    const responseFetchSavePost = await fetchSavePost(postId)
  }

  return (
    <div className="w-full max-w-[730px] border-b border-zinc-900 pb-6">
      <header className="flex items-center gap-2 text-[14px]">
        <Image alt="Kevllotte" className="max-w-5" src="/kevllotte-logo.png" />

        <div className="flex items-center gap-1">
          <span className="text-zinc-100">@brunogallotte</span>
          <span> & other username</span>
        </div>
      </header>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <b className="text-3xl text-zinc-100">{props.title}</b>
          <p className="mt-3 text-lg text-zinc-200">{props.content}</p>
          <p className="text-[14px] text-sky-600">
            #day #js #typescript #foda-se
          </p>
        </div>
        <Image
          isZoomed
          alt=""
          className="cursor-pointer border border-zinc-900"
          src="/reactjsjpg.jpg"
          width={250}
        />
      </div>

      <footer className="mt-4 flex items-center">
        <time className="text-[14px] text-zinc-300">
          Published{' '}
          {formatDistanceToNow(new Date(props.createdAt), { addSuffix: true })}
        </time>
        <Button className="ml-3" color="default" size="sm" variant="bordered">
          Ler mais
          <ArrowRight className="h-4 w-4" />
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <Button
            className="items-centergap-1 flex"
            color="danger"
            size="sm"
            variant="flat"
            onClick={() =>
              handleAddLikeForPost({ postId: props.id, postLike: props.likes })
            }
          >
            <HeartFilledIcon className="h-4 w-4" />
            {likesLength}
          </Button>

          <Button
            className="items-centergap-1 flex"
            color="warning"
            size="sm"
            variant="flat"
            onClick={() => handleSavePost(props.id)}
          >
            <Badge className="h-4 w-4" />
            Save this post
          </Button>

          <MoreOptionsDropdown />
        </div>
      </footer>
    </div>
  )
}

export type TPrevPostProps = {
  id: string
  title: string
  content: string
  userId: string
  status: number
  slug: {
    value: string
  }
  likes: [
    {
      id: string
      authorId: string
      postId: string
      createdAt: Date
    },
  ]
  createdAt: string
  updatedAt: string
}
