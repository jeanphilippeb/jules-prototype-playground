"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { prototypeRegistry, type PrototypeEntry } from "@/lib/mock-data"
import Link from "next/link"
import { Search, Beaker, Sparkles, Wrench, ExternalLink } from "lucide-react"

const typeConfig: Record<PrototypeEntry["type"], { label: string; icon: typeof Beaker; variant: "default" | "confirmed" | "warning" }> = {
  feature: { label: "Feature", icon: Beaker, variant: "confirmed" },
  improvement: { label: "Improvement", icon: Wrench, variant: "default" },
  experiment: { label: "Experiment", icon: Sparkles, variant: "warning" },
}

export default function HomePage() {
  const [search, setSearch] = useState("")

  const filtered = prototypeRegistry.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppShell>
      <PageHeader
        title="Jules Prototype Playground"
        description="Interactive prototypes built with Claude Code. Browse, explore, and build."
      />

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-jules-text-secondary" />
        <input
          type="text"
          placeholder="Search prototypes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-sm border border-jules-border bg-white py-2 pl-9 pr-3 text-sm text-jules-text-primary placeholder:text-jules-text-secondary focus:border-jules-primary focus:outline-none focus:ring-2 focus:ring-jules-primary/20"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-jules-text-secondary">
            No prototypes found. Create one with{" "}
            <code className="rounded bg-jules-surface px-1.5 py-0.5 text-xs font-mono">
              /new-prototype
            </code>
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((proto) => (
            <PrototypeCard key={proto.slug} prototype={proto} />
          ))}
        </div>
      )}
    </AppShell>
  )
}

function PrototypeCard({ prototype }: { prototype: PrototypeEntry }) {
  const config = typeConfig[prototype.type]
  const Icon = config.icon

  const Wrapper = prototype.externalUrl ? "a" : Link
  const wrapperProps = prototype.externalUrl
    ? { href: prototype.externalUrl, target: "_blank", rel: "noopener noreferrer" }
    : { href: prototype.path }

  return (
    <Wrapper {...(wrapperProps as any)}>
      <Card className="h-full hover:border-jules-primary/30 transition-colors cursor-pointer">
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-jules-text-secondary" />
              <h3 className="text-sm font-medium text-jules-text-primary">
                {prototype.name}
              </h3>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge variant={config.variant}>{config.label}</Badge>
              {prototype.externalUrl && (
                <ExternalLink className="h-3.5 w-3.5 text-jules-text-secondary" />
              )}
            </div>
          </div>
          <p className="text-xs text-jules-text-secondary leading-relaxed">
            {prototype.description}
          </p>
          <div className="flex items-center justify-between text-xs text-jules-text-secondary mt-auto pt-1">
            <span>by {prototype.author}</span>
            <span>{prototype.createdAt}</span>
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  )
}
