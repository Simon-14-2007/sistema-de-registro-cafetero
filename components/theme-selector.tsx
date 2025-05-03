"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, Moon, Paintbrush, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

const themes = [
  {
    name: "light",
    label: "Claro",
    icon: Sun,
    color: "bg-[#f8fafc]",
    textColor: "text-[#0f172a]",
  },
  {
    name: "dark",
    label: "Oscuro",
    icon: Moon,
    color: "bg-[#0f172a]",
    textColor: "text-[#f8fafc]",
  },
  {
    name: "purple",
    label: "Púrpura",
    color: "bg-[#581c87]",
    textColor: "text-[#f5f3ff]",
  },
  {
    name: "green",
    label: "Verde",
    color: "bg-[#14532d]",
    textColor: "text-[#dcfce7]",
  },
  {
    name: "blue",
    label: "Azul",
    color: "bg-[#172554]",
    textColor: "text-[#dbeafe]",
  },
  {
    name: "amber",
    label: "Ámbar",
    color: "bg-[#78350f]",
    textColor: "text-[#fef3c7]",
  },
]

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="w-9 h-9">
        <Paintbrush className="h-5 w-5" />
        <span className="sr-only">Cambiar tema</span>
      </Button>
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9 transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
          title="Cambiar tema"
        >
          <Paintbrush className="h-5 w-5" />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3" align="end">
        <div className="space-y-1">
          <h4 className="font-medium text-sm">Selecciona un tema</h4>
          <div className="grid grid-cols-3 gap-2 pt-2">
            {themes.map((t) => (
              <Button
                key={t.name}
                variant="outline"
                size="sm"
                className={cn(
                  "justify-start px-2 py-6 gap-1 h-auto flex-col items-center border-2",
                  theme === t.name && "border-primary",
                )}
                onClick={() => setTheme(t.name)}
              >
                <div className={cn("h-6 w-6 rounded-full flex items-center justify-center", t.color)}>
                  {theme === t.name && <Check className="h-4 w-4" />}
                </div>
                <span className="text-xs">{t.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
