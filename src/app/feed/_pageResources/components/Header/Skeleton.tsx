import { Skeleton } from '@nextui-org/skeleton'

export function HeaderSkeleton() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-zinc-900 pb-2 pr-8">
      <div className="flex h-fit flex-nowrap items-center gap-2 overflow-x-scroll rounded-medium bg-transparent p-1 scrollbar-hide dark:bg-transparent">
        <Skeleton className="h-8 w-[106px] rounded-small bg-zinc-900" />
        <Skeleton className="h-8 w-[60px] rounded-small bg-zinc-900" />
        <Skeleton className="h-8 w-[83px] rounded-small bg-zinc-900" />
        <Skeleton className="h-8 w-[111px] rounded-small bg-zinc-900" />
      </div>

      <Skeleton className="h-10 w-[250px] rounded-small bg-zinc-900" />
    </header>
  )
}
