"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

interface AppShellProps {
  children: React.ReactNode
  className?: string
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className={cn("min-h-screen bg-jules-background", className)}>
      <TopBar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

function TopBar() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <header className="sticky top-0 z-50 border-b border-jules-border bg-white">
      <div className="mx-auto flex h-12 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-jules-text-primary hover:text-jules-primary transition-colors"
        >
          <Home className="h-4 w-4" />
          Playground
        </Link>

        {segments.length > 0 && (
          <Breadcrumbs segments={segments} />
        )}
      </div>
    </header>
  )
}

function Breadcrumbs({ segments }: { segments: string[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-jules-text-secondary">
      {segments.map((segment, i) => {
        const path = "/" + segments.slice(0, i + 1).join("/")
        const isLast = i === segments.length - 1
        const label = segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())

        return (
          <span key={path} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" />
            {isLast ? (
              <span className="font-medium text-jules-text-primary">{label}</span>
            ) : (
              <Link href={path} className="hover:text-jules-primary transition-colors">
                {label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
