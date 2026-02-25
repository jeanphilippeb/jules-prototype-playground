import { cn, formatCurrency } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MarginIndicatorProps {
  purchasePrice: number
  salePrice: number
  currency: string
  costs?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function MarginIndicator({
  purchasePrice,
  salePrice,
  currency,
  costs = 0,
  size = "md",
  className,
}: MarginIndicatorProps) {
  const grossMargin = salePrice - purchasePrice
  const netMargin = grossMargin - costs
  const marginPercent = purchasePrice > 0 ? ((netMargin / purchasePrice) * 100) : 0
  const isPositive = netMargin > 0
  const isZero = netMargin === 0

  const Icon = isPositive ? TrendingUp : isZero ? Minus : TrendingDown

  const sizeStyles = {
    sm: "text-xs gap-1",
    md: "text-sm gap-1.5",
    lg: "text-base gap-2",
  }

  const iconSize = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center font-medium",
        sizeStyles[size],
        isPositive
          ? "text-jules-success"
          : isZero
          ? "text-jules-text-secondary"
          : "text-jules-danger",
        className
      )}
    >
      <Icon className={iconSize[size]} />
      <span>
        {isPositive ? "+" : ""}
        {formatCurrency(netMargin, currency)}
      </span>
      <span className="text-jules-text-secondary font-normal">
        ({marginPercent.toFixed(1)}%)
      </span>
    </div>
  )
}
