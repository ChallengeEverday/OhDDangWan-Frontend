"use client"

import { useRouter } from "next/navigation"
import { useUserInfoStore } from "../utils/store/userInfoStore"
import { Avatar, Divider } from "@nextui-org/react"

export default function MyPage() {
  const router = useRouter()
  const userInfo = useUserInfoStore((state) => state.userInfo)

  if (!userInfo) {
    // TODO: Toast message
    router.push("/")
    return null
  }

  const { nickname, profileImageUrl } = userInfo

  return (
    <main className="w-full my-5 md:my-10">
      <h1 className="font-bold text-xl md:text-2xl">마이페이지</h1>
      <Divider className="my-4" />

      <section className="flex justify-start items-center gap-4">
        <Avatar
          src={profileImageUrl}
          name={nickname}
          size="lg"
          className="md:w-20 md:h-20"
        />
        <h2 className="font-bold md:text-lg">{nickname}</h2>
      </section>
    </main>
  )
}
