import { ThemeDebug } from "@/components/theme-debug"

export default function DebugPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Página de depuración de temas</h1>
      <p className="text-muted-foreground mb-8">
        Esta página muestra información sobre el tema actual y permite cambiarlo directamente.
      </p>
      <ThemeDebug />
    </div>
  )
}
