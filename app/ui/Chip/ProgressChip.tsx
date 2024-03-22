import { Chip } from "@nextui-org/react"
import dayjs from "dayjs"

export default function ProgressChip ({
  startDate,
  endDate,
}: {
  startDate: string
  endDate: string
}) {
  const isStarted = dayjs(startDate).isBefore(dayjs())
  const isEnded = dayjs(endDate).isBefore(dayjs())
  const isOngoing = isStarted && !isEnded
  return (
    <>
    {isOngoing
      ? <Chip
        variant="solid"
        color={"primary"}
      >
      진행 중
      </Chip>
      : null}

    {isEnded
      ? <Chip
        variant="solid"
        color={"default"}
      >
      종료
      </Chip>
      : null}

    {(!isStarted && !isEnded)
      ? <Chip
        variant="solid"
        color={"success"}
      >
        예정
      </Chip>
      : null}
    </>
  )
}