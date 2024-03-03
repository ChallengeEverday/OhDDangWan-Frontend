import { useEffect, useRef } from "react"

export const useTimer = (fn: any, ms: number) => {
  const timerId = useRef<NodeJS.Timeout>()

  const start = () => {
    timerId.current = setTimeout(() => {
      fn()
    }, ms)
  }

  const stop = () => {
    if (timerId.current) {
      clearTimeout(timerId.current)
    }
  }

  useEffect(() => {
    return () => {
      if (timerId.current) {
        console.log("clear")
        clearTimeout(timerId.current)
      }
    }
  }, [])

  return [start, stop]
}
