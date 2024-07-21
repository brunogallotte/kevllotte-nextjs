import { User } from '@nextui-org/user'
import Link from 'next/link'

export const PopularAuthor = ({
  author,
  name,
  avatarUrl,
  position,
}: TPopularAuthor) => {
  return (
    <Link
      className="flex w-full items-center justify-between rounded-lg p-3 transition-all duration-300 hover:bg-zinc-900/50"
      href="#"
    >
      <User
        avatarProps={{
          src: avatarUrl,
        }}
        classNames={{ description: 'text-sky-600' }}
        description={`$${author}`}
        name={name}
      />
      <div className="rounded-xl p-1 px-3 text-xl font-bold text-zinc-700">
        {position}º
      </div>
    </Link>
  )
}

type TPopularAuthor = {
  author: string
  name: string
  avatarUrl: string
  position: number
}
