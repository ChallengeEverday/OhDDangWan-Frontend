"use client"

import Notification from "./ui/Notification"
import ChallengeInfo from "./ui/ChallengeInfo"
import ChallengeDuration from "./ui/ChallengeDuration"

export default function CreateChallengePage() {
  return (
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
    </main>
  )
}
