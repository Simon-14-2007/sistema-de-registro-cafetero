import type React from "react"

interface PhoenixProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export const Phoenix = ({ className, ...props }: PhoenixProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Cabeza */}
      <path d="M12 6c.5-.5 1.5-.5 2 0 .5.5.5 1.5 0 2-.5.5-1.5.5-2 0-.5-.5-.5-1.5 0-2z" />

      {/* Pico */}
      <path d="M13 7.5l1.5-1" />

      {/* Cuerpo */}
      <path d="M12 8v2" />

      {/* Alas extendidas */}
      <path d="M12 10c-3 2-6 1-8 0 2 2 5 3 8 2 3 1 6 0 8-2-2 1-5 2-8 0z" />

      {/* Cola de fuego */}
      <path d="M12 12c0 2-1 3-2 4 2-1 3-1 4-2 1 1 2 1 4 2-1-1-2-2-2-4" />
      <path d="M12 16c0 1-.5 2-1 3 1-.5 1.5-.5 2-1 .5.5 1 .5 2 1-.5-1-1-2-1-3" />

      {/* Llamas */}
      <path d="M10 8.5c-1-1.5-3-1-3.5-.5.5-1 2-1.5 3.5.5" />
      <path d="M14 8.5c1-1.5 3-1 3.5-.5-.5-1-2-1.5-3.5.5" />
    </svg>
  )
}
