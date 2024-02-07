'use client'

import React from 'react'
import Calendar, { ChallengeEvent } from './Calendar/Calendar'

type ChallengeCalendarProps = {
  events: ChallengeEvent[]
}

export default function ChallengeCalendar({ events }: ChallengeCalendarProps) {
  return (
    <Calendar
      events={events}
    />
  )
}