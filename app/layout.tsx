import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/ui/style/reset.css"
import "@/app/ui/style/variable.css"
import "@/app/ui/style/globals.css"
import { Providers } from "./providers"
import GNB from "@/app/ui/Layout/GNB"

const inter = Inter({ subsets: ["latin"] })

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
