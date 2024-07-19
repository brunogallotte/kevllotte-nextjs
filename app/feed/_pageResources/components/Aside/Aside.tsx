import { MostRatedPost } from "./MostRatedPost/MostRatedPost";
import { mock } from "./MostRatedPost/mock";
import { PopularAuthor } from "./PopularAuthor/PopularAuthor";
import { mockUsers } from "./PopularAuthor/mock";

export const Aside = () => {
  return (
    <aside className="w-full border-l pl-4 border-zinc-900 max-w-[330px]">
      <h2 className="text-xl font-bold text-zinc-200 text-center">
        Most rated posts of this week
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        {mock.map((item, key) => (
          <MostRatedPost
            key={key}
            author={item.author}
            numberOfLikes={item.numberOfLikes}
            title={item.title}
          />
        ))}
      </div>

      <h3 className="text-xl mt-6 font-bold text-zinc-200 text-center">
        Popular authors of the week
      </h3>
      <div className="flex flex-col mt-6 gap-3">
        {mockUsers.map((item, key) => {
          return (
            <PopularAuthor
              key={key}
              author={item.author}
              avatarUrl={item.avatarUrl}
              name={item.name}
              position={key + 1}
            />
          );
        })}
      </div>
    </aside>
  );
};
