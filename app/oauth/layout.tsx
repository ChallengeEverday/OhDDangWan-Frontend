import { Suspense } from "react"

export default function OauthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Suspense>{children}</Suspense>
}
