import React from "react"
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Divider,
  Chip,
} from "@nextui-org/react"
import { IoMdPerson } from "react-icons/io"
import Link from "next/link"

const challengeList = [
  {
    title: "오운완 챌린지",
    time: "10분전 인증",
    description: "맨날 달리기 운동해요! 사진으로 인증해요.",
    members: 120,
    image: "/running.avif",
    id: 1,
    details: ["매일", "1년동안"],
  },
  {
    title: "뉴진스 춤 연습하자!",
    time: "1시간전 인증",
    description: "엄마엄마가~",
    members: 12,
    image: "/hani.jpeg",
    id: 2,
    details: [
      "하니야하니야하니야1",
      "하니야하니야하니야2",
      "하니야하니야하니야3",
      "사랑해",
    ],
  },
  {
    title: "알고리즘 인증해요!",
    time: "하루전 인증",
    description:
      "백준, 리트코드, 프로그래머스로 문제 풀어서 인증해요 나랑 같이 풀자",
    members: 120,
    image: "/hani.jpeg",
    id: 3,
    details: ["매일", "1년동안"],
  },
  {
    title: "오운완 챌린지",
    time: "10분전 인증",
    description: "맨날 달리기 운동해요! 사진으로 인증해요.",
    members: 120,
    image: "/running.avif",
    id: 4,
    details: ["매일", "1년동안"],
  },
]

export default function ChallengeList() {
  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10">
      {challengeList.map(
        ({ title, time, description, members, image, id, details }) => (
          <Link key={id} href={`./challenges/${id}`}>
            <Card className="pb-4">
              <Image
                aria-hidden
                alt={title}
                className="aspect-[5/3] object-cover rounded-b-none"
                src={image}
              />
              <CardHeader className="reletive overflow-visible py-0">
                <Chip
                  startContent={<IoMdPerson size="16" />}
                  className="flex absolute top-3 right-2 z-20"
                  color="primary"
                >
                  {members}
                </Chip>
              </CardHeader>
              <CardBody className="pb-0 pt-2 px-4 flex-col items-start">
                <div className="w-full pb-3">
                  <div className="w-full flex justify-between items-center">
                    <h4 className="font-bold text-large">{title}</h4>
                    <p className="text-tiny text-default-500">{time}</p>
                  </div>
                </div>
                <Divider />
                <div className="w-full pt-3 truncate">
                  <p className="truncate">{description}</p>
                </div>
                <div className="w-full select-none flex overflow-x-scroll pt-3">
                  {details &&
                    details.map((detail) => (
                      <Chip key={detail} variant="bordered" className="mr-1">
                        #{detail}
                      </Chip>
                    ))}
                </div>
              </CardBody>
            </Card>
          </Link>
        ),
      )}
    </div>
  )
}
