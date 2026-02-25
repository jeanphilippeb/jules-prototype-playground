"use client"

import { cn } from "@/lib/utils"

interface Tab {
  value: string
  label: string
  count?: number
}

interface TabsProps {
  tabs: Tab[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function Tabs({ tabs, value, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex border-b border-jules-border", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={cn(
            "px-4 py-2.5 text-sm font-medium transition-colors -mb-px",
            value === tab.value
              ? "text-jules-primary border-b-2 border-jules-primary"
              : "text-jules-text-secondary hover:text-jules-text-primary"
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-1.5 text-xs text-jules-text-secondary">
              ({tab.count})
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
