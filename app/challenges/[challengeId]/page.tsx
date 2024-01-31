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
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

export default function Page({ params }: { params: { challengeId: string } }) {
  const challenge = {
    title: "오운완 챌린지",
    time: "10분전 인증",
    description: "맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 맨날 달리기 운동해요! 사진으로 인증해요. 마지막",
    members: 120,
    // image: "/running.avif",
    image: "/hani1.jpg",
    id: 1,
    details: ["매일", "1년동안", "11", "ㅎㅎㅎㅎ", "ㅁ[렁", "으앙", "시간이", "간다"],
    master: {
      name: "팜하니",
      avatar: "/hani1.jpg",
    },
    isLiked: false,
  }

  return (
    <div className="my-5 md:my-10 relative">
       <Chip
          variant="solid"
          color="primary"
          className="text-tiny py-2 m-3 absolute z-20 left-0"
        >
          {challenge.time}
        </Chip>
      <div className="flex flex-col justify-center gap-5 relative md:flex-row">
        <Image
          aria-hidden
          alt={challenge.title}
          removeWrapper
          className="aspect-[5/3] object-cover md:aspect-[4/3] md:w-1/2 w-full"
          src={challenge.image}
        />

        <Card shadow="sm" className="w-full pb-14 pt-2 px-4 flex-col items-start">
          <CardHeader className="w-full flex justify-between items-center">
            <h2 className="font-bold text-xl md:text-2xl">{challenge.title}</h2>
            <div className="flex gap-1">
              <Button color="primary" variant="light" isIconOnly>
                { challenge.isLiked ? <IoIosHeart size="24" /> : <IoIosHeartEmpty size="24" /> }
              </Button>
              <Button color="primary">참여하기</Button>
            </div>
          </CardHeader>

          <Divider />

          <CardBody className="w-fullpt-3 md:max-h-80">
            <div>
              <User
                name={challenge.master.name}
                // description="Product Designer"
                avatarProps={{
                  src: challenge.master.avatar,
                }}
              />
            </div>
            <p>{challenge.description}</p>
          </CardBody>

          <div className="w-full select-none flex overflow-x-scroll p-4 z-10 absolute left-0 bottom-0">
            {challenge.details &&
              challenge.details.map((detail) => (
                <Chip key={detail} variant="bordered" className="mr-1">
                  #{detail}
                </Chip>
            ))}
          </div>
        </Card>
      </div>

      <section className="my-10 bg-red-100 w-full h-96">
        달력
      </section>
    </div>
  )
}
