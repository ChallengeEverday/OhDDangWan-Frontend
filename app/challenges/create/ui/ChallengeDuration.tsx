import { Divider, Input } from "@nextui-org/react"
import { useState } from "react"
import { 요일별한글, type 요일 } from "@/app/utils/dayjs"
import dayjs from "dayjs"

const AFTER_MIN_DAY = 3
const MIN_DURATION = 7

export default function ChallengeDuration() {
  const [day, setDay] = useState<요일[]>([])
  const minStartDate = dayjs().add(AFTER_MIN_DAY, "day").format("YYYY-MM-DD")
  const minEndDate = dayjs()
    .add(AFTER_MIN_DAY + MIN_DURATION, "day")
    .format("YYYY-MM-DD")

  return (
    <>
      <h2 className="font-bold text-xl mt-6 md:text-2xl">챌린지 기간</h2>
      <Divider className="mt-1 mb-3 md:mb-6 md:mt-2" />
      <div className="flex flex-col md:flex-row gap-2 md:gap-5">
        <section className="w-full md:w-1/2">
          <Input
            labelPlacement="outside"
            placeholder="2022-12-31"
            type="date"
            variant="flat"
            label="시작일"
            isRequired
            classNames={{
              label: "font-bold text-base",
            }}
            min={minStartDate}
          />
        </section>
        <section className="w-full md:w-1/2">
          <Input
            labelPlacement="outside"
            placeholder="2022-12-31"
            type="date"
            variant="flat"
            label="종료일"
            isRequired
            classNames={{
              label: "font-bold text-base",
            }}
            min={minEndDate}
          />
        </section>
      </div>
      <div className="my-4">
        <h2 className="mb-1 font-bold text-base">인증 주기</h2>
        <div className="w-full overflow-x-scroll flex gap-1">
          {요일별한글.map((요일) => (
            <DayButton
              key={요일}
              onClick={() => {
                if (day.includes(요일)) {
                  setDay(day.filter((d) => d !== 요일))
                } else {
                  setDay([...day, 요일])
                }
              }}
              selected={day.includes(요일)}
            >
              {요일}
            </DayButton>
          ))}
        </div>
      </div>
    </>
  )
}

const DayButton = ({
  children,
  onClick,
  selected,
}: {
  children: string
  onClick: () => void
  selected: boolean
}) => {
  if (selected)
    return (
      <button
        onClick={onClick}
        className="bg-primary-500/[.2] text-primary-500 rounded-full py-2 px-4 hover:bg-primary-500/[.5] transition-colors duration-200 ease-in-out"
      >
        {children}
      </button>
    )
  return (
    <button
      onClick={onClick}
      className="rounded-full py-2 px-4 bg-default-100/[.7] text-forground-600 hover:bg-default-200 hover:text-forground-800 transition-colors duration-200 ease-in-out"
    >
      {children}
    </button>
  )
}
