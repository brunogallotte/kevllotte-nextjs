import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export const ContentWrapper = ({
  children,
  ...props
}: TContentWrapperProps) => {
  return (
    <props.element
      className={twMerge(
        'mx-auto w-full max-w-6xl px-4 lg:px-6',
        props.className,
      )}
    >
      {children}
    </props.element>
  )
}

type TContentWrapperProps = {
  element: 'div' | 'section'
  children: ReactNode
  className?: string
}
