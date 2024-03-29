"use client"

import React, { useEffect } from "react"
import {
  Button,
} from "@nextui-org/react"
import { get_challenges_category_$category } from "@/app/utils/service/challenge"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import ChallengeListLoading from "@/app/ui/List/ChallengeListLoading"
import { ChallengeCategory } from "@/app/utils/types/challenge"
import ChallengeLink from "@/app/ui/List/ChallengeLink"

export default function ChallengeList({
  category,
}: {
  category: ChallengeCategory
}) {
  const { ref, inView } = useInView()

  const getChallenges = async (pageParam: number) => {
    const { data } = await get_challenges_category_$category(category, {
      page: pageParam,
    })
    return data
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["challenges", category],
      queryFn: ({ pageParam }) => getChallenges(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (
          lastPage.metadata.currentPageNumber ===
          lastPage.metadata.totalPageCount
        )
          return null
        return lastPage.metadata.currentPageNumber + 1
      },
      getPreviousPageParam: (firstPage) => {
        if (firstPage.metadata.currentPageNumber === 0) return null
        return firstPage.metadata.currentPageNumber - 1
      },
    })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  if (!data)
    return (
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <ChallengeListLoading />
      </div>
    )

  return (
    <>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {data?.pages.map(({ result, metadata }) => (
          <React.Fragment key={metadata.currentPageNumber}>
            {result.map(
              (challengeInfo) => (
                <ChallengeLink
                  key={challengeInfo.id}
                  {...challengeInfo}
                />
              )
            )}
          </React.Fragment>
        ))}
        {isFetchingNextPage && <ChallengeListLoading length={6} />}
      </div>

      <div ref={ref} className="w-full flex justify-center items-center my-14">
        {data && (
          <Button
            variant="flat"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            isLoading={isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "로딩 중..."
              : hasNextPage
                ? "더 불러오기"
                : "마지막 입니다."}
          </Button>
        )}
      </div>
    </>
  )
}
