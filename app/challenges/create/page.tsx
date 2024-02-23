"use client"

import Notification from "./ui/Notification"
import ChallengeInfo from "./ui/ChallengeInfo"
import ChallengeDuration from "./ui/ChallengeDuration"
import { ChallengeFormProvider } from "@/app/utils/hooks/useCreateChallengeFormState"
import CreateChallenge from "./ui/CreateChallenge"
import DebugChallenge from "./ui/DebugChallenge"
import { FormStatusProvider } from "@/app/utils/hooks/useFormStatus"

export default function CreateChallengePage() {
  return (
    <ChallengeFormProvider>
      <FormStatusProvider>
        <main className="w-full">
          <section className="w-full min-h-40">
            <Notification />
          </section>

          <section>
            <ChallengeInfo />
          </section>

          <section>
            <ChallengeDuration />
          </section>

          <section className="my-10">
            <CreateChallenge />
          </section>

          <DebugChallenge />
        </main>
      </FormStatusProvider>
    </ChallengeFormProvider>
  )
}
