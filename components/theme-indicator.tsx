"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeIndicator() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg transition-opacity duration-300 opacity-80 hover:opacity-100">
      {theme === "light" ? "Modo Claro" : "Modo Oscuro"}
    </div>
  )
}
