import ChallengeList from "./main/ChallengeList"
import ChallengeCategoryNav from "./ui/List/ChallengeCategoryNav"

export default function Home() {
  return (
    <main>
      <ChallengeCategoryNav />
      <ChallengeList />
    </main>
  )
}
