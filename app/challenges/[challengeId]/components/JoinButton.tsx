"use client"

import {
  get_challenges_participate_$challengeId_status,
  post_challenges_participate_$challengeId,
} from "@/app/utils/service/challenge"
import { isError } from "@/app/utils/types/api";
import { Button } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify"

export default function JoinButton({ challengeId }: { challengeId: string }) {
  const join = async () => {
    try {
      await post_challenges_participate_$challengeId(challengeId)
      toast.success("챌린지에 참여하였습니다.");
    } catch (e: unknown) {
      if (isError(e) && e.errors.find((error) => error.errorCode === 50400)) {
        return toast.error("이미 참여한 챌린지입니다.");
      }
      toast.error("챌린지 참여에 실패하였습니다.\n다시 시도해주세요.");
    }
  }

  const { data } = useQuery({
    queryKey: ["challenges", challengeId, "participate"],
    queryFn: () => get_challenges_participate_$challengeId_status(challengeId),
    enabled: !!challengeId,
  })

  const isJoined = data?.data

  return (
    <Button
      onClick={join}
      isDisabled={isJoined}
      color="primary"
    >
      {isJoined ? "참여중" : "참여하기"}
    </Button>
  )
}
