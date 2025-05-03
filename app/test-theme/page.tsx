"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export default function TestThemePage() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div>Cargando...</div>

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 p-4">
      <h1 className="text-2xl font-bold">Prueba de Cambio de Tema</h1>

      <div className="bg-card p-4 rounded-lg shadow-md">
        <p className="mb-2">
          Tema actual: <strong>{theme}</strong>
        </p>
        <p className="mb-2">
          Tema resuelto: <strong>{resolvedTheme}</strong>
        </p>
        <p className="mb-4">Esta página tiene un fondo claro en modo claro y oscuro en modo oscuro.</p>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setTheme("light")}
            className={theme === "light" ? "border-primary" : ""}
          >
            <Sun className="h-4 w-4 mr-2" />
            Modo Claro
          </Button>

          <Button
            variant="outline"
            onClick={() => setTheme("dark")}
            className={theme === "dark" ? "border-primary" : ""}
          >
            <Moon className="h-4 w-4 mr-2" />
            Modo Oscuro
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <Button onClick={() => (window.location.href = "/")}>Volver al Chat</Button>
      </div>
    </div>
  )
}
