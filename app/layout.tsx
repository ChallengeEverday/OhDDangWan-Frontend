import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/style/reset.css"
import "@/app/style/variable.css"
import "@/app/style/globals.css"
import { Providers } from "./providers"
import GNB from "./Ui/Layout/GNB"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "오땡완 (오늘 땡땡 완료!)",
  description: "오운완, 오공완, 오늘 내가 완료한 챌린지를 인증해요!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="light">
      <body className={inter.className}>
        <Providers>
          <GNB />
          {children}
        </Providers>
      </body>
    </html>
  )
}
