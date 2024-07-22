'use client'

import { ArrowRight, Badge } from '@carbon/icons-react'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import { formatDistanceToNow } from 'date-fns'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { HeartFilledIcon } from '@/components/icons'

import { MoreOptionsDropdown } from './Dropdown/Dropdown'
import {
  fetchAddOrRemoveLikeForPost,
  TFetchAddOrRemoveLikeForPost,
} from './fetchs/fetch-add-like-for-post'
import { fetchSaveOrRemoveSavedPost } from './fetchs/fetch-save-or-remove-saved-post'

export const PrevPost = (props: TPrevPostProps) => {
  const [likesLength, setLikesLength] = useState<number>(props.likes.length)
  const [isPending, startTransition] = useTransition()

  const handleAddLikeForPost = async ({
    postId,
  }: TFetchAddOrRemoveLikeForPost) => {
    startTransition(async () => {
      const responseFetchAddLikeForPost = await fetchAddOrRemoveLikeForPost({
        postId,
      })

      if (responseFetchAddLikeForPost === 201) {
        return setLikesLength(likesLength + 1)
      }

      setLikesLength(likesLength - 1)
    })
  }

  const handleSavePost = async (postId: string) => {
    const saveOrRemoveSavedPostResponse =
      await fetchSaveOrRemoveSavedPost(postId)

    if (saveOrRemoveSavedPostResponse.status === 200) {
      toast.success(saveOrRemoveSavedPostResponse.title, {
        description: saveOrRemoveSavedPostResponse.description,
      })
    } else if (saveOrRemoveSavedPostResponse.status === 404) {
      toast.success('Error!', {
        description: 'Post not found. Please try again later.',
      })
    } else {
      toast.success('Error!', {
        description: 'There was an error when trying to save the post.',
      })
    }
  }

  return (
    <div className="w-full max-w-[730px] border-b border-zinc-900 pb-6">
      <header className="flex items-center gap-2 text-[14px]">
        <Image alt="Kevllotte" className="max-w-5" src="/kevllotte-logo.png" />

        <div className="flex items-center gap-1">
          <span className="text-zinc-100">@{props.userId}</span>
          <span> & other username</span>
        </div>
      </header>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex w-full max-w-md flex-col gap-1 overflow-hidden">
          <b className="truncate text-3xl text-zinc-100">
            abshkdgasdgasgdhkasgdhkasgdhkasgdhkasgkdhgashkg
          </b>
          <p className="mt-3 text-lg text-zinc-200">
            Test post content just to create the skeletons
            bdsakhbdhkasgdhasgdhkasgdhkasghkdgashkdgashkdgashkdghask
          </p>
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
            isDisabled={isPending}
            onClick={() => handleAddLikeForPost({ postId: props.id })}
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

export type TPrevPostLikeProps = {
  id: string
  authorId: string
  postId: string
  createdAt: Date
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
  likes: TPrevPostLikeProps[]
  createdAt: string
  updatedAt: string
}
