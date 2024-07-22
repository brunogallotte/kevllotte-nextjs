import Link from 'next/link'

export const MostRatedPost = ({
  title,
  author,
  numberOfLikes,
}: TMostRatedPost) => {
  return (
    <Link
      className="w-full rounded-lg p-3 transition-all duration-300 hover:bg-zinc-900/50"
      href="#"
    >
      <b className="font-medium">{title}</b>

      <footer className="mt-2 flex items-center justify-between">
        <span className="text-[14px] text-zinc-500">@{author}</span>
        <span className="text-[14px] text-[#f54180]">
          {numberOfLikes} likes
        </span>
      </footer>
    </Link>
  )
}

type TMostRatedPost = {
  title: string
  author: string
  numberOfLikes: number
}
