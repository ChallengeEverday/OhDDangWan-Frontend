import { Button } from "@nextui-org/react"

export default function KakaoLogin() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT}`

  const loginKakao = () => {
    window.location.replace(`${KAKAO_AUTH_URL}`)
  }

  return (
    <Button onClick={loginKakao} className="bg-[#fae100]">
      카카오로 로그인하기
    </Button>
  )
}
