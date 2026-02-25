import { cn } from "@/lib/utils"

const commodityIcons: Record<string, string> = {
  PET: "♻️",
  HDPE: "♻️",
  OCC: "📦",
  Copper: "🔶",
  Aluminum: "⬜",
  Steel: "⚙️",
  Paper: "📄",
}

interface CommodityBadgeProps {
  commodity: string
  className?: string
}

export function CommodityBadge({ commodity, className }: CommodityBadgeProps) {
  const icon = Object.entries(commodityIcons).find(([key]) =>
    commodity.toLowerCase().includes(key.toLowerCase())
  )?.[1] ?? "📦"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm bg-jules-surface px-2 py-0.5 text-xs font-medium text-jules-text-primary border border-jules-border",
        className
      )}
    >
      <span>{icon}</span>
      {commodity}
    </span>
  )
}
