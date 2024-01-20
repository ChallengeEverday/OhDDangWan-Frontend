"use client"

import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import QueryString from "qs"
import { useEffect } from "react"

export default function Oauth() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get("code")

  const getPayload = () =>
    QueryString.stringify({
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
      redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT,
      code: code,
      client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
    })

  const getKakaoAccessToken = async (payload: any) => {
    try {
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload,
      )
      console.log({ access_token: res.data.access_token })

      return res.data.access_token
    } catch (err) {
      console.error(err)
    }
  }

  const getToken = async () => {
    try {
      const accessToken = await getKakaoAccessToken(getPayload())

      // fetch(`${process.env.NEXT_PUBLIC_API}`, {
      //   //백엔드에게 토큰을 전달하기 위함입니다.
      //   headers: {
      //     Authorization: res.data.access_token,
      //   },
      // })

      // window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY)
      // window.Kakao.Auth.setAccessToken(res.data.access_token)

      router.push("/")
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return null
}
