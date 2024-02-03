"use client"

import { Divider } from "@nextui-org/react"
import KakaoLogin from "./ui/KakaoLogin"

export default function Login() {
  return (
    <main className="w-full">
      <h1 className="font-bold text-xl md:text-2xl">오땡완을 시작해보세요!</h1>
      <Divider className="my-4" />
      <KakaoLogin />
    </main>
  )
}
