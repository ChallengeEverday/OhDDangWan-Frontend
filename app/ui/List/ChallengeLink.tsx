import React from "react"
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
} from "@nextui-org/react"
import { IoMdPerson } from "react-icons/io"
import Link from "next/link"
import dayjs from "dayjs"
import Thumbnail from "@/app/challenges/[challengeId]/components/Thumbnail"
import { ChallengeMainResponseDto } from "@/app/utils/types/challenge"

export default function ChallengeLink({
  id,
  title,
  challengeCreatedAt,
  participantsCount,
  thumbnailImageUrl,
  hashtags,
  category,
}: ChallengeMainResponseDto) {
  return (
    <Link key={id} href={`/challenges/${id}`}>
      <Card shadow="sm" className="pb-4">
        <div className="w-full rounded-t-xl">
          <Thumbnail
            alt={title}
            type={category}
            url={thumbnailImageUrl}
            style={"rounded-none rounded-t-xl"}
          />
        </div>
        <CardHeader className="reletive overflow-visible py-0">
          <Chip
            startContent={<IoMdPerson size="16" />}
            className="flex absolute top-3 right-2 z-20"
            color="primary"
          >
            {participantsCount}
          </Chip>
        </CardHeader>
        <CardBody className="pb-0 pt-2 px-4 flex-col items-start h-20 relative">
          <div className="w-full">
            <div className="w-full flex justify-between items-center">
              <h4 className="font-bold text-large">{title}</h4>
              <p className="text-tiny text-default-500">
                {dayjs(challengeCreatedAt).format("YYYY-MM-DD")}
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 w-full select-none flex overflow-x-scroll">
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
  )
}
