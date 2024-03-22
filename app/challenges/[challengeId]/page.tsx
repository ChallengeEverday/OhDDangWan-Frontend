import ChallengeCalendar from "@/app/ui/ChallengeCalendar"
import DebugLog from "@/app/ui/Debug/DebugLog"
import Markdown from "@/app/ui/Editor/Markdown"
import { calendarEvents } from "@/app/utils/data/mock"
import { get_challenge_$challengeId } from "@/app/utils/service/challenge"
import {
  Card,
  User,
  CardHeader,
  CardBody,
  Divider,
  Chip,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react"
import { CommentInput } from "./components/CommentInput"
import { CommentList } from "./components/CommentList"
import dayjs from "dayjs"
import LikeButton from "./components/LikeButton"
import JoinButton from "./components/JoinButton";
import Thumbnail from "./components/Thumbnail"
import ProgressChip from "@/app/ui/Chip/ProgressChip"
import CategoryChip from "@/app/ui/Chip/CategoryChip"
import { IoIosSettings } from "react-icons/io";
import ChallengeSetting from "./components/ChallengeSetting"

export default async function Page({
  params,
  searchParams,
}: {
  params: { challengeId: string }
  searchParams: any
}) {
  const challenge = await get_challenge_$challengeId(params.challengeId)

  const isMarkdown = challenge.description.startsWith("{")
  const description = isMarkdown
    ? JSON.parse(challenge.description)
    : challenge.description

  const isStarted = dayjs(challenge.challengeStartDate).isBefore(dayjs())
  const isEnded = dayjs(challenge.challengeEndDate).isBefore(dayjs())
  const isOngoing = isStarted && !isEnded

  return (
    <div className="w-full relative">
      <DebugLog object={challenge} modal={searchParams.modal} />

      <div className="text-tiny m-3 absolute z-20 left-0 flex gap-1">
        <ProgressChip
          startDate={challenge.challengeStartDate}
          endDate={challenge.challengeEndDate}
        />
        <CategoryChip category={challenge.category} />
      </div>

      <div className="flex flex-col justify-center gap-5 relative md:flex-row">
        <div className="w-full rounded-xl">
          <Thumbnail
            alt={challenge.title}
            type={challenge.category}
            url={challenge.thumbnailImageUrl}
          />
        </div>

        <Card
          shadow="sm"
          className="w-full pb-14 pt-2 px-4 flex-col items-start"
        >
          <CardHeader className="w-full flex justify-between items-center">
            <h2 className="font-bold text-xl md:text-2xl">{challenge.title}</h2>
            <div className="flex gap-1">
              <LikeButton challengeId={params.challengeId} />
              <JoinButton isEnded={isEnded} challengeId={params.challengeId} />
            </div>
          </CardHeader>

          <Divider />

          <CardBody className="w-fullpt-3 md:max-h-80">
            <div>
              <User
                name={challenge.ownerNickname}
                avatarProps={{
                  src: challenge.ownerProfileImageUrl,
                }}
              />
            </div>
            {isMarkdown ? (
              <Markdown content={description} />
            ) : (
              <p>{description}</p>
            )}
          </CardBody>

          <div className="w-full select-none flex overflow-x-scroll p-4 z-10 absolute left-0 bottom-0">
            {challenge.hashtags &&
              challenge.hashtags.map((hashtag) => (
                <Chip key={hashtag} variant="bordered" className="mr-1">
                  #{hashtag}
                </Chip>
              ))}
          </div>
        </Card>
      </div>

      <section className="w-full flex justify-end gap-2 my-5">
        <ChallengeSetting challengeId={params.challengeId} />
      </section>

      <section className="my-10 w-full">
        <CommentInput />
        <CommentList ownerId={challenge.ownerId} />
      </section>

      {/*
      <section className="my-10 w-full">
        <ChallengeCalendar events={calendarEvents} />
      </section>
      */}
    </div>
  )
}
