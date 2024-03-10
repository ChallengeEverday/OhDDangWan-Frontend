import {
  CHALLENGE_CATEGORY_NAV_LIST,
  ChallengeCategory,
} from "@/app/utils/types/challenge"
import Link from "next/link"

export default function ChallengeCategoryNav({
  category,
}: {
  category?: ChallengeCategory
}) {
  return (
    <ul className="flex gap-10 mb-5 items-center justify-center">
      {CHALLENGE_CATEGORY_NAV_LIST.map(({ category: categoryLi, emoji }) => (
        <li key={categoryLi}>
          <Link
            className="flex flex-col items-center"
            href={`/challenges/category/${ChallengeCategory[categoryLi]}`}
          >
            <div
              className={`text-4xl p-3 ${category === ChallengeCategory[categoryLi] ? "bg-primary-100" : "bg-foreground-100"} rounded-2xl`}
            >
              {emoji}
            </div>
            {categoryLi}
          </Link>
        </li>
      ))}
    </ul>
  )
}
