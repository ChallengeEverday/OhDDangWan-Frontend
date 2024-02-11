"use client"

import Notification from "./ui/Notification"
import ChallengeInfo from "./ui/ChallengeInfo"
import ChallengeDuration from "./ui/ChallengeDuration"
import { ChallengeFormProvider } from "@/app/utils/hooks/useCreateChallengeFormState"
import CreateChallenge from "./ui/CreateChallenge"

export default function CreateChallengePage() {
  return (
    <ChallengeFormProvider>
      <main className="w-full">
        <section className="w-full bg-red-50 h-40">
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
      </main>
    </ChallengeFormProvider>
  )
}
