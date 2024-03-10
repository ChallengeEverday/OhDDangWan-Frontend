export type GET_params_comments = {
  page?: number
  size?: number
}

export type POST_params_comments = {
  parentId?: number
  content: string
}

export type CommentResponseDto = {
  commentId: number
  parentId: number
  userId: number
  userName: string
  profileImageUrl: string
  content: string
  children: CommentResponseDto[]
  createdAt: string
  modifiedAt: string
}
