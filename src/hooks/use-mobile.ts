"use client"

import { useEffect, useState } from "react"

// Returns true when viewport width is under the given breakpoint (default: 768px).
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint)
    handler()
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [breakpoint])

  return isMobile
}
