import { Pagenation } from "../types/challenge"
import { CommentResponseDto, GET_params_comments } from "../types/comments"
import api from "./api"

export const get_comments_$challengeId = async (
  challengeId: number,
  params?: GET_params_comments,
) => {
  const paramsDefault = {
    page: 0,
    size: 10,
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
  challengeId: number,
  parentId: number,
  content: string,
) => {
  try {
    const result = await api.post<CommentResponseDto>(
      `/v1/comments/${challengeId}`,
      {
        content,
        parentId,
      },
    )

    return result
  } catch (e) {
    console.error(e)
    throw new Error(
      `댓글을 생성하는데 실패하였습니다. post /v1/comments/${challengeId}`,
    )
  }
}

export const pust_comments_$commentId = async (
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
