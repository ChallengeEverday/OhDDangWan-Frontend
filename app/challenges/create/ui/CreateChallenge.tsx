import { getDaysToBinarySum } from "@/app/utils/dayjs"
import { useChallengeForm } from "@/app/utils/hooks/useCreateChallengeFormState"
import { post_challenges } from "@/app/utils/service/challenge"
import { Button } from "@nextui-org/react"

export default function CreateChallenge() {
  const [challengeForm, dispatch] = useChallengeForm()

  const createChallenge = async () => {
    const postChallengeForm = {
      ...challengeForm,
      challengeWeekly: getDaysToBinarySum(challengeForm.challengeWeekly),
    }
    try {
      await post_challenges(postChallengeForm)
      dispatch({ type: "RESET_CHALLENGE" })
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
