import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export const Main = ({ children, className, stylization }: TMainProps) => {
  return (
    <main
      className={twMerge(
        'relative min-h-screen w-[calc(100vw_-_(100vw_-_100%))]',
        stylization.theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50',
        className,
      )}
    >
      {children}
    </main>
  )
}

type TMainProps = {
  children: ReactNode
  className?: string
  stylization: { theme: 'dark' | 'light' }
}
