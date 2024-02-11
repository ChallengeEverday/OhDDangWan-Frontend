import { getDaysToBinarySum } from "@/app/utils/dayjs"
import {
  checkInvalid,
  useChallengeForm,
} from "@/app/utils/hooks/useCreateChallengeFormState"
import { useFormStatus } from "@/app/utils/hooks/useFormStatus"
import { post_challenges } from "@/app/utils/service/challenge"
import { Button, Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateChallenge() {
  const [challengeForm, dispatchChallengeForm] = useChallengeForm()
  const [isLoading, setIsLoading] = useState(false)
  const [_, dispatchFormStatus] = useFormStatus()
  const router = useRouter()

  const createChallenge = async () => {
    if (checkInvalid(challengeForm)) {
      dispatchFormStatus({ type: "SET_IS_INVALID", isInvalid: true })
      console.log("챌린지 폼이 유효하지 않습니다!", { challengeForm })
      return
    }

    setIsLoading(true)

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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        size="lg"
        onClick={createChallenge}
        variant="solid"
        color="primary"
      >
        챌린지 생성하기
      </Button>
      {isLoading && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-white/[.7] z-50 flex justify-center items-center">
          <Spinner color="primary" size="lg" />
        </div>
      )}
    </>
  )
}
