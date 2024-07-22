import { mock } from './MostRatedPost/mock'
import { MostRatedPost } from './MostRatedPost/MostRatedPost'
import { mockUsers } from './PopularAuthor/mock'
import { PopularAuthor } from './PopularAuthor/PopularAuthor'

export const Aside = () => {
  return (
    <aside className="w-full max-w-[330px] border-l border-zinc-900 pl-4">
      <h2 className="text-center text-xl font-bold text-zinc-200">
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

      <h3 className="mt-6 text-center text-xl font-bold text-zinc-200">
        Popular authors of the week
      </h3>
      <div className="mt-6 flex flex-col gap-3">
        {mockUsers.map((item, key) => {
          return (
            <PopularAuthor
              key={key}
              author={item.author}
              avatarUrl={item.avatarUrl}
              name={item.name}
              position={key + 1}
            />
          )
        })}
      </div>
    </aside>
  )
}
