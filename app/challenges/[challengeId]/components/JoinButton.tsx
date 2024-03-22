"use client"

import {
  post_challenges_participate_$challengeId,
} from "@/app/utils/service/challenge"
import { Button } from "@nextui-org/react"
import { toast } from "react-toastify"

export default function JoinButton({ joined, challengeId }: { joined: boolean; challengeId: string }) {
  const join = async () => {
    try {
      await post_challenges_participate_$challengeId(challengeId)
      toast.success("챌린지에 참여하였습니다.");
    } catch (e) {
      console.error(e)
      toast.error("챌린지 참여에 실패하였습니다.\n다시 시도해주세요.");
    }
  }

  return (
    <Button
      onClick={join}
      isDisabled={joined}
      color="primary"
    >
      참여하기
    </Button>
  )
}
