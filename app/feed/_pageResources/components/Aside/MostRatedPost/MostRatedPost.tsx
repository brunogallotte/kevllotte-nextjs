import Link from "next/link";

export const MostRatedPost = ({
  title,
  author,
  numberOfLikes,
}: TMostRatedPost) => {
  return (
    <Link className="w-full p-3 hover:bg-zinc-900/50 transition-all duration-300 rounded-lg" href="#">
      <b className="font-medium">{title}</b>

      <footer className="flex items-center justify-between mt-2">
        <span className="text-[14px] text-zinc-500">@{author}</span>
        <span className="text-[14px] text-[#f54180]">
          {numberOfLikes} likes
        </span>
      </footer>
    </Link>
  );
};

type TMostRatedPost = {
  title: string;
  author: string;
  numberOfLikes: number;
};
