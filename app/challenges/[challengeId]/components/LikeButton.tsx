"use client"

import {
  delete_challenges_$challengeId_likes,
  get_challenges_$challengeId_likes,
  post_challenges_$challengeId_likes,
} from "@/app/utils/service/challenge"
import { queryClient } from "@/app/utils/service/query"
import { useUserInfoStore } from "@/app/utils/store/userInfoStore"
import { Button } from "@nextui-org/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io"

export default function LikeButton({ challengeId }: { challengeId: string }) {
  const userInfo = useUserInfoStore((state) => state.userInfo)
  const isLogined = !!userInfo
  const queryKey = ["get_challenges_$challengeId_likes", challengeId]

  const { data } = useQuery({
    queryKey,
    queryFn: () => get_challenges_$challengeId_likes(challengeId),
    enabled: !!challengeId && isLogined,
  })
  const isLiked = data?.data

  const postLike = async () => {
    await post_challenges_$challengeId_likes(challengeId)
    return true
  }

  const deleteLike = async () => {
    await delete_challenges_$challengeId_likes(challengeId)
    return false
  }

  const updateLike = async () => {
    if (isLiked) return deleteLike()
    return postLike()
  }

  const { mutate: mutationLike } = useMutation({
    mutationFn: updateLike,
    onMutate: async (newIsLiked) => {
      await queryClient.cancelQueries({ queryKey })
      const previousIsLiked = queryClient.getQueryData<boolean>(queryKey)
      queryClient.setQueryData(queryKey, () => newIsLiked)

      return { previousIsLiked }
    },
    onError: (err, newTodo, context) => {
      if (context) queryClient.setQueryData(queryKey, context.previousIsLiked)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  return (
    <Button
      onClick={() => mutationLike()}
      isDisabled={!isLogined}
      color="primary"
      variant="light"
      isIconOnly
    >
      {isLiked ? <IoIosHeart size="24" /> : <IoIosHeartEmpty size="24" />}
    </Button>
  )
}
