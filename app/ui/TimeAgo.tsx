import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export default function TimeAgo({ date }: { date: string }) {
  const [formattedTime, setFormattedTime] = useState<string>("")

  useEffect(() => {
    const updateTimeAgo = () => {
      const formattedDate = dayjs.utc(date).tz("Asia/Seoul")
      console.log({ date, formattedDate })
      const diffInMinutes = dayjs().diff(formattedDate, "minute")

      if (diffInMinutes < 1) {
        setFormattedTime("방금")
      } else if (diffInMinutes < 60) {
        setFormattedTime(`${diffInMinutes}분 전`)
      } else if (diffInMinutes < 24 * 60) {
        setFormattedTime(`${Math.floor(diffInMinutes / 60)}시간 전`)
      } else if (diffInMinutes < 30 * 24 * 60) {
        setFormattedTime(formattedDate.format("M월 DD일"))
      } else {
        setFormattedTime(formattedDate.format("YYYY년 M월 DD일"))
      }
    }

    updateTimeAgo()

    // Update time every minute
    const intervalId = setInterval(updateTimeAgo, 60 * 1000)

    return () => clearInterval(intervalId)
  }, [date])

  return <>{formattedTime}</>
}
