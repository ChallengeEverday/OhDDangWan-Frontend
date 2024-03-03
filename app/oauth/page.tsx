"use client"

import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import QueryString from "qs"
import { useEffect } from "react"
import { post_oauth_login } from "../utils/service/auth"
import { get_user_myProfile } from "../utils/service/account"
import { useUserInfoStore } from "../utils/store/userInfoStore"
import { useTimer } from "../utils/hooks/useTimer"

export default function Oauth() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get("code")
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo)
  const removeUserInfo = useUserInfoStore((state) => state.removeUserInfo)

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
      console.log(res.data)

      return res.data.access_token
    } catch (err) {
      console.error(err)
    }
  }

  // 1시간 뒤에 유저 정보 삭제
  const [start] = useTimer(
    () => {
      removeUserInfo()
      console.log("유저 정보 삭제됨")
    },
    1000 * 60 * 60,
  )

  const getToken = async () => {
    try {
      const accessToken = await getKakaoAccessToken(getPayload())

      if (accessToken) {
        // 로그인하기
        await post_oauth_login(accessToken)

        // 유저 정보 가져오기
        const userInfo = await get_user_myProfile()
        setUserInfo(userInfo.data)
        start()
      }
    } catch (err) {
      console.error(err)
    } finally {
      router.push("/")
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return null
}
