"use client"

import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import usePrefersDarkMode from "./utils/hooks/usePrefersDarkMode"

export function Providers({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = usePrefersDarkMode()

  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        themes={["odw-light", "odw-dark"]}
        defaultTheme={prefersDarkMode ? "odw-dark" : "odw-light"}
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
