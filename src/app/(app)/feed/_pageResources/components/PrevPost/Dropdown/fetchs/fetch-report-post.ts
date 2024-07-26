'use server'

import { fetchUserData } from '@/app/_actions/fetch-user-data'
import { verifyJwtAction } from '@/app/_actions/verify-jwt-action'

export const fetchReportPost = async ({
  postId,
  reason,
  description,
}: TFetchReportPost) => {
  const tokenJwt = await verifyJwtAction()

  const user = await fetchUserData()
  const userId = user.author.id

  const reportPostResponse = await fetch(
    `${process.env.KEVLLOTTE_API_URL}/posts/${postId}/report`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenJwt.value}`,
      },
      body: JSON.stringify({
        reportedById: userId,
        reportedPostId: postId,
        reason,
        description,
      }),
    },
  )

  return {
    status: reportPostResponse.status,
    title: 'Success!',
    description: 'Post reported successfully!',
  }
}

export type TReportPostData = {
  report: {
    id: string
    reportedById: string
    reportedPostId: string
    reason: string
    description: string
    createdAt: string
  }
}

export type TFetchReportPost = {
  postId: string
  reason: string
  description?: string
}
