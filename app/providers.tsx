"use client"

import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import usePrefersDarkMode from "./utils/hooks/usePrefersDarkMode"
import { QueryClientProvider } from "@tanstack/react-query"
import { useInitUser } from "./utils/hooks/useInitUser"
import { queryClient } from "./utils/service/query"
import { ToastContainer } from 'react-toastify';

export function Providers({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = usePrefersDarkMode()
  useInitUser()

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <NextThemesProvider
          attribute="class"
          themes={["odw-light", "odw-dark"]}
          defaultTheme={prefersDarkMode ? "odw-dark" : "odw-light"}
        >
          {children}
        </NextThemesProvider>
      </NextUIProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </QueryClientProvider>
  )
}
