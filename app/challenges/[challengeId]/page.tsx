import {
  Card,
  User,
  CardHeader,
  CardBody,
  Image,
  Divider,
  Chip,
} from "@nextui-org/react"

export default function Page({ params }: { params: { challengeId: string } }) {
  const challenge = {
    title: "오운완 챌린지",
    time: "10분전 인증",
    description: "맨날 달리기 운동해요! 사진으로 인증해요.",
    members: 120,
    image: "/running.avif",
    id: 1,
    details: ["매일", "1년동안"],
    master: {
      name: "팜하니",
      avatar: "/hani1.jpg",
    },
  }

  return (
    <div className="flex py-10">
      <Image
        aria-hidden
        alt={challenge.title}
        // TODO: aspect-square 안먹음
        className="aspect-square object-cover"
        src={challenge.image}
      />

      <section className="pb-0 pt-2 px-4 flex-col items-start">
        <div className="w-full pb-3">
          <div className="w-full flex justify-between items-center">
            <h2 className="font-bold text-large">{challenge.title}</h2>
            <User
              name={challenge.master.name}
              // description="Product Designer"
              avatarProps={{
                src: challenge.master.avatar,
              }}
            />
            <p className="text-tiny text-default-500">{challenge.time}</p>
          </div>
        </div>
        <Divider />
        <div className="w-full pt-3 truncate">
          <p className="truncate">{challenge.description}</p>
        </div>
        <div className="w-full select-none flex overflow-x-scroll pt-3">
          {challenge.details &&
            challenge.details.map((detail) => (
              <Chip key={detail} variant="bordered" className="mr-1">
                #{detail}
              </Chip>
            ))}
        </div>
      </section>
    </div>
  )
}
