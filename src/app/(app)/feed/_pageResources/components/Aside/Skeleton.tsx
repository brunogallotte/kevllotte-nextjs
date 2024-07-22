import { Skeleton } from '@nextui-org/skeleton'

export function AsideSkeleton() {
  return (
    <aside className="w-full max-w-[330px] border-l border-zinc-900 pl-4">
      <h2 className="text-center text-xl font-bold text-zinc-200">
        Most rated posts of this week
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-[101px] w-full rounded-lg bg-zinc-900/50 p-3 transition-all duration-300"
          >
            <div className="space-y-2 pt-1.5">
              <Skeleton className="h-4 w-full rounded-small bg-zinc-900" />
              <Skeleton className="h-4 w-3/5 rounded-small bg-zinc-900" />
            </div>

            <footer className="mt-2 flex items-center justify-between">
              <Skeleton className="mt-1 h-4 w-[97px] rounded-small bg-zinc-900" />
              <Skeleton className="h-4 w-[46px] rounded-small bg-zinc-900" />
            </footer>
          </div>
        ))}
      </div>

      <h3 className="mt-6 text-center text-xl font-bold text-zinc-200">
        Popular authors of the week
      </h3>
      <div className="mt-6 flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex w-full items-center justify-between rounded-lg bg-zinc-900/50 p-3 transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-2 rounded-small">
              <Skeleton className="size-10 rounded-full bg-zinc-900" />

              <div className="flex flex-col items-start gap-1">
                <Skeleton className="h-4 w-16 rounded-small bg-zinc-900" />
                <Skeleton className="h-4 w-24 rounded-small bg-zinc-900" />
              </div>
            </div>

            <div className="rounded-xl p-1 px-3 text-xl font-bold text-zinc-700">
              <Skeleton className="size-8 rounded-small bg-zinc-900" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
