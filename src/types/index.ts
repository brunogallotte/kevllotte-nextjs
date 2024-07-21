import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export type TUser = {
  author: {
    id: string
    username: string
    name: string
    email: string
    bio?: string
    avatarUrl?: string
    createdAt: string
    updatedAt?: string
  }
}
