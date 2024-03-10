import {
  CHALLENGE_CATEGORY_NAV_LIST,
  ChallengeCategory,
} from "@/app/utils/types/challenge"
import Link from "next/link"
import CategoryItem from "../CategoryButton"

export default function ChallengeCategoryNav({
  category,
}: {
  category?: ChallengeCategory
}) {
  return (
    <ul className="flex gap-10 mb-5 items-center justify-center">
      {CHALLENGE_CATEGORY_NAV_LIST.map(({ category: categoryLi, emoji }) => (
        <li key={categoryLi}>
          <Link href={`/challenges/category/${ChallengeCategory[categoryLi]}`}>
            <CategoryItem
              isActive={category === ChallengeCategory[categoryLi]}
              emoji={emoji}
              category={categoryLi}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
