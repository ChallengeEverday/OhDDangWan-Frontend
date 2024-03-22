import DebugLogClient from "@/app/ui/Debug/DebugLogClient"
import { useChallengeForm } from "@/app/utils/hooks/useCreateChallengeFormState"

export default function DebugChallenge() {
  const [challengeForm] = useChallengeForm()

  return <DebugLogClient object={challengeForm} />
}
