"use client"

import { post_comments_$challengeId } from "@/app/utils/service/comments"
import { useUserInfoStore } from "@/app/utils/store/userInfoStore"
import { Button, Textarea } from "@nextui-org/react"
import { useParams } from "next/navigation"
import { useState } from "react"

export function CommentInput() {
  const userInfo = useUserInfoStore((state) => state.userInfo)
  const params = useParams()
  const [comment, setComment] = useState("")

  const postComment = async (content: string) => {
    try {
      await post_comments_$challengeId(params.challengeId as string, {
        content,
      })
    } catch (e) {
      console.error(e)
      throw new Error("댓글을 생성하는데 실패하였습니다")
    }
  }

  if (userInfo) {
    const { nickname } = userInfo
    return (
      <div className="w-full flex flex-col justify-end gap-2">
        <Textarea
          variant="bordered"
          labelPlacement="outside"
          placeholder={`${nickname}(으)로 댓글 달기...`}
          className="w-full"
          content={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            onClick={async () => {
              await postComment(comment)
              setComment("")
            }}
            size="lg"
            className="grow-0"
            variant="solid"
          >
            등록
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex gap-2">
      <Textarea
        variant="bordered"
        labelPlacement="outside"
        placeholder={"로그인 후 댓글을 달아주세요."}
        readOnly
        className="w-full"
      />
      <Button isDisabled variant="solid">
        등록
      </Button>
    </div>
  )
}
