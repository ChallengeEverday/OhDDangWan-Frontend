"use client"

import { useEffect, useState } from "react"
import { useEvent } from "react-use"

export default function usePrefersDarkMode() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false)

  useEffect(() => {
    setPrefersDarkMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    )
  }, [])

  const handler = () =>
    setPrefersDarkMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    )

  useEvent("change", handler)

  return prefersDarkMode
}
