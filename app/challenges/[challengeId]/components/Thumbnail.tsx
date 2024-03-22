"use client"

import { ChallengeCategoryKeyEn } from "@/app/utils/types/challenge"
import { Image } from "@nextui-org/react"

const images = {
  EXERCISE: "/thumbnails/exercies.jpg",
  HABIT: "/thumbnails/habit.jpg",
  READING: "/thumbnails/reading.jpg",
  STUDY: "/thumbnails/study.jpg",
} as const

export default function Thumbnail ({ alt, type, url }: { alt: string, type: ChallengeCategoryKeyEn, url?: string }) {
  const imageUrl = url || images[type]

  return (
    <Image
      aria-hidden
      alt={type}
      removeWrapper
      className="aspect-[5/3] object-cover md:aspect-[4/3] w-full"
      src={imageUrl}
      fallbackSrc="/running.avif"
    />
  )
}