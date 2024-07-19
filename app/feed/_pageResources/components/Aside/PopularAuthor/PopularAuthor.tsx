import { User } from "@nextui-org/user";
import Link from "next/link";

export const PopularAuthor = ({
  author,
  name,
  avatarUrl,
  position,
}: TPopularAuthor) => {
  return (
    <Link className="w-full flex p-3 hover:bg-zinc-900/50 transition-all duration-300 rounded-lg justify-between items-center" href="#">
      <User
        avatarProps={{
          src: avatarUrl,
        }}
        classNames={{ description: "text-sky-600" }}
        description={`$${author}`}
        name={name}
      />
      <div className="p-1 px-3 text-xl font-bold text-zinc-700 rounded-xl">
        {position}º
      </div>
    </Link>
  );
};

type TPopularAuthor = {
  author: string;
  name: string;
  avatarUrl: string;
  position: number;
};
