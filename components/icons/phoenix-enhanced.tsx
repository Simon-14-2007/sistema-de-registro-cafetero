import type React from "react"

interface PhoenixProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export const PhoenixEnhanced = ({ className, ...props }: PhoenixProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Cabeza y cresta */}
      <path d="M12 5c.8-.8 2-.5 2.5.3.5.8.2 1.7-.5 2.2-.7.5-1.8.3-2.3-.4-.5-.7-.3-1.6.3-2.1z" />
      <path d="M11.5 4.8c-.5-.8-.2-1.3.5-1.8.7-.5 1.5-.2 2 .3" />

      {/* Pico */}
      <path d="M14 6.5l1.2-.8" />

      {/* Ojo */}
      <circle cx="12.8" cy="6.2" r=".3" fill="currentColor" />

      {/* Cuerpo */}
      <path d="M12 7.5v2" />

      {/* Alas extendidas con detalles de plumas */}
      <path d="M12 9.5c-3 2-6 1-8 0 2 2 5 3 8 2 3 1 6 0 8-2-2 1-5 2-8 0z" />
      <path d="M6 8.5c.5.5 1 1 2 1" />
      <path d="M18 8.5c-.5.5-1 1-2 1" />
      <path d="M8 9.5c.5.3 1 .5 1.5.5" />
      <path d="M16 9.5c-.5.3-1 .5-1.5.5" />

      {/* Cola de fuego con más detalles */}
      <path d="M12 11.5c0 2-1 3-2 4 2-1 3-1 4-2 1 1 2 1 4 2-1-1-2-2-2-4" />
      <path d="M12 15.5c0 1-.5 2-1 3 1-.5 1.5-.5 2-1 .5.5 1 .5 2 1-.5-1-1-2-1-3" />
      <path d="M11 18.5c.5 1 1 2 1 3" />
      <path d="M13 18.5c-.5 1-1 2-1 3" />

      {/* Llamas adicionales */}
      <path d="M10 8c-1-1.5-3-1-3.5-.5.5-1 2-1.5 3.5.5" />
      <path d="M14 8c1-1.5 3-1 3.5-.5-.5-1-2-1.5-3.5.5" />
      <path d="M9 13.5c-.5-.8-1.5-.8-2-.3.3-.8 1.2-1 2 .3" />
      <path d="M15 13.5c.5-.8 1.5-.8 2-.3-.3-.8-1.2-1-2 .3" />
    </svg>
  )
}
