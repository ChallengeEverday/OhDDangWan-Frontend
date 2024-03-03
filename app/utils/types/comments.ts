export type GET_params_comments = {
  page?: number
  size?: number
}

export type CommentResponseDto = {
  commentId: 0
  parentId: 0
  userId: 0
  content: string[]
  children: string[]
}
