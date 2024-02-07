'use client'

import { getMonthOfWeeks } from "@/app/utils/dayjs"
import { Button } from "@nextui-org/react"
import dayjs from "dayjs"
import { useMemo, useState } from "react"

export type ChallengeEvent = {
  id: number
  title: string
  date: dayjs.Dayjs
}

export type View = 'month' | 'agenda'

type CalendarProps = {
  events?: ChallengeEvent[]
  defaultDayjs?: dayjs.Dayjs
  views?: View[]
}

export default function Calendar({ events, defaultDayjs, views }: CalendarProps) {
  const nowDayjs = dayjs()

  const [currentDayjs, setCurrentDayjs] = useState(defaultDayjs || nowDayjs)

  const weeks = useMemo(() => getMonthOfWeeks(currentDayjs), [currentDayjs])

  const setPrevMonth = () => {
    setCurrentDayjs(currentDayjs.subtract(1, 'month'))
  }

  const setNextMonth = () => {
    setCurrentDayjs(currentDayjs.add(1, 'month'))
  }

  const setTodayMonth = () => {
    setCurrentDayjs(nowDayjs)
  }

  return (
    <div>
      <h1>{currentDayjs.format('YYYY-MM')}</h1>
      <div className="flex">
        <Button onClick={setPrevMonth} variant="light">{"<"}</Button>
        <Button onClick={setTodayMonth} variant="light">오늘</Button>
        <Button onClick={setNextMonth} variant="light">{">"}</Button>
      </div>
      {
        weeks.map((week, i) => (
          <div key={i} className="flex">
            {
              week.map((day, j) => (
                <div key={j} className="w-full border-1 border-black h-12 flex items-center justify-center">
                  {day.format('D')}
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}