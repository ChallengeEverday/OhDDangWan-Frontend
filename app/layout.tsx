import type { Metadata } from "next"
import { Noto_Sans_KR } from "next/font/google"
import "@/app/ui/style/globals.css"
import { Providers } from "./providers"
import GNB from "@/app/ui/Layout/GNB"
import 'react-toastify/dist/ReactToastify.css';

const notoSans = Noto_Sans_KR({
  weight: ["300", "400", "700", "800"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "오땡완",
  description: "오운완, 오공완, 오늘 내가 완료한 챌린지를 인증해요!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={notoSans.className}>
        <Providers>
          <GNB />
          <div className="w-full flex justify-center">
            <div className="flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-center max-w-[1024px] my-5 md:my-10">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
