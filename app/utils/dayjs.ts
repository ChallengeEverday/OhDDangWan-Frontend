import dayjs from "dayjs"
import { ChallengeForm } from "./types/challenge"

export type 요일 = "일" | "월" | "화" | "수" | "목" | "금" | "토"
export type 요일숫자 = 0 | 1 | 2 | 3 | 4 | 5 | 6

export const 요일별한글: 요일[] = ["일", "월", "화", "수", "목", "금", "토"]

const nowDayjs = dayjs()

export const getDaysToBinarySum = (
  days: ChallengeForm["challengeCycle"],
): number => {
  // 월,화,수 === [false, true, true, true, false, false, false] => 1110000 => 56
  return days.reduce((acc, cur, i) => {
    if (!cur) return acc

    if (i === 0) return acc + Math.pow(2, 6)
    return acc + Math.pow(2, i - 1)
  }, 0)
}

export const getMonthOfWeeksCount = (djs = nowDayjs): number => {
  const firstDay = djs.startOf("month").day()
  const lastDate = djs.endOf("month").date()
  const weeksCount = Math.ceil((firstDay + lastDate) / 7)
  return weeksCount
}

export const getMonthOfWeeks = (djs = nowDayjs) => {
  const weeksCount = getMonthOfWeeksCount(djs)
  const weeks: dayjs.Dayjs[][] = []

  const firstDate = djs.startOf("month")
  const lastDayBeforeMonth = firstDate.subtract(1, "day").day()
  const startDateOfMonth = firstDate.subtract(lastDayBeforeMonth + 1, "day")

  for (let i = 0; i < weeksCount; i++) {
    const firstDateOfWeek = startDateOfMonth.add(i * 7, "day")
    const week = Array.from({ length: 7 }, (_, j) =>
      firstDateOfWeek.add(j, "day"),
    )
    weeks.push(week)
  }
  return weeks
}
