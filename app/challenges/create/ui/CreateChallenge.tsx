import { getDaysToBinarySum } from "@/app/utils/dayjs"
import {
  checkInvalid,
  useChallengeForm,
} from "@/app/utils/hooks/useCreateChallengeFormState"
import { useFormStatus } from "@/app/utils/hooks/useFormStatus"
import { post_challenges } from "@/app/utils/service/challenge"
import { Button } from "@nextui-org/react"

export default function CreateChallenge() {
  const [challengeForm, dispatchChallengeForm] = useChallengeForm()
  const [_, dispatchFormStatus] = useFormStatus()

  const createChallenge = async () => {
    if (checkInvalid(challengeForm)) {
      dispatchFormStatus({ type: "SET_IS_INVALID", isInvalid: true })
      return
    }

    const postChallengeForm = {
      ...challengeForm,
      challengeWeekly: getDaysToBinarySum(challengeForm.challengeWeekly),
    }
    try {
      await post_challenges(postChallengeForm)
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
