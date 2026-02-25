"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useCallback } from "react"
import { X } from "lucide-react"

interface DialogProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export function Dialog({ open, onClose, children, className }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose]
  )

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      className={cn(
        "rounded-md border border-jules-border shadow-lg p-0 backdrop:bg-black/40",
        "max-w-lg w-full",
        className
      )}
    >
      <div className="bg-white rounded-md">{children}</div>
    </dialog>
  )
}

interface DialogSectionProps {
  children: React.ReactNode
  className?: string
}

interface DialogHeaderProps extends DialogSectionProps {
  onClose?: () => void
}

export function DialogHeader({ children, onClose, className }: DialogHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between px-4 py-3 border-b border-jules-border", className)}>
      <div className="text-sm font-semibold text-jules-text-primary">{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-jules-text-secondary hover:text-jules-text-primary transition-colors rounded-sm p-0.5"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export function DialogContent({ children, className }: DialogSectionProps) {
  return <div className={cn("px-4 py-4", className)}>{children}</div>
}

export function DialogFooter({ children, className }: DialogSectionProps) {
  return (
    <div className={cn("flex items-center justify-end gap-2 px-4 py-3 border-t border-jules-border bg-jules-surface", className)}>
      {children}
    </div>
  )
}
