import { Card, Skeleton } from "@nextui-org/react"

export default function ChallengeListLoading ({ length = 12 }) {
  return (
    Array.from({ length }, (_, i) => {
      return (
        <Card key={i} shadow="sm" className="w-full">
          <Skeleton className="w-96 aspect-[9/4]" />
          <Skeleton className="w-3/5 h-3 rounded-lg m-4 mb-2" />
          <Skeleton className="w-2/5 h-3 rounded-lg m-4 mt-0" />
          <Skeleton className="w-1/5 h-7 rounded-full mt-6 ml-4 mb-4" />
        </Card>
      )
    })
  )
}