"use client"

import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        themes={["odw-light", "odw-dark"]}
        defaultTheme="odw-dark"
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
