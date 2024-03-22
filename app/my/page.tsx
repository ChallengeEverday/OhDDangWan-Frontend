"use client"

import { useRouter } from "next/navigation"
import { useUserInfoStore } from "../utils/store/userInfoStore"
import { Avatar, Divider } from "@nextui-org/react"
import { useEffect } from "react"
import ChallengeList from "../main/ChallengeList"

export default function MyPage() {
  const router = useRouter()
  const userInfo = useUserInfoStore((state) => state.userInfo)

  useEffect(() => {
    if (!userInfo) {
      // TODO: Toast message
      router.push("/")
    }
  }, [userInfo])

  if (!userInfo) return null

  const { nickname, profileImageUrl } = userInfo

  return (
    <main className="w-full">
      <h1 className="font-bold text-xl md:text-2xl">마이페이지</h1>
      <Divider className="my-3 md:my-6" />

      <section className="flex justify-start items-center gap-4">
        <Avatar
          src={profileImageUrl}
          name={nickname}
          size="lg"
          className="md:w-20 md:h-20"
        />
        <h2 className="font-bold md:text-lg">{nickname}</h2>
      </section>

      <section className="w-full my-4 bg-red-50 h-96">캘린더</section>

      <Divider className="my-6 md:my-8" />

      <section>
        <h1 className="font-bold text-lg md:text-xl mb-4 md:mb-8">
          나의 챌린지
        </h1>

        <ChallengeList />
      </section>
    </main>
  )
}
