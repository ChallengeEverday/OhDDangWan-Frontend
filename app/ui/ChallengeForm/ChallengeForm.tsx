"use client"

import Notification from "./Notification"
import ChallengeInfo from "./ChallengeInfo"
import ChallengeDuration from "./ChallengeDuration"
import CreateChallenge from "./CreateChallenge"
import DebugChallenge from "./DebugChallenge"
import { FormStatusProvider } from "@/app/utils/hooks/useFormStatus"
import { ChallengeForm } from "@/app/utils/types/challenge"
import { defaultChallengeForm, ChallengeFormProvider } from "@/app/utils/hooks/useCreateChallengeFormState"

export default function ChallengeForm({ initalForm, isModify }: { initalForm?: Partial<ChallengeForm>; isModify?: boolean }) {
  const initialState = {
    ...defaultChallengeForm,
    ...initalForm,
  }

  return (
    <ChallengeFormProvider initialState={initialState}>
      <FormStatusProvider>
        <div className="w-full">
          <section className="w-full min-h-40">
            <Notification />
          </section>

          <section>
            <ChallengeInfo />
          </section>

          <section>
            <ChallengeDuration />
          </section>

          {
            !isModify &&
            <section className="my-10">
              <CreateChallenge />
            </section>
          }

          <DebugChallenge />
        </div>
      </FormStatusProvider>
    </ChallengeFormProvider>
  )
}
