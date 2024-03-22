import { get_challenge_$challengeId } from "@/app/utils/service/challenge"
import ChallengeForm from "../../../ui/ChallengeForm/ChallengeForm"

export default async function CreateChallengePage({
  params,
}: {
  params: { challengeId: string }
}) {
  const challenge = await get_challenge_$challengeId(params.challengeId)

  return (
    <ChallengeForm
      isModify
      initalForm={{
        title: challenge.title,
        description: challenge.description,
        challengeStartDate: challenge.challengeStartDate,
        challengeEndDate: challenge.challengeEndDate,
        category: challenge.category,
        hashtags: challenge.hashtags,
        // thumbnailImage: challenge.thumbnailImageUrl,
      }}
    />
  )
}
