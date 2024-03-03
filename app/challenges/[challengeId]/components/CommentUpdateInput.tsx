"use client"

import {
  put_comments_$commentId,
  refetch_comments_$challengeId,
} from "@/app/utils/service/comments"
import { Button, Textarea } from "@nextui-org/react"
import { useParams } from "next/navigation"
import { useLayoutEffect, useState } from "react"

type CommentUpdateInputProps = {
  commentId: number
  content: string
  finishEdit: () => void
}
export function CommentUpdateInput({
  commentId,
  content: defaultContent,
  finishEdit,
}: CommentUpdateInputProps) {
  const [comment, setComment] = useState(defaultContent)
  const params = useParams()

  useLayoutEffect(() => {
    setComment(defaultContent)
  }, [defaultContent])

  const putComment = async (content: string) => {
    if (content.trim() === "") return
    await put_comments_$commentId(commentId, content.trim())
  }

  return (
    <div className="w-full flex flex-col justify-end gap-2 my-5">
      <Textarea
        variant="bordered"
        labelPlacement="outside"
        className="w-full"
        value={comment}
        onChange={(e) => {
          console.log("onChange", e.target.value)
          setComment(e.target.value)
        }}
      />
      <div className="flex justify-end gap-2">
        <Button
          onClick={async (e) => {
            e.preventDefault()
            await putComment(comment)
            await refetch_comments_$challengeId(params.challengeId as string)
            setComment("")
            finishEdit()
          }}
          className="grow-0"
          variant="flat"
        >
          수정
        </Button>
        <Button onClick={finishEdit} className="grow-0" variant="flat">
          취소
        </Button>
      </div>
    </div>
  )
}
