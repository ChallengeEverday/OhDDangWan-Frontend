import {
  ChallengeCategory,
  ChallengeCategoryKo,
} from "@/app/utils/types/challenge"
import ChallengeList from "./ChallengeList"
import ChallengeCategoryNav from "@/app/ui/List/ChallengeCategoryNav"

export default function ChallengeCategoryPage({
  params,
}: {
  params: { category: ChallengeCategory }
}) {
  const category = ChallengeCategoryKo[params.category]

  return (
    <main>
      <ChallengeCategoryNav category={params.category} />
      <ChallengeList category={params.category} />
    </main>
  )
}
