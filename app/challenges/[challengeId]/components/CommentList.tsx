"use client"

import {
  delete_comments_$commentId,
  get_comments_$challengeId,
  queryKey_comments_$challengeId,
} from "@/app/utils/service/comments"
import { useUserInfoStore } from "@/app/utils/store/userInfoStore"
import { Button, Divider, User } from "@nextui-org/react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import React, { useState } from "react"
import { CommentUpdateInput } from "./CommentUpdateInput"
import { CommentResponseDto } from "@/app/utils/types/comments"
import TimeAgo from "@/app/ui/TimeAgo"
import { FaCrown } from "react-icons/fa6"

export function CommentList({ ownerId }: { ownerId: number }) {
  const params = useParams()
  const [editCommentId, setEditCommentId] = useState(-1)

  const getComments = async (pageParam: number) => {
    const { data } = await get_comments_$challengeId(
      params.challengeId as string,
      { page: pageParam },
    )
    return data
  }

  const { data, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: queryKey_comments_$challengeId(params.challengeId as string),
      enabled: !!params.challengeId,
      queryFn: ({ pageParam }) => getComments(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (
          lastPage.metadata.totalPageCount === 0 ||
          lastPage.metadata.currentPageNumber ===
            lastPage.metadata.totalPageCount - 1
        )
          return null
        return lastPage.metadata.currentPageNumber + 1
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.metadata.currentPageNumber === 0) return null
        return firstPage.metadata.currentPageNumber - 1
      },
    })

  return (
    <ul>
      {data?.pages[0].result.length === 0 ? (
        <div className="w-full text-foreground-400 p-5 text-center">
          댓글이 없습니다.
        </div>
      ) : null}
      {data?.pages.map(({ result, metadata }) => (
        <React.Fragment key={metadata.currentPageNumber}>
          {result.map(({ commentId, content, ...restProps }) => (
            <li className="w-full" key={commentId}>
              {editCommentId === commentId ? (
                <CommentUpdateInput
                  finishEdit={() => setEditCommentId(-1)}
                  commentId={commentId}
                  content={content}
                />
              ) : (
                <Comment
                  ownerId={ownerId}
                  commentId={commentId}
                  content={content}
                  refetch={refetch}
                  setEditCommentId={setEditCommentId}
                  {...restProps}
                />
              )}
              <Divider />
            </li>
          ))}
        </React.Fragment>
      ))}
      {hasNextPage ? (
        <div className="w-full mt-5 flex justify-center">
          <Button
            isLoading={isFetchingNextPage}
            variant="flat"
            onClick={() => fetchNextPage()}
          >
            다음 댓글 5개 더보기
          </Button>
        </div>
      ) : null}
    </ul>
  )
}

type CommentProps = {
  ownerId: number
  refetch: () => void
  setEditCommentId: (id: number) => void
} & CommentResponseDto

function Comment({
  ownerId,
  commentId,
  userId,
  userName,
  profileImageUrl,
  content,
  refetch,
  setEditCommentId,
  createdAt,
  modifiedAt,
}: CommentProps) {
  const myInfo = useUserInfoStore((state) => state.userInfo)

  return (
    <div className="w-full flex flex-col justify-start items-start gap-2 p-3">
      <div className="flex w-full justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <div className="relative">
            <User
              name={userName}
              avatarProps={{
                src: profileImageUrl,
              }}
            />
            {ownerId === userId ? (
              <FaCrown
                className="absolute text-yellow-300 -top-3 -left-1 -rotate-[31deg] scale-y-[0.7]"
                size={20}
              />
            ) : null}
          </div>

          <span className="text-xs text-foreground-400">
            <TimeAgo date={modifiedAt} />
          </span>
          {createdAt !== modifiedAt && (
            <span className="text-xs text-foreground-400 text-primary-300">
              수정됨
            </span>
          )}
        </div>
        {myInfo?.userId === userId ? (
          <div className="flex h-5 items-center space-x-4 text-small">
            <button
              onClick={() => {
                setEditCommentId(commentId)
              }}
              className="text-foreground-400"
            >
              수정
            </button>
            <Divider orientation="vertical" />
            <button
              onClick={async () => {
                await delete_comments_$commentId(commentId)
                refetch()
              }}
              className="text-primary-400"
            >
              삭제
            </button>
          </div>
        ) : null}
      </div>
      {content}
    </div>
  )
}
