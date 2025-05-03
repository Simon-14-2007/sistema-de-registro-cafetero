"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeDebug() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg z-50">
      <div>Tema configurado: {theme}</div>
      <div>Tema resuelto: {resolvedTheme}</div>
      <div className="flex space-x-2 mt-1">
        <button onClick={() => setTheme("light")} className="px-2 py-1 bg-white text-black rounded-md text-xs">
          Claro
        </button>
        <button onClick={() => setTheme("dark")} className="px-2 py-1 bg-gray-800 text-white rounded-md text-xs">
          Oscuro
        </button>
        <button onClick={() => setTheme("system")} className="px-2 py-1 bg-gray-400 text-white rounded-md text-xs">
          Sistema
        </button>
      </div>
    </div>
  )
}
