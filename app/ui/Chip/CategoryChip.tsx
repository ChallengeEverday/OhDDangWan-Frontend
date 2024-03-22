import { ChallengeCategory, ChallengeCategoryEmoji, ChallengeCategoryKo } from "@/app/utils/types/challenge"
import { Chip } from "@nextui-org/react"

export default function CategoryChip ({
  category
}: {
  category: ChallengeCategory
}) {
  return (
    <Chip
      classNames={{
      base: "bg-gray-900 text-white",
      }}
    >
      {ChallengeCategoryKo[category]} {ChallengeCategoryEmoji[category]}
    </Chip>
  )
}