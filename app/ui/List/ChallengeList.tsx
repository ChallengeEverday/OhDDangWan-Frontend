"use client"

import React, { useEffect } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Divider,
  Chip,
  Button,
} from "@nextui-org/react"
import { IoMdPerson } from "react-icons/io"
import Link from "next/link"
import { get_challenges } from "@/app/utils/service/challenge"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import dayjs from "dayjs"
import ChallengeListLoading from "./ChallengeListLoading"

export default function ChallengeList() {
  const { ref, inView } = useInView()

  const getChallenges = async (pageParam: number) => {
    const { data } = await get_challenges({ page: pageParam })
    return data
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["challenges"],
      queryFn: ({ pageParam }) => getChallenges(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (
          lastPage.metadata.currentPageNumber ===
          lastPage.metadata.totalPageCount - 1
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
              ({
                id,
                title,
                challengeCreatedAt,
                description,
                participantsCount,
                thumbnailImageUrl,
                hashtags,
              }) => (
                <Link key={id} href={`/challenges/${id}`}>
                  <Card shadow="sm" className="pb-4">
                    <Image
                      aria-hidden
                      alt={title}
                      className="aspect-[5/3] object-cover rounded-b-none"
                      src={thumbnailImageUrl || "/skelleton.png"}
                    />
                    <CardHeader className="reletive overflow-visible py-0">
                      <Chip
                        startContent={<IoMdPerson size="16" />}
                        className="flex absolute top-3 right-2 z-20"
                        color="primary"
                      >
                        {participantsCount}
                      </Chip>
                    </CardHeader>
                    <CardBody className="pb-0 pt-2 px-4 flex-col items-start">
                      <div className="w-full pb-3">
                        <div className="w-full flex justify-between items-center">
                          <h4 className="font-bold text-large">{title}</h4>
                          <p className="text-tiny text-default-500">
                            {dayjs(challengeCreatedAt).format("YYYY-MM-DD")}
                          </p>
                        </div>
                      </div>
                      {/* <Divider /> */}
                      {/* <div className="w-full pt-3 truncate">
                        <p className="truncate">{description}</p>
                      </div> */}
                      <div className="w-full select-none flex overflow-x-scroll pt-3">
                        {hashtags &&
                          hashtags.map((tag) => (
                            <Chip key={tag} variant="bordered" className="mr-1">
                              #{tag}
                            </Chip>
                          ))}
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              ),
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
