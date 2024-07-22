import { Skeleton } from '@nextui-org/skeleton'

export function PrevPostSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="w-full max-w-[730px] border-b border-zinc-900 pb-6"
        >
          <header className="flex items-center gap-2 text-[14px]">
            <Skeleton className="h-[22px] w-5 rounded-full bg-zinc-900" />

            <div className="flex items-center gap-1">
              <Skeleton className="h-5 w-64 rounded-small bg-zinc-900" />
            </div>
          </header>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex w-full max-w-md flex-col gap-1">
              <Skeleton className="h-8 w-full rounded-small bg-zinc-900" />

              <div className="mt-3 flex flex-col gap-2">
                <Skeleton className="h-6 w-full rounded-small bg-zinc-900" />
                <Skeleton className="h-6 w-4/5 rounded-small bg-zinc-900" />
              </div>

              <Skeleton className="mt-1 h-4 w-2/5 rounded-small bg-zinc-900" />
            </div>

            <Skeleton className="aspect-video w-[250px] rounded-large bg-zinc-900" />
          </div>

          <footer className="mt-4 flex items-center">
            <Skeleton className="h-4 w-44 rounded-small bg-zinc-900" />

            <Skeleton className="ml-3 h-8 w-[95px] rounded-small bg-zinc-900" />

            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-8 w-16 rounded-small bg-zinc-900" />

              <Skeleton className="h-8 w-[121px] rounded-small bg-zinc-900" />

              <Skeleton className="size-8 rounded-small bg-zinc-900" />
            </div>
          </footer>
        </div>
      ))}
    </>
  )
}
