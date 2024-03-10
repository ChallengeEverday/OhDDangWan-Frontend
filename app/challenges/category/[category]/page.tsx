import ChallengeCategoryNav from "@/app/ui/List/ChallengeCategoryNav"
import ChallengeList from "@/app/ui/List/ChallengeList"
import {
  ChallengeCategory,
  ChallengeCategoryKo,
} from "@/app/utils/types/challenge"

export default function ChallengeCategoryPage({
  params,
}: {
  params: { category: ChallengeCategory }
}) {
  const category = ChallengeCategoryKo[params.category]

  return (
    <main>
      <ChallengeCategoryNav category={params.category} />
      <ChallengeList />
    </main>
  )
}
