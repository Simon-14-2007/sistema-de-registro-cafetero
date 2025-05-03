"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Clock, Atom, Lightbulb, ArrowUp, Loader2 } from "lucide-react"
import { FileUpload } from "@/components/file-upload"
import { MessageBubble } from "@/components/message-bubble"
import Image from "next/image"
import { useTheme } from "next-themes"
import { ThemeButton } from "@/components/theme-button"

type Message = {
  id: string
  content: string
  sender: "user" | "ai"
  type?: "text" | "file"
  fileName?: string
  fileUrl?: string
}

export function ChatInterfaceEnhanced() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isReasoning, setIsReasoning] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate API call to LLM
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Esta es una respuesta simulada del modelo LLM.",
        sender: "ai",
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const handleReason = () => {
    setIsReasoning(true)

    // Simulate reasoning process
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now().toString(),
        content:
          "He analizado profundamente tu consulta utilizando mi modelo de razonamiento avanzado. Aquí está mi respuesta detallada basada en un análisis lógico.",
        sender: "ai",
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsReasoning(false)
    }, 2000)
  }

  const handleSearch = () => {
    setIsSearching(true)

    // Simulate search process
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now().toString(),
        content:
          "He buscado información relevante sobre tu consulta. Aquí están los resultados más importantes que he encontrado.",
        sender: "ai",
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsSearching(false)
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileSelect = (file: File) => {
    setIsUploading(true)

    // Create a temporary URL for the file if it's an image
    let fileUrl = null
    if (file.type.startsWith("image/")) {
      fileUrl = URL.createObjectURL(file)
    }

    // Add file message
    const fileMessage: Message = {
      id: Date.now().toString(),
      content: `Archivo subido: ${file.name}`,
      sender: "user",
      type: "file",
      fileName: file.name,
      fileUrl: fileUrl,
    }

    setMessages((prev) => [...prev, fileMessage])

    // Simulate processing file
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `He recibido tu archivo "${file.name}" y lo he procesado. ¿Hay algo específico que quieras saber sobre este archivo?`,
        sender: "ai",
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsUploading(false)
    }, 1500)
  }

  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      {/* Sidebar */}
      <div className="flex flex-row md:flex-col justify-start items-center p-4 bg-background border-r border-border md:w-16">
        <Button variant="ghost" size="icon" className="mb-0 md:mb-2">
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="mb-0 md:mb-2">
          <Clock className="h-5 w-5" />
        </Button>
        <div className="flex-grow" />
        <div className="mt-0 md:mt-4 relative group">
          <ThemeButton />
          <span className="hidden md:block absolute -right-20 top-1/2 -translate-y-1/2 text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Cambiar tema
          </span>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="flex items-center mb-2">
                <div className="relative w-14 h-14 mr-3 overflow-hidden">
                  <Image
                    src="/images/falcon.png"
                    alt="Halcón Aionix"
                    width={56}
                    height={56}
                    className="object-contain drop-shadow-md"
                    priority
                  />
                </div>
                <h1 className="text-2xl font-bold">Hola, soy Aionix.</h1>
              </div>
              <p className="text-muted-foreground">¿Cómo puedo ayudarte hoy?</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="relative w-8 h-8 mr-2 flex-shrink-0 self-end mb-1">
                    <Image src="/images/falcon.png" alt="Aionix" width={32} height={32} className="object-contain" />
                  </div>
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-75" />
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-150" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <div className="relative">
            <Textarea
              placeholder="Introduce tu texto"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-24 min-h-[60px] resize-none"
              rows={1}
            />
            <div className="absolute bottom-2 right-2 flex space-x-1">
              <FileUpload onFileSelect={handleFileSelect} isUploading={isUploading} />
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={handleReason}
                disabled={isReasoning || !inputValue.trim()}
              >
                {isReasoning ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Atom className="h-4 w-4 mr-1" />}
                Razonar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={handleSearch}
                disabled={isSearching || !inputValue.trim()}
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Lightbulb className="h-4 w-4 mr-1" />
                )}
                Buscar
              </Button>
              <Button
                variant="default"
                size="icon"
                className="h-8 w-8"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
