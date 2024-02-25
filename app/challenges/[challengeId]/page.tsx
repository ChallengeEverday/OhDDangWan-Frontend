import ChallengeCalendar from "@/app/ui/ChallengeCalendar"
import DebugLog from "@/app/ui/Debug/DebugLog"
import Markdown from "@/app/ui/Editor/Markdown"
import { get_challenge_$challengeId } from "@/app/utils/service/challenge"
import {
  Card,
  User,
  CardHeader,
  CardBody,
  Image,
  Divider,
  Chip,
  Button,
} from "@nextui-org/react"
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io"

export default async function Page({
  params,
  searchParams,
}: {
  params: { challengeId: string }
  searchParams: any
}) {
  const challenge = await get_challenge_$challengeId(params.challengeId)

  // const challenge = {
  //   title: "테스트용 챌린지 생성해요",
  //   description: "테스트 챌린지",
  //   challengeCycle: 21,
  //   challengeStartDate: "2024-02-14",
  //   challengeEndDate: "2024-02-29",
  //   ownerNickname: "강희(cherry.a)",
  //   ownerProfileImageUrl:
  //     "http://k.kakaocdn.net/dn/bRMpUE/btsD7mcKT32/dyRSblkw1iiw2JKbJCnfEk/img_640x640.jpg",
  //   thumbnailImageUrl: "",
  //   hashtags: ["오운완", "테스트"],
  // }

  const events = [
    {
      id: 0,
      title: "강희님 인증",
      date: "2024-02-07",
    },
    {
      id: 1,
      title: "진우님 인증",
      date: "2024-02-08",
    },
    {
      id: 2,
      title: "강희님 인증",
      date: "2024-02-13",
    },
    {
      id: 22,
      title: "진우님 인증",
      date: "2024-02-13",
    },
    {
      id: 3,
      title: "강희님 인증",
      date: "2024-02-14",
    },
    {
      id: 4,
      title: "진우님 인증",
      date: "2024-02-14",
    },
    {
      id: 5,
      title: "정우님 인증",
      date: "2024-02-14",
    },
    {
      id: 6,
      title: "혜인님 인증",
      date: "2024-02-14",
    },
    {
      id: 7,
      title: "성진님 인증",
      date: "2024-02-14",
    },
  ]

  const isMarkdown = challenge.description.startsWith("{")
  const description = isMarkdown
    ? JSON.parse(challenge.description)
    : challenge.description

  return (
    <div className="w-full relative">
      <DebugLog object={challenge} modal={searchParams.modal} />
      {/* <Chip
        variant="solid"
        color="primary"
        className="text-tiny py-2 m-3 absolute z-20 left-0"
      >
        {challenge.time}
      </Chip> */}
      <div className="flex flex-col justify-center gap-5 relative md:flex-row">
        {challenge.thumbnailImageUrl && (
          <Image
            aria-hidden
            alt={challenge.title}
            removeWrapper
            className="aspect-[5/3] object-cover md:aspect-[4/3] md:w-1/2 w-full"
            src={challenge.thumbnailImageUrl}
            fallbackSrc="/running.avif"
          />
        )}

        <Card
          shadow="sm"
          className="w-full pb-14 pt-2 px-4 flex-col items-start"
        >
          <CardHeader className="w-full flex justify-between items-center">
            <h2 className="font-bold text-xl md:text-2xl">{challenge.title}</h2>
            <div className="flex gap-1">
              <Button color="primary" variant="light" isIconOnly>
                {true ? (
                  <IoIosHeart size="24" />
                ) : (
                  <IoIosHeartEmpty size="24" />
                )}
              </Button>
              <Button color="primary">참여하기</Button>
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

      <section className="my-10 w-full">
        <ChallengeCalendar events={events} />
      </section>
    </div>
  )
}
