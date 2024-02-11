import { getDaysToBinarySum } from "@/app/utils/dayjs"
import {
  checkInvalid,
  useChallengeForm,
} from "@/app/utils/hooks/useCreateChallengeFormState"
import { useFormStatus } from "@/app/utils/hooks/useFormStatus"
import { post_challenges } from "@/app/utils/service/challenge"
import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"

export default function CreateChallenge() {
  const [challengeForm, dispatchChallengeForm] = useChallengeForm()
  const [_, dispatchFormStatus] = useFormStatus()
  const router = useRouter()

  const createChallenge = async () => {
    if (checkInvalid(challengeForm)) {
      dispatchFormStatus({ type: "SET_IS_INVALID", isInvalid: true })
      console.log("챌린지 폼이 유효하지 않습니다!", { challengeForm })
      return
    }

    const postChallengeForm = {
      ...challengeForm,
      challengeCycle: getDaysToBinarySum(challengeForm.challengeCycle),
    }
    try {
      const { data } = await post_challenges(postChallengeForm)
      router.push(`/challenges/${data}`)

      dispatchChallengeForm({ type: "RESET_CHALLENGE" })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button size="lg" onClick={createChallenge} variant="solid" color="primary">
      챌린지 생성하기
    </Button>
  )
}
