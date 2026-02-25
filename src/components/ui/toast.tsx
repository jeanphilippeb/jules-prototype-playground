"use client"

import { cn } from "@/lib/utils"
import { useSyncExternalStore, useEffect } from "react"
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react"

type ToastVariant = "default" | "success" | "warning" | "danger"

interface ToastItem {
  id: number
  message: string
  variant: ToastVariant
}

// Module-level store
let toasts: ToastItem[] = []
let nextId = 0
const listeners = new Set<() => void>()

function emitChange() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return toasts
}

function addToast(message: string, variant: ToastVariant = "default") {
  const id = nextId++
  toasts = [...toasts, { id, message, variant }]
  emitChange()

  setTimeout(() => {
    removeToast(id)
  }, 4000)
}

function removeToast(id: number) {
  toasts = toasts.filter((t) => t.id !== id)
  emitChange()
}

// Public imperative API
export function toast(message: string, variant?: ToastVariant) {
  addToast(message, variant)
}

// Variant config
const variantStyles: Record<ToastVariant, string> = {
  default: "border-jules-border",
  success: "border-green-300 bg-green-50",
  warning: "border-amber-300 bg-amber-50",
  danger: "border-red-300 bg-red-50",
}

const variantIcons: Record<ToastVariant, React.ReactNode> = {
  default: <Info className="h-4 w-4 text-jules-primary" />,
  success: <CheckCircle className="h-4 w-4 text-green-600" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-600" />,
  danger: <XCircle className="h-4 w-4 text-red-600" />,
}

// Component to mount in layout
export function Toaster() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  if (items.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "flex items-center gap-2 rounded-md border bg-white px-4 py-3 shadow-md text-sm text-jules-text-primary",
            "animate-in slide-in-from-right-5 fade-in duration-200",
            variantStyles[item.variant]
          )}
        >
          {variantIcons[item.variant]}
          <span className="flex-1">{item.message}</span>
          <button
            type="button"
            onClick={() => removeToast(item.id)}
            className="text-jules-text-secondary hover:text-jules-text-primary transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}
