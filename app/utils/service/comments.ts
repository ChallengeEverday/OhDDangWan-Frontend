import { String } from "aws-sdk/clients/acm"
import { Pagenation } from "../types/challenge"
import {
  CommentResponseDto,
  GET_params_comments,
  POST_params_comments,
} from "../types/comments"
import api from "./api"
import { queryClient } from "./query"

export const queryKey_comments_$challengeId = (challengeId: String) => [
  "challenges",
  challengeId,
  "comments",
]

export const refetch_comments_$challengeId = async (challengeId: String) => {
  await queryClient.refetchQueries({
    queryKey: queryKey_comments_$challengeId(challengeId),
  })
}

export const get_comments_$challengeId = async (
  challengeId: string,
  params?: GET_params_comments,
) => {
  const paramsDefault = {
    page: 0,
    size: 5,
    ...params,
  }

  const queryString = new URLSearchParams(paramsDefault as any).toString()

  try {
    const result = await api.get<Pagenation<CommentResponseDto[]>>(
      `/v1/comments/${challengeId}?${queryString}`,
    )

    return result
  } catch (e) {
    console.error(e)
    throw new Error(
      `댓글을 불러오는데 실패하였습니다. get /v1/comments/${challengeId}/comments?${queryString}}`,
    )
  }
}

export const post_comments_$challengeId = async (
  challengeId: string,
  params: POST_params_comments,
) => {
  try {
    const result = await api.post<CommentResponseDto>(
      `/v1/comments/${challengeId}`,
      params,
    )

    return result
  } catch (e) {
    console.error(e)
    throw new Error(
      `댓글을 생성하는데 실패하였습니다. post /v1/comments/${challengeId}`,
    )
  }
}

export const put_comments_$commentId = async (
  commentId: number,
  content: string,
) => {
  try {
    const result = await api.put(`/v1/comments/${commentId}`, {
      content,
    })

    return result
  } catch (e) {
    console.error(e)
    throw new Error(
      `댓글을 수정하는데 실패하였습니다. put /v1/comments/${content}`,
    )
  }
}

export const delete_comments_$commentId = async (commentId: number) => {
  try {
    const result = await api.delete(`/v1/comments/${commentId}`)

    return result
  } catch (e) {
    console.error(e)
    throw new Error(
      `댓글을 삭제하는데 실패하였습니다. delete /v1/comments/${commentId}`,
    )
  }
}
