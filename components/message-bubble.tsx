import { File } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface MessageBubbleProps {
  message: {
    id: string
    content: string
    sender: "user" | "ai"
    type?: "text" | "file"
    fileName?: string
    fileUrl?: string
  }
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
      {message.sender === "ai" && (
        <div className="relative w-8 h-8 mr-2 flex-shrink-0 self-end mb-1">
          <Image src="/images/falcon.png" alt="Aionix" width={32} height={32} className="object-contain" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3",
          message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        {message.type === "file" ? (
          <div className="space-y-2">
            <div className="flex items-center">
              <File className="h-4 w-4 mr-2" />
              <span>{message.content}</span>
            </div>
            {message.fileUrl && (
              <div className="mt-2 rounded-md overflow-hidden border">
                <img
                  src={message.fileUrl || "/placeholder.svg"}
                  alt={message.fileName || "Archivo subido"}
                  className="max-w-full h-auto max-h-[200px] object-contain"
                />
              </div>
            )}
          </div>
        ) : (
          message.content
        )}
      </div>
    </div>
  )
}
